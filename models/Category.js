'use strict';

module.exports = class Category {
    constructor(categoryid, categoryname, reusable) {
        this.categoryid = categoryid;
        this.categoryname = categoryname;
        this.reusable = reusable;
    }
};
