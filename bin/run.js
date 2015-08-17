#! /usr/bin/env node
'use strict';

/* Functions */
var header = require('./functions/header');
var cl = require('./functions/cl');

/* Tasks */
var tasks = {};
tasks.git = require('./tasks/git');
tasks.env = require('./tasks/env');
tasks.composer = require('./tasks/composer');
tasks.wp = require('./tasks/wp');
tasks.theme = require('./tasks/theme');
tasks.npm = require('./tasks/npm');
tasks.bower = require('./tasks/bower');
tasks.gulp = require('./tasks/gulp');
tasks.plugins = require('./tasks/plugins');
tasks.permalinks = require('./tasks/permalinks');
tasks.multilanguage = require('./tasks/multilanguage');
tasks.ninjaforms = require('./tasks/ninjaforms');

/* Show UNDEFINED header */
header();

if(tasks[process.argv[2]]) {
    tasks[process.argv[2]]();
} else {
    cl('error', 'Command not found');
}