'use strict';

const assert = require('assert');
const sinon = require('sinon');
const index = require('../../src');
let Client = require('../resources/Client');


/**
 * @test module:WebsocketRest
 */
describe('WebsocketRest', () => {

	let wr = null;
	const modulePath = '../../src/WebsocketRest';

	beforeEach(() => {
		wr = require(modulePath);
	});

	afterEach(() => {
		delete require.cache[require.resolve(modulePath)];
	});

	it('should have right properties', () => {
		assert.equal(wr.socket, null);
		assert.equal(wr.apiVersion, null);
		assert.equal(typeof wr.modules, 'object');
		assert.equal(typeof wr.onUrlConnect, 'object');
		assert.equal(typeof wr.onUrlClose, 'object');
		assert.equal(wr._log, null);
		assert.equal(typeof wr.onEvent, 'function');
	});

	describe('#init', () => {
		before(() => {
			this.first = sinon.spy();
			this.second = sinon.spy();
			this.third = sinon.spy();
			this.fourth = sinon.spy();
		});

		beforeEach(() => {
			wr._connectionsCheck = sinon.stub();
			wr._lastPingCheck = sinon.stub();

			wr.init(
				this.first,
				this.second
			);
		});

		it('should set properties', () => {
			assert.deepEqual(wr.socket, this.first);
			assert.deepEqual(wr.apiVersion, this.second);
		});

		it('should not call any methods', () => {
			assert.equal(wr._connectionsCheck.called, false);
			assert.equal(wr._lastPingCheck.called, false);
		});

		it('should call right method', () => {
			wr.init(
				this.first,
				this.second,
				this.third
			);

			assert.equal(wr._connectionsCheck.called, true);
		});

		it('should call right methods once', () => {
			wr.init(
				this.first,
				this.second,
				this.third,
				this.fourth
			);

			assert.equal(wr._connectionsCheck.calledOnce, true);
			assert.equal(wr._lastPingCheck.calledOnce, true);
		});
	});

	describe('#_connectionsCheck', () => {

		beforeEach(() => {
			const self = this;

			this.calls = 0;
			this.maxCalls = 3;

			setTimeout = (cb, number) => {
				assert.equal(number, 1000);
				self.calls += 1;
				if (self.calls <= self.maxCalls) cb();
			};

			this.client1 = new Client();
			this.client2 = new Client();
			wr.onUrlClose[this.client1.urlPath] = sinon.stub();
			wr.onUrlClose[this.client2.urlPath] = sinon.stub();
			wr.socket = {
				clients: [
					this.client1,
					this.client2
				]
			};

		});

		it('all clients called #ping 3 times', (done) => {
			const self = this;

			wr._connectionsCheck();

			let exec = false;
			wr.socket.clients.forEach((client) => {
				exec = true;
				assert.equal(client._ping, self.maxCalls);
				assert.equal(client.pingStats.count, self.maxCalls);
			});

			if(exec) done();
			else throw Error('No client checked');

		});

		it('all clients called #ping 3 times and then close 1 time', () => {
			this.maxCalls = 9;
			this.pinged = 5;

			assert.equal(wr.socket.clients.length, 2);

			wr._connectionsCheck();

			assert.equal(wr.socket.clients.length, 0);

            assert.equal(this.client1._ping, this.pinged);
            assert.equal(this.client1.pingStats.count, this.pinged);
            assert.equal(this.client1._close, 1);

			assert.equal(this.client2._ping, this.pinged);
			assert.equal(this.client2.pingStats.count, this.pinged);
			assert.equal(this.client2._close, 1);
			
			for(let path in wr.onUrlClose){
				assert.equal(wr.onUrlClose[path].calledOnce, true);
			}
		});
	});
});
