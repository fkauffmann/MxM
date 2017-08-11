'use strict';

module.exports = class Artwork {
  constructor(
		artworkid,
		title,
		editionnumber,
		creationstartdate,
		creationenddate,
		saleprice,
		saledate,
		orderedbycontactid,
		eventid,
		image,
		note,
		width,
		height,
		depth
	) {
		this.artworkid = artworkid;
		this.title = title;
		this.editionnumber = editionnumber;
		this.creationstartdate = creationstartdate;
		this.creationenddate = creationenddate;
		this.saleprice = saleprice;
		this.saledate = saledate;
		this.orderedbycontactid = orderedbycontactid;
		this.eventid = eventid;
		this.image = image;
		this.note = note;
		this.width = width;
		this.height = height;
		this.depth = depth;
	}
}
