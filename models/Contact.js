'use strict';

module.exports = class Contact {
  constructor(
		contactid,
		firstname,
		lastname,
		enterprise,
		job,
		meetat,
		meetdate,
		street,
		postcode,
		city,
		country,
		mail,
		website,
		phone,
		cancontact,
		note
	) {
		this.contactid = contactid;
		this.firstname = firstname;
		this.lastname = lastname;
		this.enterprise = enterprise;
		this.job = job;
		this.meetat = meetat;
		this.meetdate = meetdate;
		this.street = street;
		this.postcode = postcode;
		this.city = city;
		this.country = country;
		this.mail = mail;
		this.website = website;
		this.phone = phone;
		this.cancontact = cancontact;
		this.note = note;
	}
}
