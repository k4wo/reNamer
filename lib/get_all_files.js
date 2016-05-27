'use strict';

import fs from 'fs';

function readDir(dir) {
	return new Promise((resolve, reject) => {
		if( !dir || typeof dir !== 'string' ) {
			reject('This is not directory.');
			return;
		}

		fs.readdir(dir, (err, result) => {
			if( err ) {
				reject('Something went wrong.');
				return;
			}

			resolve(result);
		})
	})
}

export default readDir;