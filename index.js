'use strict';

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

	var verify = require('gulp-ccr-helper').verifyConfiguration;
	var PluginError = require('gulp-util').PluginError;

	var gulp = this.gulp;
	var config = this.config;
	var upstream = this.upstream;

	var streams;

	if (this.upstream) {
		throw new PluginError('each', 'each stream-processor do not accept up-stream');
	}
	verify(each.schema, config);

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
			upstream: upstream
		};
		return merge.call(context, done);
	}

	function done() {
		throw new PluginError('each', 'child task should return stream, not call callback.');
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
