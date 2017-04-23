// 数据库设计	主要思想
// 1.简单，插入查询方便
// 2.扩展
// 根据角色制定
// buyer	采购，发出或者review采购订单				也可以查询比价，询价
// scientist	提出采购需求，查询，比价
// leader	查看，审批
// treasurer	收到价格信息，供应商信息
// vendor	提供产品目录
// 问题
// 如何分离不同公司的业务？	以上每种角色提供company字段
// 如何解决同一个角色多个人的情况
// 针对不同公司不同价格
// http://docs.mongodb.org/manual/core/data-model-operations/
debugger;
var dbName = "test";
require("./../log");
var config = require('./../config');
var mongoose = require('mongoose');
var crypto = require('crypto');
mongoose.connect(config.connectionstringTest);
var db = mongoose.connection;
db.on('error', function(err) {
	testLogger.error('connect to %s error: ', dbName, err.message);
	process.exit(1);
});
db.once('open', function() {
	testLogger.trace('%s has been connected.', dbName);

	Schema = mongoose.Schema;

	// 用户名 // 账号密码 // 邮箱 // 地址 // 电话
	var schemaBuyer = new Schema({
		公司: {
			type: String,
			index: true
		},
		用户名: {
			type: String,
			unique: true,
			index: true,
			required: true
		},
		functionGroup: {
			type: [String],
			required: true,
		default:
			["search", "buy"]
		},
		password: {
			type: String,
			required: true,
			set: encryptPassword
		},
		sex: String,
		email: String,
		phone: String,
		address: {
			city: String,
			street: String
		},
		//
        // doc : [schemaDoc]
	});

	schemaBuyer.method("authenticate", function(plainText) {
		return encryptPassword(plainText) === this.password;
	});

	var Buyer = mongoose.model('buyer', schemaBuyer);
	// Buyer.schema.path('functionGroup').validate(function(value) {
	// 	value.forEach(function(el) {
	// 		// /i (忽略大小写)
	// 		// /g (全文查找出现的所有匹配字符)
	// 		// /m (多行查找)
	// 		// /gi(全文查找、忽略大小写)
	// 		// /ig(全文查找、忽略大小写)
	// 		var ret = /dominate | search | buy | approve /i.test(el);
	// 		if (ret === false) return ret;
	// 	});
	// 	return true;
	// }, '非法权限');

	var buyer = new Buyer();
	buyer.用户名 = "yin";
	buyer.password = "1111";
	buyer.save(function(error, buyer) {
		if (error) {
			testLogger.error(error);
			return;
		}
		testLogger.info(buyer);
	});
});


function encryptPassword(password) {
	return crypto.createHash("md5").update(password).digest("base64");
}