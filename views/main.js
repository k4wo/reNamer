'use strict';

import React from 'react';
import {connect} from 'react-redux'
import Left from './options';
import Right from './items';
import findAndReplace from '../lib/find&replace'
import rename from '../lib/rename'


class Main extends React.Component {
	constructor() {
		super();
	}

	findAndReplace(values) {
		if( !values.find && !values.replace ) {
			console.log('Ups!');

			return;
		}

		const change = findAndReplace(values.find, values.replace, this.props.files, this.props.options)
				, length = change.length
				, result = [];

		if( !length ) {
			console.log('nothing!');

			return;
		}

		for( let i = 0; i < length; i++ ) {
			result.push(rename(this.props.options.location, change[i]));
		}

		Promise.all(result)
				.then(res => this.props.dispatch({ type: 'CHANGE', files: change }))
				.catch(err => console.log(err));
	}

	render() {

		return (
				<div id="main">
					<Left case={() => this.props.dispatch({type: 'CASE_SENSITIVE'})}
								replace={values => this.findAndReplace(values)}/>
					<Right data={this.props}/>
				</div>
		)
	}
}

const mapToProps = function({ files, options }) {
	return {
		files,
		options
	};
};

export default connect(mapToProps)(Main);