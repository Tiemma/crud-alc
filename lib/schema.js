"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _graphqlTools = require("graphql-tools");

var _resolvers = require("./resolvers");

var _resolvers2 = _interopRequireDefault(_resolvers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var typeDefs = "\n\n\ttype Student{\n\t\tid: Int!,\n\t\tfirstName: String!,\n\t\tlastName: String!,\n\t\tdept_id: Department!,\n\t\tcgpa: Float,\n\t\taddress: String,\n\t\tgender: Boolean!,\n\t\temail: String!,\n\t\tage: Int,\n\t\tlevel: Int,\n\t\tphone: String!,\n\t\tcourses: [Courses],\n\t\tpassword: String!\n\t}\n\n\ttype Department{\n\t\tid: ID!,\n\t\tname: String!,\n\t\tshortcode: String!\n\t}\n\n\ttype Courses{\n\t\tid: ID!,\n\t\tname: String!,\n\t\tunit: Int!,\n\t\tyear: Int!,\n\t\tdepartment: [Department]\n\t}\n\n\ttype Admin{\n\t\tid: ID!,\n\t\tfirstName: String!,\n\t\tlastName: String!,\n\t\temail: String!,\n\t\tpassword: String!\n\t}\n\n\ttype Query{\n\t\tstudent(id: Int!): Student\n\t\tstudent : Student\n\t}\n\n\ttype Mutation{\n\t\tcreateStudent(id: Int!, firstName: String!, lastName: String!, dept_id: ID!, gender: Boolean!, email: String!, phone_no: String!, password: String!): Student\n                deleteStudent(id: Int!): Student\n\t\tupdateStudent(id: Int!, firstName: String, lastName: String, dept_id: ID, gender: Boolean, email: String, phone_no: String, password: String, cgpa: Float, address: String, age: Int, level: Int, courses: [ID]): Student\n\t\tcreateAdmin(id: ID!, firstName: String!, lastName: String!, email: String!, password: String!): Admin\n\t\tdeleteAdmin(id:Int!): Admin\n\t\tupdateAdmin(id:Int!, firstName: String, lastName: String, email: String, password: String): Admin\n\t\tcreateCourses(id: ID!, name: String!, units: String! , year: Int!, department: [ID]): Courses\n\t\tdeleteCourses(id: Int!): Courses\n\t\tupdateCourses(id: Int!, name: String, unit: Int, year: String, department: String): Courses\n\t\tcreateDepartment(id: ID!, name: String!, shortcode: String!): Department\n\t\tdeleteDepartment(id: ID!): Department\n\t\tupdateDepartment(id: ID!, name: String, shortcode: String): Department\n\t}\n";

exports.default = (0, _graphqlTools.makeExecutableSchema)({
	typeDefs: typeDefs,
	resolvers: _resolvers2.default
});