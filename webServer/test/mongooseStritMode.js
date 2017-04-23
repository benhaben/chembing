var thingSchema = new Schema({});
var Thing = mongoose.model('Thing', schemaSchema);
var thing = new Thing({ iAmNotInTheSchema: true });
thing.save(); // iAmNotInTheSchema is not saved to the db

// set to false..
var thingSchema = new Schema({}, { strict: false });
var thing = new Thing({ iAmNotInTheSchema: true });
thing.save(); // iAmNotInTheSchema is now saved to the db!!
// This also affects the use of doc.set() to set a property value.

var thingSchema = new Schema({});
var Thing = mongoose.model('Thing', schemaSchema);
var thing = new Thing;
thing.set('iAmNotInTheSchema', true);
thing.save(); // iAmNotInTheSchema is not saved to the db
// This value can be overridden at the model instance level by passing a second boolean argument:

var Thing = mongoose.model('Thing');
var thing = new Thing(doc, true);  // enables strict mode
var thing = new Thing(doc, false); // disables strict mode