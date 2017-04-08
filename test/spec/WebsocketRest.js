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

		it('all clients called #ping less than threshold', () => {
			assert.equal(wr.socket.clients.length, 2);

			wr._connectionsCheck();

			assert.equal(wr.socket.clients.length, 2);

			assert.equal(this.client1._ping, this.maxCalls);
			assert.equal(this.client1.pingStats.count, this.maxCalls);
			assert.equal(this.client1._close, 0);

			assert.equal(this.client2._ping, this.maxCalls);
			assert.equal(this.client2.pingStats.count, this.maxCalls);
			assert.equal(this.client2._close, 0);
		});

		it('all clients called #ping more than threshold and then run close event', () => {
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

	describe('#_lastPingCheck', () => {


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

		it('not close client if treshold time for connection is not reached', () => {
			wr._lastPingCheck();

			assert.equal(this.client1._close, 0);
			assert.equal(this.client2._close, 0);

		});

	});
});
