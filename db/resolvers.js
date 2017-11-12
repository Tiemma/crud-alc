import {find,filter} from "lodash"
var mongoose = require('mongoose')
var db = require('./db')()

function getProjection (fieldASTs) {
  return fieldASTs.fieldNodes[0].selectionSet.selections.reduce((projections, selection) => {
    projections[selection.name.value] = true;
    return projections;
  }, {});
}

module.exports = function(){

  console.log("Resolver init")

  const resolvers = {
    Query: {
      student: async (_, { id }) => { 
        var student = new db.Students 
        return await student.find(id)
      },
      students: async () => { 
        var student = new db.Students
        return await student.find()
      } , 
      department: async (_, {id}) => {
        var department = new db.Departments
        return await department.find(id)
      },
      departments: async () => {
        var department = new db.Departments
        return await department.find()
      }, 
      courses: async () => {
        var courses = new db.Courses
        return await courses.find()
      },
      course: async (_, {id}) => {
        var course = new db.Courses
        return await course.find(id)
      },
    },
    Mutation: {
      createStudent: (_, data = {id, firstName, lastName, dept_id, gender, email, phone_no, cgpa, address, age, level, courses,  address}) => {
      	return db.Students.create(data)
      },
      deleteStudent: (_, {id}) => {
        console.log("Delete student started")
      	return db.Students.remove(id)
      },
      updateStudent: (_, data={id, firstName, lastName, dept_id, gender, email, phone, cgpa, address, gender, email, age, level, phone, courses, password}) => {
      	console.log("Update Started")
      	return db.Students.update(data)
       },
      createDepartment: (_, data = {id, name, shortcode} ) => {
    	console.log("Department Creation started")
    	return db.Departments.create(data)
    },
      deleteDepartment: (_, {id}) => {
    	console.log("Delete department started")
    	return db.Departments.remove(id)
    },
      updateDepartment: (_, data={id, name, shortcode}) =>{
    	console.log("Update department started")
    	return db.Departments.update(data)
    },
      createAdmin: (_, data = {id, name, email, password} ) => {
            console.log("Admin Creation started")
            return db.Admins.create(data)
    },
      deleteAdmin: (_, {id}) => {
            console.log("Delete admin started")
            return db.Admins.remove(id)
    },
      updateAdmin: (_, data={id, name, email, password}) =>{
            console.log("Update admin started")
            return db.Admins.update(data)
    },
      createCourses: (_, data = {id, name, unit, year, department} ) => {
            console.log("Courses creation started")
            return db.Courses.create(data)
    },
      deleteCourses: (_, {id}) => {
            console.log("Delete course started")
            return db.Courses.remove(id)
    },
      updateCourses: (_, data={id, name, unit, year, department}) =>{
            console.log("Update courses started")
            return db.Courses.update(data)
    },
  },
  Student: {
    department: async (student) => {
      var department = new db.Departments
      return await department.find(student.dept_id)
    }
  },
  Courses:{
    department: async(courses) => {
      var departments = new db.Departments
      return await department.find(courses.department)

    }
  },
  Student:{
    courses: async(student) =>{

    }
  },
  Courses:{
    department: async(departments) => {
        var departments = new Departments
    }
  }
  };

  return resolvers
}
