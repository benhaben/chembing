require("../log");
var UsersModel = require("./../models").Users;
var newUser = new UsersModel();


// newUser.remove(function (err, newUser) {
//   if (err) return handleError(err);
//   	UsersModel.findById(newUser._id, function (err, newUser) {
//     console.log(newUser); // null
//   });
// });

newUser.name = "Yin";
newUser.password = "123qwe";
newUser.save(function(err) {
	if (err) {
		debugger;
		logger.error(err.message);
	}
});
// process.exit(1);