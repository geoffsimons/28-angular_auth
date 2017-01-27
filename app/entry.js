'use strict';

require('./scss/main.scss');

const path = require('path');
const angular = require('angular');
const camelcase = require('camelcase');
const pascalcase = require('pascalcase');
const uiRouter = require('angular-ui-router');

const cfgram = angular.module('cfgram', [uiRouter]);

let context = require.context('./config/', true, /\.js$/);
context.keys().forEach( key => {
  cfgram.config(context(key));
});

context = require.context('./view/', true, /\.js$/);
context.keys().forEach( key => {
  let name = pascalcase(path.basename(key, '.js'));
  cfgram.controller(name, context(key));
});

context = require.context('./service/', true, /\.js$/);
context.keys().forEach( key => {
  let name = camelcase(path.basename(key, '.js'));
  cfgram.service(name, context(key));
});

context = require.context('./component/', true, /\.js$/);
context.keys().forEach( key => {
  let name = camelcase(path.basename(key, '.js'));
  cfgram.component(name, context(key));
});
