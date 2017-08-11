'use strict';

module.exports = class Event {
  constructor(
		eventid,
		eventname,
		organiser,
		haveparticipated,
		street,
		postcode,
		city,
		country,
		startdate,
		starttime,
		enddate,
		endtime,
		contactperson,
		contactpersonphone,
		contactpersonmail,
		candidatureselectionprocedure,
		website,
		stallfee,
		stallfeedeposit,
		gotstallfeedepositback,
		canborrowtent,
		tentfee,
		tentdeposit,
		gottentdepositback,
		canborrowtable,
		tablefee,
		quantityofborrowedtable,
		benchfee,
		quantityofborrowedbench,
		canaskelectricity,
		electrictyfee,
		electricityused,
		outside,
		inside,
		note
	) {
		this.eventid = eventid;
		this.eventname = eventname;
		this.organiser = organiser;
		this.haveparticipated = haveparticipated;
		this.street = street;
		this.postcode = postcode;
		this.city = city;
		this.country = country;
		this.startdate = startdate;
		this.starttime = starttime;
		this.enddate = enddate;
		this.endtime = endtime;
		this.contactperson = contactperson;
		this.contactpersonphone = contactpersonphone;
		this.contactpersonmail = contactpersonmail;
		this.candidatureselectionprocedure = candidatureselectionprocedure;
		this.website = website;
		this.stallfee = stallfee;
		this.stallfeedeposit = stallfeedeposit;
		this.gotstallfeedepositback = gotstallfeedepositback;
		this.canborrowtent = canborrowtent;
		this.tentfee = tentfee;
		this.tentdeposit = tentdeposit;
		this.gottentdepositback = gottentdepositback;
		this.canborrowtable = canborrowtable;
		this.tablefee = tablefee;
		this.quantityofborrowedtable = quantityofborrowedtable;
		this.benchfee = benchfee;
		this.quantityofborrowedbench = quantityofborrowedbench;
		this.canaskelectricity = canaskelectricity;
		this.electrictyfee = electrictyfee;
		this.electricityused = electricityused;
		this.outside = outside;
		this.inside = inside;
		this.note = note;
	}
}
