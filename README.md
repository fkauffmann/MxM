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
+ Rename Quantity to BillableQuantity (DECIMAL)  in ItemsUsedInArtwork
+ Add Billable (BOOLEAN) in ItemsUsedInArtwork
+ Insert ContactType (TEXT) before Note in Contact
+ Remove ContactPersonPhone from Event
+ Remove ContactPersonMail from Event
+ Rename ContactPerson to ContactID in Event
+ Rename Provider to ContactID in Event

## To Do List

### Database

+ Modify table ItemsUsedInArtwork
	+ Add ItemEmpty (BOOLEAN) in primary key

+ Add new table for Supplier Orders (to be analyzed)

### UX

+ Apply changes above to itemedit.ejs
+ In events.js: ContactDropdown filtered 'Organiser'  

### Model

+ Apply changes above to Item.js and items-persist.js
+ Apply changes above to Contact.js and contacts-persist.js

### Controllers

+ Apply changes above to items.js
+ Apply changes above to contacts.js
