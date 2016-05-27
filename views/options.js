'use strict';

import React from 'react';
import {connect} from 'react-redux'
import open from '../lib/open-dialog';
import readDir from '../lib/get_all_files';
import isFile from '../lib/isFile';

class Left extends React.Component {
	constructor() {
		super();
		this.state = {
			find: '',
			replace: ''
		};
	}

	openFolder() {
		const directory = open();

		if( !directory || !directory.length ) {
			return;
		}

		readDir(directory[0])
				.then(res => res.map(file => isFile(file, directory[0])))
				.then(res => Promise.all(res))
				.then(res => res.filter(file => file.isFile))
				.then(res => res.map(file => file.name))
				.then(res => this.props.dispatch({ type: 'ADD_FILE', file: res }))
				.then(() => this.props.dispatch({ type: 'LOCATION', location: directory[0] }))
				.catch(err => console.log(err));
	}

	openFiles() {
		let files = open(true);

		if( !files || !files.length ) {
			return;
		}

		const splice    = files[0].split('/');
		const directory = splice.slice(1, splice.length - 1).join('/');

		files = files.map(file => file.split('/').slice(-1)[0]);

		this.props.dispatch({ type: 'ADD_FILE', file: files });
		this.props.dispatch({ type: 'LOCATION', location: directory });
	}

	render() {

		return (
				<nav id="left-panel">
					<div className="options-box">
						<main>
							<button className="btn" onClick={() => this.openFolder()}>Folder</button>
							<button className="btn" onClick={() => this.openFiles()}>Files</button>
							<div className="find_replace">
								<label>
									<p className="label">Find:</p>
									<input type="text" name="find" onChange={e => this.setState({find: e.target.value})}/>
								</label>
								<label>
									<p className="label">Replace:</p>
									<input type="text" name="replace" onChange={e => this.setState({replace: e.target.value})}/>
								</label>
								<div className="options">
									<label><input type="checkbox" onClick={() => this.props.case()}/>Ignore case sensivity</label>
								</div>
								<div>
									<button className="btn" onClick={() => this.props.replace(this.state)}>Find & Replace</button>
								</div>
							</div>
						</main>
					</div>
				</nav>
		)
	}
}


export default connect()(Left);