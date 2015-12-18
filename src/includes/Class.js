class Class {
    constructor(par1, par2) {
        this.par1 = par1;
        this.par2 = par2;
    }

    get parameters() {
        return `${this.par1} ${this.par2}`;

    }
}
export {Class};
