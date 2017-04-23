var parser = require("odata-parser");

var ast = parser.parse("$top=10&$skip=5&$select");

util.inspect(ast);

// will result in:

// { 
//   '$top': 10,
//   '$skip': 5,
//   '$select': [ 'foo' ] 
// }
parser.parse("$filter=Name eq 'John' and LastName lt 'Doe'");

// {
//     $filter: {
//         type: 'and',
//         left: {
//             type: 'eq',
//             left: {
//                 type: 'property',
//                 name: 'Name'
//             },
//             right: {
//                 type: 'literal',
//                 value: 'John'
//             }
//         },
//         right: {
//             type: 'lt',
//             left: {
//                 type: 'property',
//                 name: 'LastName'
//             },
//             right: {
//                 type: 'literal',
//                 value: 'Doe'
//             }
//         }
//     }
// }

parser.parse("$filter=substringof('nginx', Servers)");

// {
//     $filter: {
//         type: 'functioncall',
//         func: 'substringof',
//         args: [{
//             type: 'literal',
//             value: 'nginx'
//         }, {
//             type: 'property',
//             name: 'Servers'
//         }]
//     }
// }