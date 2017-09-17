'use strict';

module.exports = class Item {
  constructor(
    itemid,
    shortname,
    categoryid,
    maker,
    makerref,
    contactid,
    providerurl,
    lastpurchasedate,
    price,
    unit,
    width,
    height,
    diameter,
    picture,
    note,
    quantityinstock,
    stocklimitalert
  ) {
    this.itemid = itemid;
    this.shortname = shortname;
    this.categoryid = categoryid;
    this.maker = maker;
    this.makerref = makerref;
    this.contactid = contactid;
    this.providerurl = providerurl;
    this.lastpurchasedate = lastpurchasedate;
    this.price = price;
    this.unit = unit;
    this.width = width;
    this.height = height;
    this.diameter = diameter;
    this.picture = picture;
    this.note = note;
    this.quantityinstock = quantityinstock;
    this.stocklimitalert = stocklimitalert;
  }
};
