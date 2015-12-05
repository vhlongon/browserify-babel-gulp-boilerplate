import {Person} from './includes/Person';
import * as test from './includes/test';

var React = require('react');
var ReactComp = require('./includes/reactComp');
let $ = require('jquery');
require('browsernizr/test/fullscreen-api');
require('browsernizr/test/css/columns');
let Modernizr = require('browsernizr');

global.app = function main() {
  let person = new Person('Jerry Lee', 'Lewis');
  console.log(person.fullName);
  console.log('hej');
};

React.render(<ReactComp/>, document.body); 

