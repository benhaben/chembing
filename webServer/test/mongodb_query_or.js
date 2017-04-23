chembuyer.documents { $or: [ { CAS: "110-82-7" }, { CAS: "37366-09-9" }, { CAS: "110-83-8" }, { CAS: "628-41-1" }, { CAS: "592-57-4" }, { CAS: "42152-46-5" }, { CAS: "" } ] }

db.documents.find({$or:[{CAS:"110-82-7"}, {CAS: "100-06-1"}]})