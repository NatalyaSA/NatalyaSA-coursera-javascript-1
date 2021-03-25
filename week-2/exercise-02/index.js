/**
 * @param {String[]} hashtags
 * @returns {String}
 */
module.exports = function (hashtags) {
	var result = [];
	for (var i = 0; i < hashtags.length; i++) {
		hashtag = hashtags[i].toLowerCase();
		if (result.indexOf(hashtag)===-1){
			result.push(hashtag);
		}
	}
	return result.join(', ');
};
