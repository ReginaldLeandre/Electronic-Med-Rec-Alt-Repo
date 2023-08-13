
# Project Title: Wavelengths EMR

## Project Summary
We plan to create a simple but highly functional electronic medical record system that could be implemented at a small urgent care center or emergency room. Our user experience is both provider- and patient-centric, creating a logical organizational structure that will help streamline workflow for providers and facilitate a more integrated care-delivery system for each patient. 

## Team and Primary/Lead Roles:

### Roles: 
- frontend - Reggie(Will/Rob)
- backend - Will(reggie/rob)
- git wrangler - Will
- design lead - Rob(Will/reggie)	 
- research / documentation lead - Reggie/Will/Rob

[Link to GitHub Repo](https://github.com/william-hu-codes/electronic-medical-record)

[Link to Trello Board](https://trello.com/b/GvMYnnYL/wavelength-the-emr-project)


## Wireframe: (images below)
​​
![image](https://github.com/william-hu-codes/electronic-medical-record/assets/138035971/a2bf3bf1-7a82-4aaf-93bf-43b7286806fa)

The home page will describe the application -- our new innovative EMR!

![image](https://github.com/william-hu-codes/electronic-medical-record/assets/138035971/360e7e96-a222-4e5c-be88-1f41745e09bc)

Accessed via the nav bar at the top, this page will show a list of all providers. Clicking on a specific provider will bring the user to a “show page” for that specific provider and their assigned patients (see separate image below). On this list of all providers page, a provider may be removed, and a new provider may be added/created.

![image](https://github.com/william-hu-codes/electronic-medical-record/assets/138035971/49e3952e-abc5-4ac0-a44f-4e4ef4739623)

Within the providers view, assigned patients will be visible (linked by Object ID in a many-to-many relationship). These patients may be unassigned from this page to that provider, and new patients may be assigned to that provider (from the list of available patients). Patients may also be unassigned from the reference provider on this page of theirs. Clicking on an individual patient will bring the user to that specific patient’s page (not necessarily within the page of that provider).

![image](https://github.com/william-hu-codes/electronic-medical-record/assets/138035971/0484835d-52b9-4dc2-b9f9-d5126de8d869)


This page, accessible from the nav bar, shows a list of all patients in the healthcare system. Here, patients may be added to the list, or removed (discharged) from our EMR system. Clicking on a specific patient will bring the user to that patient’s specific page.


![image](https://github.com/william-hu-codes/electronic-medical-record/assets/138035971/aad00116-a3f8-4d32-8b3c-5609bccea7b6)

The show page for an individual patient will have their information (determined upon adding them to the database when a new patient is created). Here, the vitals schema will also populate, which is embedded within patients in a one-to-many relationship, since a patient may have multiple vital sign checks that will populate (the same way a movie may have multiple reviews added over time). Here, the list of providers assigned (linked many-to-many) will also be listed for that patient.

## Models/Schema

### Primary Model / Schema
Patient
fullName: String
_id: Objectid
DOB: Date
medHx: [String] the “new” and “edit” forms should indicate to separate medical hx using commas. The action handler will then .split(“,”) to turn the string into an array, separated by commas
chiefComplaint; String
providers: [{type: Schema.Types.ObjectId, ref: User“}]
vitals: Embedded vitals schema subdocs


### Secondary Model / Schema 
User (provider - but named user for simplicity when implementing OAuth)
fullName: String
_id: Objectid
role: String
userId: Schema.Types.ObjectId
googleID: type: String, required: true (step 8.3)


### Secondary Model / Schema 
Vitals
heartRate: Number
_id: Objectid
systolic: Number
diastolic: Number
respirations: Number
oxygenSat: Number
temp: Number
time(?)



## MVP CRUD / Restful routes

![image](https://github.com/william-hu-codes/electronic-medical-record/assets/138035971/764aac54-401e-4f34-b566-69bfa323e560)

![image](https://github.com/william-hu-codes/electronic-medical-record/assets/138035971/f0136a3c-91a2-42d3-aaf7-24561a344f62)


### ERD:

![image](https://github.com/william-hu-codes/electronic-medical-record/assets/138035971/51fbc9c1-2152-4aa4-98e7-f2623278dc5d)



## User Story / Template


### User Story
The user story is best seen when viewing the wireframe of all pages above. In summary, imagine you are the hospital administration or a healthcare provider in an emergency room or urgent care center. Patients will be added to the database of admitted patients at the center and removed when discharged. Multiple healthcare providers--doctors, nurses, techs, etc--may be involved in a given patient’s care. With our EMR app, you can view all providers “on-shift” and navigate the app to see which providers are assigned to a given patient and which patients are assigned to a given provider. Patient information may be edited within the patient-specific page. As a stretch goal, edits will only be possible to make when signed in (likely with Google).

### LIST OF USER STORIES:

As a user, need to view all patients
As a user, need to view all providers
As a user, need to create new patient
As a user, need to create new provider
As a user, need to create new vitals for patient
As a user, need a mean of discharging patients, preventing them from being rendered on the default patients index page
As a user, need to be able to view former (discharged) patients by applying a search filter (using a GET req.query from a form)

[REFER TO TRELLO BOARD FOR UPDATED LIST](https://trello.com/b/GvMYnnYL/wavelength-the-emr-project)

### Optional - Potential Stretch Goals
- log in - ability to edit patient info may be restricted to only if user is logged on
- possibly an option to have multiple “teams” of providers (would need a separate model)
- anticipate additional embedded schemas aside from just vitals (can imagine also having physical exam, labs, imaging, additional history, etc)
- patient portal where patients can have limited access to their own medical records (view only)

[REFER TO TRELLO BOARD FOR UPDATED LIST](https://trello.com/b/GvMYnnYL/wavelength-the-emr-project)
