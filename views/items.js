'use strict';

import React from 'react';

function item(file, dispatch) {
	const old = file.old ? <span className="old-name">{file.old}</span> : null;
	const css = file.old ? 'success' : '';

	return (
			<li className={css} key={file.id} onClick={() => dispatch({id: file.id, type: 'TOGGLE_FILE'})}>
				<div className="squaredOne">
					<input type="checkbox" name="check" checked={file.select}/>
				</div>
				<div className="names">
					<span>{file.name}</span>
					{old}
				</div>
			</li>
	)
}

function prepareViews(files, dispatch) {
	const len = files.length
			, res = { items: [], unselected: 0 };

	for( let i = 0; i < len; i++ ) {
		if( !files[i].select ) {
			res.unselected += 1;
		}

		res.items.push(item(files[i], dispatch));
	}

	return res;
}

function makeSelector(all, unselected, dispatch) {

	if( all === 0 ) {
		return null;
	}
	else if( all === unselected ) {
		return <button className="btn select" onClick={() => dispatch({type: 'SELECT'})}>Select All</button>;
	}
	else {
		return <button className="btn select" onClick={() => dispatch({type: 'DESELECT'})}>Deselect All</button>;
	}
}

function Right({ data }) {
	const files    = data.files
			, len      = files ? files.length : 0
			, dispatch = data.dispatch
			, { items, unselected } = prepareViews(files, dispatch)
			, selector = makeSelector(len, unselected, dispatch);

	return (
			<div id="right-panel">
				<header className="top-box">{selector}</header>
				<main>
					<ul>
						{items}
					</ul>
				</main>
			</div>
	)
}

export default Right;