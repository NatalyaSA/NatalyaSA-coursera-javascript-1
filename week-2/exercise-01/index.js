/**
 * @param {String} tweet
 * @returns {String[]}
 */
module.exports = function (tweet) {
	var words = tweet.split(' ');
	var result = [];
	for (var i = 0; i < words.length; i++) {
		if (words[i].startsWith('#')) {
			result.push(words[i].substring(1));
		}
	}
	return result;
};