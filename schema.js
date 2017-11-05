import { makeExecutableSchema } from 'graphql-tools'
import resolvers from "./resolvers"


const typeDefs = `

	type Student{
		id: Int!,
		firstName: String!,
		lastName: String!,
		dept_id: Department!,
		cgpa: Float,
		address: String,
		gender: Boolean!,
		email: String!,
		age: Int,
		level: Int,
		phone: String!,
		courses: [Courses],
		password: String!
	}

	type Department{
		id: ID!,
		name: String!,
		shortcode: String!
	}

	type Courses{
		id: ID!,
		name: String!,
		unit: Int!,
		year: Int!,
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
		student(id: Int!): Student
		student : Student
	}

	type Mutation{
		createStudent(id: Int!, firstName: String!, lastName: String!, dept_id: ID!, gender: Boolean!, email: String!, phone_no: String!, password: String!): Student
                deleteStudent(id: Int!): Student
		updateStudent(id: Int!, firstName: String, lastName: String, dept_id: ID, gender: Boolean, email: String, phone_no: String, password: String, cgpa: Float, address: String, age: Int, level: Int, courses: [ID]): Student
		createAdmin(id: ID!, firstName: String!, lastName: String!, email: String!, password: String!): Admin
		deleteAdmin(id:Int!): Admin
		updateAdmin(id:Int!, firstName: String, lastName: String, email: String, password: String): Admin
		createCourses(id: ID!, name: String!, units: String! , year: Int!, department: [ID]): Courses
		deleteCourses(id: Int!): Courses
		updateCourses(id: Int!, name: String, unit: Int, year: String, department: String): Courses
		createDepartment(id: ID!, name: String!, shortcode: String!): Department
		deleteDepartment(id: ID!): Department
		updateDepartment(id: ID!, name: String, shortcode: String): Department
	}
`;

export default makeExecutableSchema({
  typeDefs,
  resolvers
});

