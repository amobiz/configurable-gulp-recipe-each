'use strict';

var helper = require('gulp-ccr-stream-helper')('each');

var schema = {
	title: 'each',
	description: "Iterates each values and pass as 'config' context to sub tasks.",
	properties: {
		values: {
			description: 'An array of values to iterate.',
			type: 'array',
			minItems: 1,
			items: {
				type: 'object'
			}
		}
	},
	required: ['values']
};

function each() {
	// lazy loading required modules.
	var mergeStream = require('merge-stream');
	var merge = require('gulp-ccr-merge');
	var verify = require('gulp-ccr-config-helper');

	var gulp = this.gulp;
	var config = this.config;
	var tasks = this.tasks;
	var upstream = this.upstream;

	var streams;

	verify(each.schema, config);
	helper.prerequisite(this, false, 1);

	if (config.values.length === 1) {
		return processValue(config.values[0]);
	}

	streams = config.values.map(processValue);
	return mergeStream(streams);

	function processValue(value) {
		var context;

		context = {
			gulp: gulp,
			config: Object.assign({}, config, value),
			tasks: tasks,
			upstream: upstream
		};
		return helper.runTask(context, merge);
	}
}

module.exports = each;
module.exports.schema = schema;
module.exports.type = 'stream';
