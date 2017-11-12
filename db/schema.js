import { makeExecutableSchema } from 'graphql-tools'
const resolvers = require("./resolvers")()

module.exports = function(){

	console.log("Schema init")

	const typeDefs = `

		type Student{
			id: String!,
			firstName: String!,
			lastName: String!,
			dept_id: ID!,
			department: Department,
			cgpa: Float,
			address: String,
			gender: String!,
			email: String!,
			age: String,
			level: String,
			phone_no: String!,
			courses: [Courses],
			password: String
		}

		type Department{
			id: String,
			name: String!,
			shortcode: String!
		}

		type Courses{
			id: String,
			name: String!,
			unit: String!,
			year: String!,
			department: [Department]
		}

		type Admin{
			id: ID!,
			firstName: String!,
			lastName: String!,
			email: String!,
			password: String!
		}

		type Query{
			student(id: String!) : Student
			students : [Student]
			department(id: String!): Department
			departments: [Department]
			courses: [Courses]
			course(id: String!): Student
		}

		type Mutation{
			createStudent(id: String!, firstName: String!, lastName: String!, dept_id: ID!, gender: String!, email: String!, phone_no: String!, password: String): Student
            deleteStudent(id: String!): Student
			updateStudent(id: String!, firstName: String, lastName: String, dept_id: ID, gender: String, email: String, phone_no: String, password: String, cgpa: Float, address: String, age: String, level: String, courses: [ID]): Student
			createAdmin(id: ID!, firstName: String!, lastName: String!, email: String!, password: String!): Admin
			deleteAdmin(id:String!): Admin
			updateAdmin(id:String!, firstName: String, lastName: String, email: String, password: String): Admin
			createCourses(id: ID, name: String!, unit: String! , year: String!, department: [String]): Courses
			deleteCourses(id: String!): Courses
			updateCourses(id: String!, name: String, unit: String, year: String, department: [String]): Courses
			createDepartment(id: ID, name: String!, shortcode: String!): Department
			deleteDepartment(id: ID!): Department
			updateDepartment(id: ID!, name: String, shortcode: String): Department
		}
	`;

	return makeExecutableSchema({
	  typeDefs,
	  resolvers
	});
}

