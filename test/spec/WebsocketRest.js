'use strict';

const assert = require('assert');
const sinon = require('sinon');
const index = require('../../src');

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

});
