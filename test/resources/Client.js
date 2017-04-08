/**
 * Created by urosjarc on 8.4.2017.
 */

class Client {
	constructor() {
		this._ping = 0;
		this._close = 0;
		this.pingStats = {
			count: 0,
			pingedAt: 0
		};
		this.urlPath = (0 | Math.random() * 9e6).toString(36);
	}

	ping() {
		this._ping++;
	}

	close() {
		this._close++;
	}
}
module.exports = Client;
