Models- 
  *patients(primary model schema)
      full name
      date of birth
      med history
      health care team(type of = object id -> users)
      patient's primary concern
      vitals(type of = embedded sub-doc -> vitals)
  *vitals
      temperature
      heart rate
      blood pressure
      o2 sat
      resperation
  *users
      admin (all records)
      medical team(speci
