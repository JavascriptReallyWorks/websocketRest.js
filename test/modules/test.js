"use strict";

exports.dataResponse = function (req, socket) {
	socket.data('dataResponse',200);
};

exports.errorResponse = function(req,socket){
	socket.error('errorResponse',['error0','error1'],500);
};

exports.returnAddress= function(req,socket){
	socket.send(socket.address);
};

exports.returnParams = function(req,socket){
	socket.data(socket.params,200);
};

exports.returnHeaders = function(req,socket){
	socket.data(socket.headers.host,200);
};

exports.connectedAt = function(req,socket){
	socket.data(socket.connectedAt,200);
};

exports.privateMethod = function(){};
exports.private_method = function(){};
