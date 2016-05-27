'use strict';

function findAndReplace(find, replace, data, options) {
	find = options.case ? find.toLowerCase() : find;

	const len    = data.length
			, regexp = new RegExp(find)
			, result = [];

	let name, o = {};
	for( let i = 0; i < len; i++ ) {
		name = options.case ? data[i].name.toLowerCase() : data[i].name;

		if( data[i].select && name.indexOf(find) > -1 ) {
			o      = Object.assign({}, data[i]);
			o.old  = data[i].name;
			o.name = name.replace(regexp, replace);

			result.push(o);
		}
	}

	return result;
}

module.exports = findAndReplace;