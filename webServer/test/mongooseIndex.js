var s = new Schema({ name: { type: String, index: true });
var s = new Schema({ loc: { type: [Number], index: 'hashed' });
var s = new Schema({ loc: { type: [Number], index: '2d', sparse: true });
var s = new Schema({ loc: { type: [Number], index: { type: '2dsphere', sparse: true }});
var s = new Schema({ date: { type: Date, index: { unique: true, expires: '1d' }});
Schema.path('my.path').index(true);
Schema.path('my.date').index({ expires: 60 });
Schema.path('my.path').index({ unique: true, sparse: true });