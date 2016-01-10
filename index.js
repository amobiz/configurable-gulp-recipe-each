'use strict';

var helper = require('gulp-ccr-stream-helper')('each');

/**
 * Recipe:
 * 	Stream Array (from gulp.js cheatsheet p.2)
 *
 * Ingredients:
 * 	merge-stream
 *
 */
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
			config: value,
			tasks: tasks,
			upstream: upstream
		};
		return helper.runTask(context, merge);
	}
}

each.expose = [];

each.schema = {
	title: 'each',
	description: 'Iterates each values and pass as `config` to child tasks.',
	properties: {
		values: {
			description: 'Values to iterate.',
			type: 'array',
			minItems: 1
		}
	},
	required: ['values']
};

each.type = 'stream';

module.exports = each;
