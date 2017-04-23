// 序号 	
// structure(可选）	CAS 	商品中文名称 	英文名 	规格 	包装 	品牌 	
// 价格 	库存 	采购类别 	预计到货时间	MDL 	化合物性质	购买记录 	
// 操作 	商品编码 	库存地 	是否备库 	商品目录 	原厂商品编码 	代理商商品编码 
//采购信息文档
var ex = function() {
	// 用户名 // 账号密码 // 邮箱 // 地址 // 电话
	var schemaDoc = {
		name: {
			type: String,
			unique: true,
			index: true,
			required: true
		},
		enName: {
			type: String,
			index: true
		},
		//TODO, may store picture or SDL format here
		structure: {
			type: String
		},
		//TODO, unique, but format?
		CAS: {
			type: String
		},
		pack: String,
		brand: String,
		price: String,
		reserve: String,
		category: String,
		arrival: String,
		MDL: String,

		status: String,
		productCode: String,
		originalCode: String,
		proxyCode: String,
		location: String,
		isPrepared: String,
		catalog: String,

		// may link to sub doc or other db
		detail: String,
		buyRecord: String,

	};

	return schemaDoc;
};

exports.schemaDoc = ex;