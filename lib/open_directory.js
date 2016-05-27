'use strict';

const dialog = require('electron').remote.dialog;


export default function() {

	return dialog.showOpenDialog({
		properties: ['openDirectory']
	});
}