
exports.ping = (req, socket) => {
	socket.data('Pong', 200);
};
