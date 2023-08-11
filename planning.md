## Models

### Patients (primary model)
#### schema
- fullName: String
- DOB: Date
- medHx: String
- chiefComplaint: String
- healthcareTeam: type of = object id -> users
- vitals: type of = embedded sub-doc -> vitals

### Vitals (sub document)
#### schema 
- temperature
- heart rate
- blood pressure
- o2 sats
- resperation

### Users
- will use OAuth to track user
- 
#### schema
- 