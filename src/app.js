import {Person} from './includes/Person';
import * as test from './includes/test';
var $ = require('jquery');
require('browsernizr/test/fullscreen-api');
require('browsernizr/test/css/columns');
let Modernizr = require('browsernizr');

global.app = function loadApp() {
  let person = new Person('Victor', 'Longon');
  console.log(person.fullName);
  $('body').append('Some text');
};
