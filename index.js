'use strict';

/**
 * Recipe:
 * 	Stream Array (from gulp.js cheatsheet p.2)
 *
 * Ingredients:
 * 	merge-stream
 *
 * @config 針對本 task 的 configuration。
 * @tasks 傳入的子 tasks 為 configurableTask，是尚未綁定 config 的 task 形式。
 *
 */
function each(done) {
	var streams;

	// lazy loading required modules.
	var mergeStream = require('merge-stream');
	var merge = require('gulp-ccr-merge');

	var verify = require('gulp-ccr-helper').verifyConfiguration;
	var PluginError = require('gulp-util').PluginError;

	var context = this;
	var config = context.config;

	if (context.upstream) {
		throw new PluginError('each', 'each stream-processor do not accept up-stream');
	}
	verify(each.schema, config);

	if (config.values.length === 1) {
		return processValue(config.values[0]);
	}

	streams = config.values.map(processValue);
	return mergeStream(streams);

	function processValue(value) {
		context.config = value;
		return merge.call(context, done);
	}
}

each.expose = [];

each.schema = {
	"title": "each",
	"description": "",
	"properties": {
		"values": {
			"description": "",
			"type": "array",
			"minItems": 1
		}
	},
	"required": ["values"]
};

each.type = 'stream';

module.exports = each;
