/* eslint-disable no-console */

'use strict';

const WebSocket = require('ws');
const websocketRest = require('../../src');
const WebSocketServer = require('ws').Server;
const Winston = require('winston');

/**
 * CONFIGURATION & SETUP
 */
const logger = new Winston.Logger();
const webSocketServer = new WebSocketServer({port: 3000});
websocketRest.init(webSocketServer, 0.0, 1);
websocketRest.logger(logger);

/**
 * MODULE REGISTERING
 */
websocketRest.registerModule('device', require('./device'));
websocketRest.registerModule('user', require('./user'));

/**
 * REGISTER EVENTS
 */
websocketRest.registerOnConnectUrl('/client/connect', (socket, doConnect) => {
	socket.info('Connection success!', 200);
	doConnect();
});

websocketRest.registerOnCloseUrl('/client/connect', (socket) => {
	socket.info('Nooooooooo! Wait!', 200);
});

/**
 * INIT SERVER
 */
websocketRest.initServer();

/**
 * CONNECT TO SERVER
 */
const client = new WebSocket('http://localhost:3000/client/connect');
client.on('message', (msg) => {
	console.log(JSON.parse(msg));
});
