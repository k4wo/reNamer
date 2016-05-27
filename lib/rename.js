'use strict';

import fs from 'fs';
import {join} from 'path';

function rename(dir, { old, name }) {
	return new Promise((resolve, reject) => {

		fs.rename(join(dir, old), join(dir, name), (err, result) => {
			if( err ) {
				reject('Something went wrong.');
				return;
			}

			resolve(result);
		})
	})
}

export default rename;