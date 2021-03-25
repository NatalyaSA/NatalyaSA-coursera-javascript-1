module.exports = {

    /**
     * @param {String} event
     * @param {Object} subscriber
     * @param {Function} handler
     */
    on: function (event, subscriber, handler) {
    	if (!this._events.hasOwnProperty(event)) {
    		this._events[event] = [];
    	}
    	var subs = this._events[event];
    	var isASub = false;
    	subs.forEach(function (sub) {
    		if (sub.subscriber === subscriber) {
    			isASub = true;
    			if (sub.handlers.indexOf(handler) === -1) {
    				sub.handlers.push(handler);
    			}
    		}
    	});
    	if (!isASub) {
    		subs.push({subscriber: subscriber, handlers: [handler]});
    	}
    	return this;
    },

    /**
     * @param {String} event
     * @param {Object} subscriber
     */
    off: function (event, subscriber) {
    	if (this._events.hasOwnProperty(event)) {
			this._events[event] = this._events[event].filter(function (sub) {
	    		return sub.subscriber !== subscriber;
	    	});
		}
    	return this;
    },

    /**
     * @param {String} event
     */
    emit: function (event) {
    	if (this._events.hasOwnProperty(event)) {
    		var subs = this._events[event];
    		subs.forEach(function (sub) {
    			sub.handlers.forEach(function (handler) {
    				handler.call(sub.subscriber);
    			});
    		});
    	}
    	return this;
    },
    _events: {}
};