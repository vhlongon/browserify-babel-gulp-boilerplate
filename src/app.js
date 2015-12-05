import {Person} from './includes/Person';
import * as test from './includes/test';
<<<<<<< HEAD
var $ = require('jquery');
=======

var React = require('react');
var ReactComp = require('./includes/reactComp');
let $ = require('jquery');
>>>>>>> a5f159a61f1c1a190edb664cb8510ef826ac0b97
require('browsernizr/test/fullscreen-api');
require('browsernizr/test/css/columns');
var Modernizr = require('browsernizr');

<<<<<<< HEAD
global.app = function () {
    let person = new Person('Victor', 'Longon');
    console.log(person.fullName);
    $('body').append('Some text');
};
=======
global.app = function main() {
  let person = new Person('Jerry Lee', 'Lewis');
  console.log(person.fullName);
  console.log('hej');
};

React.render(<ReactComp/>, document.body); 

>>>>>>> a5f159a61f1c1a190edb664cb8510ef826ac0b97
