'use strict';

import path from 'path';
import {combineReducers} from 'redux';

let fileId = 0;
function file(state, action) {

	switch( action.type ) {
		case 'ADD_FILE':
			if( !Array.isArray(action.file) ) {
				action.file = [action.file];
			}

			return action.file.map(f => {

				return {
					id: fileId++,
					name: f,
					ext: path.extname(f),
					select: true
				}
			});

		case 'TOGGLE_FILE':
			return state.id !== action.id ? state : Object.assign({}, state, { select: !state.select });

		case 'DESELECT':
			return Object.assign({}, state, { select: false });

		case 'SELECT':
			return Object.assign({}, state, { select: true });

		case 'CHANGE':
			const filtered = action.files.filter(a => state.id === a.id);

			return filtered.length ? Object.assign({}, state, filtered[0], { rename: true }) : state;

		default:
			return state;
	}
}

function files(state = [], action) {

	switch( action.type ) {
		case 'ADD_FILE':
			return file(undefined, action);

		case 'TOGGLE_FILE':
		case 'DESELECT':
		case 'SELECT':
		case 'CHANGE':
			return state.map(f => file(f, action));

		default:
			return state;
	}
}

function options(state = { case: false, done: false }, action) {

	switch( action.type ) {
		case 'LOCATION':
			return Object.assign({}, state, { location: action.location });

		case 'CASE_SENSITIVE':
			return Object.assign({}, state, { case: !state.case });

		default:
			return state;
	}
}

export default combineReducers({ files, options });