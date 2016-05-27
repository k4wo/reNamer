'use strict';

import fs from 'fs';
import {join} from 'path';

function isFile(file, path) {
	return new Promise((resolve, reject) => {
		fs.lstat(join(path, file), (err, stats) => {
			if( err ) {
				reject(err);
				return;
			}

			resolve({ name: file, isFile: stats.isFile() });
		})
	})
}

export default isFile;