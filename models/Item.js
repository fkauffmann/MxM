'use strict';

module.exports = class Item {
    constructor(
			itemid,
			shortname,
			categoryid,
			maker,
			makerref,
			provider,
			providerurl,
			lastpurchasedate,
			price,
			vat,
			unit,
			width,
			height,
			diameter,
			picture,
			note,
			quantityinstock,
			quantityordered,
			stocklimitalert
		) {
        this.itemid = itemid;
				this.shortname = shortname;
				this.categoryid = categoryid;
				this.maker = maker;
				this.makerref = makerref;
				this.provider = provider;
				this.providerurl = providerurl;
				this.lastpurchasedate = lastpurchasedate;
				this.price = price;
				this.vat = vat;
				this.unit = unit;
				this.width = width;
				this.height = height;
				this.diameter = diameter;
				this.picture = picture;
				this.note = note;
				this.quantityinstock = quantityinstock;
				this.quantityordered = quantityordered;
				this.stocklimitalert = stocklimitalert;
    }
};
