#! /usr/bin/env node
'use strict';

/* Functions */
var header = require('./functions/header');
var divider = require('./functions/divider');
var cl = require('./functions/cl');

/* Tasks */
var setupGit = require('./tasks/git');
var setupEnv = require('./tasks/env');
var installComposer = require('./tasks/composer');
var installWp = require('./tasks/wp');
var activateTheme = require('./tasks/theme');
var installNpm = require('./tasks/npm');
var installBower = require('./tasks/bower');
var buildGulp = require('./tasks/gulp');
var activatePlugins = require('./tasks/plugins');
var setPermalinks = require('./tasks/permalinks');
var multilanguage = require('./tasks/multilanguage');
var ninjaForms = require('./tasks/ninjaforms');

/* Show UNDEFINED header */
header();

/* HELPERS */

function err() {
    cl('error', 'Something wen\'t wrong...');
}

function done() {
    divider('ALL DONE');

    cl('notice', 'Don\'t forget to make the develop branch your main branch on gitlab!');
}

/* Start commands */
setupGit()
    .then(setupEnv, err)
    .then(installComposer, err)
    .then(installWp, err)
    .then(activateTheme, err)
    .then(multilanguage, err)
    .then(ninjaForms, err)
    .then(activatePlugins, err)
    .then(setPermalinks, err)
    .then(installNpm, err)
    .then(installBower, err)
    .then(buildGulp, err)
    .then(done, err);