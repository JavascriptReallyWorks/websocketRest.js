'use strict';

const assert = require('assert');
const sinon = require('sinon');
const index = require('../../src');
const WebsocketRest = require('../../src/WebsocketRest');

/**
 * @test module:index
 */
describe('index', () => {
	it('should return what returns WebsocketRest module', () => {
		assert.deepEqual(index, WebsocketRest);
	});
});
