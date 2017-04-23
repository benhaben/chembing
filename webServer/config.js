module.exports = {
    // b 是数据库的名称，host 是数据库的地址。cookieSecret 用于 Cookie 加密
    cookieSecret: 'chembuyer',
    db: 'chembuyer',
    host: '115.28.62.4',
    port: '27017',
    user: 'walton',
    password: 'walton',
    // connectionstring:'mongodb://njblog:njblog@linus.mongohq.com:10062/NJBlog'
    connectionstring: 'mongodb://walton:walton@115.28.62.4:27017/OneDB',
    connectionstringTest: 'mongodb://localhost/test',
    connectionStringPG: "postgres://postgres:postgres@115.28.62.4:5432/mydb"
};
