////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
// FUNC. VER.
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */
function query(collection) {
	var obj = collection;
	var funcs = [].slice.call(arguments, 1);
	var selectFuncs = funcs.filter(function (func, index) {
		return func.name === "select";
	});
	var filterInFuncs = funcs.filter(function (func, index) {
		return func.name === "filterIn";
	});

	for (var i = 0; i < filterInFuncs.length; i++) {
		obj = filterInFuncs[i](obj);
	}
	for (var i = 0; i < selectFuncs.length; i++) {
		obj = selectFuncs[i](obj);
	}

	return obj;
}

/**
 * @params {String[]}
 */
function select() {
	var keysToSelect = [].slice.call(arguments);
	return function select(collection) {
		collection = collection.reduce(function (newCollection, item) {
			var newItem = {};
			for (var i = 0; i < keysToSelect.length; i++) {
				if (item.hasOwnProperty(keysToSelect[i])) {
					newItem[keysToSelect[i]] = item[keysToSelect[i]];
				}
			}
			if (Object.keys(newItem).length !== 0) {
				newCollection.push(newItem);
			}
			return newCollection;
		}, []);
		return collection;
	};
}

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
function filterIn(property, values) {
	return function filterIn(collection) {
		collection = collection.filter(function (item, index) {
			var isInValues = false;
			if (item.hasOwnProperty(property)) {
				for (var i = 0; i < values.length; i++) {
					if (item[property] === values[i])
					{
						isInValues =true;
					}
				}
			}
			return isInValues;
		});
		return collection;
	};
}

module.exports = {
    query: query,
    select: select,
    filterIn: filterIn
};

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
//PARAM. VER.
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
// /**
//  * @param {Array} collection
//  * @params {Function[]} – Функции для запроса
//  * @returns {Array}
//  */
// function query(collection) {
// 	///////////////////////////////////////////////////////////////
// 	//ver.1
// 	function unionArrays (array1, array2) {
// 	var result = array1.reduce(function (acc, elem) {
// 		if (array2.indexOf(elem) !== -1) {
// 			acc.push(elem);
// 		}
// 		return acc;
// 	}, []);
// 	return result;
// 	}

// 	var args = [].slice.call(arguments);
// 	var commands = args.slice(1);

// 	var commandsSelect = commands.filter(function (command, index) {
// 		return command[0] === "select";
// 	}).map(function (command, index) {
// 		return command[1];
// 	});

// 	var commandsFilterIn = commands.filter(function (command, index) {
// 		return command[0] === "filterIn";
// 	}).map(function (command, index) {
// 		return command.slice(1);
// 	});

// 	var unionCommandsfilterIn = commandsFilterIn.reduce(function(acc, item) {
// 		acc[item[0]] = !acc.hasOwnProperty(item[0]) ?
// 		item[1]:
// 		unionArrays(acc[item[0]], item[1]);
// 		return acc;
// 	}, {});

// 	var unionCommandsSelect = commandsSelect.reduce(function (acc, item) {
// 		return unionArrays(acc, item);
// 	}, commandsSelect[0]);

// 	var propKeys = Object.keys(unionCommandsfilterIn);

// 	var result = [];
// 	args[0].forEach(function (item, index) {
// 		var counter = 0;
// 		for (var i = 0; i < propKeys.length; i++) {
// 			var key = propKeys[i];
// 			if (item.hasOwnProperty(key)) {
// 				for (j = 0; j < unionCommandsfilterIn[key].length; j++) {
// 					if (item[key] === unionCommandsfilterIn[key][j]) {
// 						counter++;
// 					}
// 				}
// 			}
// 		}
// 		var newItem = {};
// 		if (counter === propKeys.length) {
// 			for (var i = 0; i < unionCommandsSelect.length; i++) {
// 				var key = unionCommandsSelect[i];
// 				if (item.hasOwnProperty(key))
// 				{
// 					newItem[key] = item[key];
// 				}
// 			}
// 		}
// 		if (Object.keys(newItem).length !== 0){
// 			result.push(newItem);	
// 		}
// 	})

// 	return result;

// 	//////////////////////////////////////////////////////////
// 	//ver. 2
// 	// var args = [].slice.call(arguments);
// 	// var commands = args.slice(1);

// 	// var commandsSelect = commands.filter(function (command, index) {
// 	// 	return command[0] === "select";
// 	// }).map(function (command, index) {
// 	// 	return command[1];
// 	// });

// 	// var commandsFilterIn = commands.filter(function (command, index) {
// 	// 	return command[0] === "filterIn";
// 	// }).map(function (command, index) {
// 	// 	return command.slice(1);
// 	// });

// 	// var unionCommandsfilterIn = commandsFilterIn.reduce(function(acc, item) {
// 	// 	if (!acc.hasOwnProperty(item[0])) {
// 	// 		acc[item[0]] = [item[1]];
// 	// 		acc[item[0]].counter = 1;
// 	// 	}
// 	// 	else {
// 	// 		acc[item[0]].push(item[1]);
// 	// 		acc[item[0]].counter++;
// 	// 	}
// 	// 	return acc;
// 	// }, {});

// 	// propToCompare = {};
// 	// var keys = Object.keys(unionCommandsfilterIn);
// 	// for (var i = 0; i < keys.length; i++) {
// 	// 	propToCompare[keys[i]] = unionKeys(getStats(unionCommandsfilterIn[keys[i]]), unionCommandsfilterIn[keys[i]].counter);
// 	// }

// 	// var propKeys = Object.keys(propToCompare);
// 	// var resultKeys = unionKeys(getStats(commandsSelect), commandsSelect.length);

// 	// var result = [];
// 	// args[0].forEach(function (item, index) {
// 	// 	var newItem = {};
// 	// 	var counter = 0;
// 	// 	for (var i = 0; i < propKeys.length; i++) {
// 	// 		var key = propKeys[i];
// 	// 		if (item.hasOwnProperty(key)) {
// 	// 			for (j = 0; j < propToCompare[key].length; j++) {
// 	// 				if (item[key] === propToCompare[key][j]) {
// 	// 					counter++;
// 	// 				}
// 	// 			}
// 	// 		}
// 	// 	}
// 	// 	if (counter === propKeys.length) {
// 	// 		for (var i = 0; i < resultKeys.length; i++) {
// 	// 			var key = resultKeys[i];
// 	// 			if (item.hasOwnProperty(key))
// 	// 			{
// 	// 				newItem[key] = item[key];
// 	// 			}
// 	// 		}
// 	// 	}
// 	// 	if (Object.keys(newItem).length !== 0){
// 	// 		result.push(newItem);	
// 	// 	}
// 	// })

// 	// function getStats (arrays) {
// 	// 	var stats = arrays.reduce(flattenArrays,[]).reduce(getArraysStats, {});
// 	// 	function flattenArrays(acc, elem) {
// 	// 		return acc.concat(elem);
// 	// 	}
// 	// 	function getArraysStats(acc, field) {
// 	// 		if (!acc.hasOwnProperty(field)) {
// 	// 			acc[field] = 0;
// 	// 		}
// 	// 		acc[field]++;
// 	// 		return acc;
// 	// 	}
// 	// 	return stats;
// 	// }

// 	// function unionKeys (obj, condition) {
// 	// 	var resultKeys = [];
// 	// 	var keys = Object.keys(obj);
// 	// 	for (var i = 0; i < keys.length; i++) {
// 	// 		var key = keys[i];
// 	// 		if (obj[key] === condition){
// 	// 			resultKeys.push(key);
// 	// 		}
// 	// 	}
// 	// 	return resultKeys;
// 	// }

// 	// return result;
// 	///////////////////////////////////////////////////////////////

// }

// /**
//  * @params {String[]}
//  */
// function select() {
// 	var args = [].slice.call(arguments);
// 	return ["select", args];
// }

// /**
//  * @param {String} property – Свойство для фильтрации
//  * @param {Array} values – Массив разрешённых значений
//  */
// function filterIn(property, values) {
// 	return ["filterIn", property, values];
// }

// module.exports = {
//     query: query,
//     select: select,
//     filterIn: filterIn
// };
