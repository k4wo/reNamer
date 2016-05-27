'use strict';

const dialog = require('electron').remote.dialog;


export default function(openFile = false) {
	let prop = [];

	if( !openFile ) {
		prop = ['openDirectory'];
	}
	else {
		prop = ['openFile', 'multiSelections'];
	}

	return dialog.showOpenDialog({
		properties: prop
	});
}