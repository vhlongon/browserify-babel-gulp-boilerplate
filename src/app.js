import {Class} from './includes/Class';

global.app = function () {
    let classInstance = new Class('Darth', 'Vader');
    console.log(classInstance.parameters);
};
