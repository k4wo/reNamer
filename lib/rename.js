'use strict';

import fs from 'fs';
import {join, resolve} from 'path';

function rename(dir, { old, name }) {
	return new Promise((resolve, reject) => {

		fs.rename(resolve(join(dir, old)), join(dir, name), (err, result) => {
			if( err ) {
				reject(err);
				return;
			}

			resolve(result);
		})
	})
}

export default rename;