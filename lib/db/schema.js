"use strict";

var _graphqlTools = require("graphql-tools");

var resolvers = require("./resolvers")();

module.exports = function () {

	console.log("Schema init");

	var typeDefs = "\n\n\t\ttype Student{\n\t\t\tid: String!,\n\t\t\tfirstName: String!,\n\t\t\tlastName: String!,\n\t\t\tdept_id: ID!,\n\t\t\tdepartment: Department,\n\t\t\tcgpa: Float,\n\t\t\taddress: String,\n\t\t\tgender: String!,\n\t\t\temail: String!,\n\t\t\tage: String,\n\t\t\tlevel: String,\n\t\t\tphone_no: String!,\n\t\t\tcourses: [Courses],\n\t\t\tpassword: String\n\t\t}\n\n\t\ttype Department{\n\t\t\tid: String,\n\t\t\tname: String!,\n\t\t\tshortcode: String!\n\t\t}\n\n\t\ttype Courses{\n\t\t\tid: String,\n\t\t\tname: String!,\n\t\t\tunit: String!,\n\t\t\tyear: String!,\n\t\t\tdepartment: [Department]\n\t\t}\n\n\t\ttype Admin{\n\t\t\tid: ID!,\n\t\t\tfirstName: String!,\n\t\t\tlastName: String!,\n\t\t\temail: String!,\n\t\t\tpassword: String!\n\t\t}\n\n\t\ttype Query{\n\t\t\tstudent(id: String!) : Student\n\t\t\tstudents : [Student]\n\t\t\tdepartment(id: String!): Department\n\t\t\tdepartments: [Department]\n\t\t\tcourses: [Courses]\n\t\t\tcourse(id: String!): Student\n\t\t}\n\n\t\ttype Mutation{\n\t\t\tcreateStudent(id: String!, firstName: String!, lastName: String!, dept_id: ID!, gender: String!, email: String!, phone_no: String!, password: String): Student\n            deleteStudent(id: String!): Student\n\t\t\tupdateStudent(id: String!, firstName: String, lastName: String, dept_id: ID, gender: String, email: String, phone_no: String, password: String, cgpa: Float, address: String, age: String, level: String, courses: [ID]): Student\n\t\t\tcreateAdmin(id: ID!, firstName: String!, lastName: String!, email: String!, password: String!): Admin\n\t\t\tdeleteAdmin(id:String!): Admin\n\t\t\tupdateAdmin(id:String!, firstName: String, lastName: String, email: String, password: String): Admin\n\t\t\tcreateCourses(id: ID, name: String!, unit: String! , year: String!, department: [String]): Courses\n\t\t\tdeleteCourses(id: String!): Courses\n\t\t\tupdateCourses(id: String!, name: String, unit: String, year: String, department: [String]): Courses\n\t\t\tcreateDepartment(id: ID, name: String!, shortcode: String!): Department\n\t\t\tdeleteDepartment(id: ID!): Department\n\t\t\tupdateDepartment(id: ID!, name: String, shortcode: String): Department\n\t\t}\n\t";

	return (0, _graphqlTools.makeExecutableSchema)({
		typeDefs: typeDefs,
		resolvers: resolvers
	});
};