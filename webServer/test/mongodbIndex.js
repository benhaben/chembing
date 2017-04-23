//mongo 数组查询
// http://blog.csdn.net/drifterj/article/details/7833883
// 数组索引
// http://www.crazyshell.org/blog/?p=608

// Mongoshell代码  收藏代码
db.factories.insert( { name: "xyz", metro: { city: "New York", state: "NY" } } );  
db.factories.ensureIndex( { metro : 1 } );  
// this query can use the above index:  
db.factories.find( { metro: { city: "New York", state: "NY" } } );  
// 另外一种方法是创建混合索引：
// Mongoshell代码  收藏代码
db.factories.ensureIndex( { "metro.city" : 1, "metro.state" : 1 } );  
// these queries can use the above index:  
db.factories.find( { "metro.city" : "New York", "metro.state" : "NY" } );  
db.factories.find( { "metro.city" : "New York" } );  
db.factories.find().sort( { "metro.city" : 1, "metro.state" : 1 } );  
db.factories.find().sort( { "metro.city" : 1 } )  