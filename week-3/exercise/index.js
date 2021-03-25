/**
 * @param {String} date
 * @returns {Object}
 */
module.exports = function (date) {
		return {
			_value : new Date(date.replace(" ", "T") + ":00"),
			get value() {
				return this._value.toLocaleString()
				.replace(/(\d{2})\.(\d{2})\.(\d{4}),\s(\d{2}:\d{2}).+/, "$3-$2-$1 $4");
			},
			set value(str) {
				return this._value =  new Date(str.replace(" ", "T") + ":00");
			},
			add: function(val, command) {
				if(val < 0 || !(/^years$|^months$|^days$|^hours$|^minutes$/.test(command))) {
					throw new TypeError();
				}
				switch(command) {
					case "years":
						this._value.setYear(this._value.getFullYear()+val);
						break;
					case "months":
						this._value.setMonth(this._value.getMonth()+val);
						break;
					case "days":
						this._value.setDate(this._value.getDate()+val);
						break;
					case "hours":
						this._value.setHours(this._value.getHours()+val);
						break;
					case "minutes":
						this._value.setMinutes(this._value.getMinutes()+val);
						break;
				}
				return this;
			},
			subtract: function(val, command) {
				if(val < 0 || !(/^years$|^months$|^days$|^hours$|^minutes$/.test(command))) {
					throw new TypeError();
				}
				switch(command) {
					case "years":
						this._value.setYear(this._value.getFullYear()-val);
						break;
					case "months":
						this._value.setMonth(this._value.getMonth()-val);
						break;
					case "days":
						this._value.setDate(this._value.getDate()-val);
						break;
					case "hours":
						this._value.setHours(this._value.getHours()-val);
						break;
					case "minutes":
						this._value.setMinutes(this._value.getMinutes()-val);
						break;
				}
				return this;
			}
		}
};