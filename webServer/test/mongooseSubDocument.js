var childSchema = new Schema({ name: 'string' });

var parentSchema = new Schema({
  children: [childSchema]
});

// Sub-documents enjoy all the same features as normal documents. 
// The only difference is that they are not saved individually,
// they are saved whenever their top-level parent document is saved.

var Parent = mongoose.model('Parent', parentSchema);
var parent = new Parent({ children: [{ name: 'Matt' }, { name: 'Sarah' }] });
parent.children[0].name = 'Matthew';
parent.save(callback);

// If an error occurs in a sub-documents' middleware, 
// it is bubbled up to the save() callback of the parent, 
// so error handling is a snap!

childSchema.pre('save', function (next) {
  if ('invalid' == this.name) return next(new Error('#sadpanda'));
  next();
});

var parent = new Parent({ children: [{ name: 'invalid' }] });
parent.save(function (err) {
  console.log(err.message) // #sadpanda
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// Finding a sub-document
// Each document has an _id. DocumentArrays have a special id method for looking up a document by its _id.

var doc = parent.children.id(id);

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// Adding sub-docs

// MongooseArray methods such as push, unshift, addToSet, 
// and others cast arguments to their proper types transparently:

var Parent = mongoose.model('Parent');
var parent = new Parent;

// create a comment
parent.children.push({ name: 'Liesl' });
var subdoc = parent.children[0];
console.log(subdoc) // { _id: '501d86090d371bab2c0341c5', name: 'Liesl' }
subdoc.isNew; // true

parent.save(function (err) {
  if (err) return handleEsrror(err)
  console.log('Success!');
});

// Sub-docs may also be created without adding them to the array by using the create method of MongooseArrays.

var newdoc = parent.children.create({ name: 'Aaron' });

// Removing docs});

// Each sub-document has it's own remove method.

var doc = parent.children.id(id).remove();
parent.save(function (err) {
  if (err) return handleError(err);
  console.log('the sub-doc was removed');

// Alternate declaration syntax
// New in v3 If you don't need access to the sub-document schema instance, 
// you may also declare sub-docs by simply passing an object literal:
var parentSchema = new Schema({
  children: [{ name: 'string' }]
});
