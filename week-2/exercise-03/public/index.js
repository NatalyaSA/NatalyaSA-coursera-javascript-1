// Телефонная книга
var phoneBook = {};

/**
 * @param {String} command
 * @returns {*} - результат зависит от команды
 */
module.exports = function (command) {
	var commandWords = command.split(" ");
	var commandName = commandWords[0];

	if (commandName === "ADD"){
		function AddContact(name, phones){
			if (!phoneBook.hasOwnProperty(name)){
				phoneBook[name] = [];
			}
			for (var i = 0; i < phones.length; i++) {
				if (phoneBook[name].indexOf(phones[i]) === -1){
					phoneBook[name].push(phones[i]);
				}
			}
		};
		return AddContact(commandWords[1], commandWords[2].split(","));
	}
	if (commandName === "REMOVE_PHONE"){
		function removePhone (phone){
			var isRemoved = false;
			var keys = Object.keys(phoneBook);
			for (var i = 0; i < keys.length; i++) {
				var key = keys[i];
				var phoneInd = phoneBook[key].indexOf(phone);
				if (phoneInd !== -1){
					phoneBook[key].splice(phoneInd, 1);
					isRemoved = true;
				}
			}
			return isRemoved;
		};
		return removePhone(commandWords[1]);
	}
	if (commandName === "SHOW"){
		function showContacts()
		{
			var result = [];
			var keys = Object.keys(phoneBook);
			keys.sort();
			for (var i = 0; i < keys.length; i++) {
				var key = keys[i];
				if (phoneBook[key].length != 0){
					result.push(key+": "+phoneBook[key].join(", "));
				}
			}
			return result;
		};
		return showContacts();
	}

	// ver. 2
	// if (commandName === "ADD"){
	// 	var name = commandWords[1];
	// 	var phones = commandWords[2].split(",");
	// 	if (!phoneBook.hasOwnProperty(name)){
	// 		phoneBook[name] = [];
	// 	}
	// 	for (var i = 0; i < phones.length; i++) {
	// 		if (phoneBook[name].indexOf(phones[i]) === -1){
	// 			phoneBook[name].push(phones[i]);
	// 		}
	// 	}
	// }
	// if (commandName === "REMOVE_PHONE"){
	// 	var isRemoved = false;
	// 	var keys = Object.keys(phoneBook);
	// 	for (var i = 0; i < keys.length; i++) {
	// 		var key = keys[i];
	// 		var phoneIndToDelete = phoneBook[key].indexOf(commandWords[1]);
	// 		if (phoneIndToDelete !== -1){
	// 			phoneBook[key].splice(phoneIndToDelete, 1);
	// 			isRemoved = true;
	// 		}
	// 	}
	// 	return isRemoved;
	// }
	// if (commandName === "SHOW"){
	// 	var result = [];
	// 	var keys = Object.keys(phoneBook);
	// 	keys.sort();
	// 	for (var i = 0; i < keys.length; i++) {
	// 		var key = keys[i];
	// 		if (phoneBook[key].length != 0){
	// 			result.push(key+": "+phoneBook[key].join(", "));
	// 		}
	// 	}
	// 	return result;
	// }
};
