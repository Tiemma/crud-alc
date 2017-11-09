import {find,filter} from "lodash"
var db = require('./db')()

export function getProjection (fieldASTs) {
  return fieldASTs.fieldNodes[0].selectionSet.selections.reduce((projections, selection) => {
    projections[selection.name.value] = true;
    return projections;
  }, {});
}


const resolvers = {
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
  }
};


export default resolvers

