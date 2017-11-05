import Mongoose from 'mongoose';
import StudentSchema from "./schema/student"
import DepartmentSchema from "./schema/department"
import CoursesSchema from "./schema/courses"
import AdminSchema from "./schema/admin"



module.exports = function(){
// DB instance  definition

const db = Mongoose.createConnection('mongodb://localhost:27017/crud');

console.log("DB Connected")

//Model definitions
var student = db.model('Student', StudentSchema)
var admin = db.model('Admin', AdminSchema())
var courses = db.model('Course', CoursesSchema)
var dept = db.model('Department', DepartmentSchema)

var studentData = []


//Student class
class Students{

static create(studentData){
	const inst = new student(studentData)

	inst.save(function(err){
		if(err) return console.log(err)
		console.log("Student created successfully, ID: " + studentData.id)
	});
	return "Created successfully"
}

static find(id, projections){

	var dataCallBack = new Promise((resolve, reject) => {
	if(id)
        	student.find({"id":id}, projections, (err, person)=>{
			if (err){
				console.log(err)
				reject(err)
			}else{
				console.log(person)
				resolve(person)
			}
		})
	else
		student.find({available: true}, projections, (err, persons)=> {
          	if (err) {
			console.log(err)
			reject(err);
         	 } else {
			console.log(persons)
            		resolve(persons);
          }
        });
      });

      return dataCallBack
}

static remove(id){
	student.remove({"id": id}, function(err){
		if(err) console.log("An error occurred")
		console.log("Student with ID: " + id + " has been removed")
	})
}

static update(data){
	student.update({id: data.id}, { $set: data}, function(err, raw){
		if(err) return console.log("An error occured" + err)
		console.log("Update successful: " + JSON.stringify(raw))
	})

}

}


class Admins{

static create(adminData){
	const inst = new admin(adminData)

	inst.save(function(err){
                if(err) return console.log(err)
                console.log("Admin Created successfully, ID: " + adminData.id)
        })
	return inst
}

static find(id, projections){

	var dataCallBack = new Promise((resolve, reject) => {
	if(id)
        	admin.find({"id":id}, projections, (err, person)=>{
			if (err){
				reject(err)
			}else{
				resolve(person)
			}
		})
	else
		admin.find({available: true}, projections, (err, persons)=> {
          	if (err) {
			reject(err);
         	 } else {
            		resolve(persons);
          }
        });
      });

      return dataCallBack
}

static remove(id){
	admin.remove({"id": id}, function(err){
		if(err) console.log("An error occurred")
		console.log("Admin with ID: " + id + " has been removed")
	})
}

static update(data){
	admin.update({id: data.id}, { $set: data}, function(err, raw){
		if(err) return console.log("An error occured" + err)
		console.log("Update successful: " + JSON.stringify(raw))
	})

}


}

class Courses{

static create(courseData){
	const inst = new course(courseData)

	inst.save(function(err){
                if(err) return console.log(err)
                console.log("Course created successfully, ID: " + courseData.id)
        });

}

static find(id, projections){

	var dataCallBack = new Promise((resolve, reject) => {
	if(id)
        	course.find({"id":id}, projections, (err, person)=>{
			if (err){
				reject(err)
			}else{
				resolve(person)
			}
		})
	else
		course.find({available: true}, projections, (err, persons)=> {
          	if (err) {
			reject(err);
         	 } else {
            		resolve(persons);
          }
        });
      });

      return dataCallBack
}

static remove(id){
	course.remove({"id": id}, function(err){
		if(err) console.log("An error occurred")
		console.log("Course with ID: " + id + " has been removed")
	})
}

static update(data){
	course.update({id: data.id}, { $set: data}, function(err, raw){
		if(err) return console.log("An error occured" + err)
		console.log("Update successful: " + JSON.stringify(raw))
	})

}



}

class Departments{

static create(deptData){
        const inst = new dept(deptData)

        inst.save(function(err){
                if(err) return console.log(err)
                console.log("Department created successfully, ID: " + deptData.id)
        });
}


static find(id, projections){

	var dataCallBack = new Promise((resolve, reject) => {
	if(id)
        	dept.find({"id":id}, projections, (err, person)=>{
			if (err){
				reject(err)
			}else{
				resolve(person)
			}
		})
	else
		dept.find({available: true}, projections, (err, persons)=> {
          	if (err) {
			reject(err);
         	 } else {
            		resolve(persons);
          }
        });
      });

      return dataCallBack
}

static remove(id){
	dept.remove({"id": id}, function(err){
		if(err) console.log("An error occurred")
		console.log("Course with ID: " + id + " has been removed")
	})
}

static update(data){
	dept.update({id: data.id}, { $set: data}, function(err, raw){
		if(err) return console.log("An error occured" + err)
		console.log("Update successful: " + JSON.stringify(raw))
	})

}


}


return {db, Admins, Students, admin, student, courses, dept, Courses, Departments}
}
