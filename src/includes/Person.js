class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;

    }
    get somethingElse(){
    	return 'something else';
    }
}
export {Person};
