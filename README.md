# MxM : A small and portable stock management tool for mixed-media artists

## Features

+ Artworks
+ Items
+ Contacts
+ Events
+ Reports
+ Billing
+ Configuration

## Authors

+ Florence Melan : DB design and UX programming
+ Fabrice Kauffmann : Back-end coding

## History

+ 2017-07-28 : Initial version (code skeleton)
+ 2017-07-29 : Item class added (fk)
+ 2017-07-31 : Item class completed (fk)

## To Do List

### Database

+ Modify table ItemsUsedInArtwork
	+ Add ItemEmpty (BOOLEAN) in primary key
	+ Rename Quantity to BillableQuantity (DECIMAL)
	+ Add Billable (BOOLEAN)

+ Modify table Contact
	+ Insert ContactType (TEXT) before Note

+ Modify table Event
	+ Remove ContactPersonPhone
	+ Remove ContactPersonMail
 	+ Rename ContactPerson to ContactID

+ Modify table Item
	+ Rename Provider to ContactID

+ Add new table for Supplier Orders (to be analyzed)

### UX

+ Apply changes above to itemedit.ejs

### Model

+ Apply changes above to Item.js and items-persist.js
+ Apply changes above to Contact.js and contacts-persist.js

### Controllers

+ Apply changes above to items.js
+ Apply changes above to contacts.js
