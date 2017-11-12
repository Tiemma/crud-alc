const Mongoose  = require('mongoose')
const StudentSchema  =  require("../schema/student")()
const DepartmentSchema = require("../schema/department")()
const CoursesSchema  = require("../schema/courses")()
const AdminSchema  = require("../schema/admin")()

module.exports = function(){
// DB instance  definition
const db = Mongoose.createConnection('mongodb://localhost:27017/crud');
Mongoose.Promise = global.Promise;


//Model definitions
var student = db.model('Student', StudentSchema)
var admin = db.model('Admin', AdminSchema)
var courses = db.model('Course', CoursesSchema)
var department = db.model('Department', DepartmentSchema)

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

async find(id){

	async function getPerson() {

		if(id){

        	return await student.find({"id":id}).then(await function(person){
        		return person[0]
			}).catch(function(err){return {"id": 1}})
		}else{
			return await student.find({}).then(await function(person){
        		return person
			}).catch(function(err){return {"id": 1}})
	    }

	    console.log("Function ended")

	}

	let person = await getPerson()
	return person
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
	adminData.id = Mongoose.Types.ObjectId()
	const inst = new admin(adminData)

	inst.save(function(err){
                if(err) return console.log(err)
                console.log("Admin Created successfully, ID: " + adminData.id)
        })
	return inst
}

async find(id){

	async function getPerson() {

		if(id){

        	return await admin.find({"id":id}).then(await function(person){
        		return person[0]
			}).catch(function(err){return {"id": 1}})
		}else{
			return await admin.find({}).then(await function(person){
        		return person
			}).catch(function(err){return {"id": 1}})
	    }

	    console.log("Function ended")

	}

	let person = await getPerson()
	return person
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
	courseData.id = Mongoose.Types.ObjectId()
	const inst = new courses(courseData)

	inst.save(function(err){
                if(err) return console.log(err)
                console.log("Course created successfully, ID: " + courseData.id)
        });

}

async find(id){

	async function getPerson() {

		if(id){

        	return await courses.find({"id":id}).then(await function(person){
        		return person[0]
			}).catch(function(err){return {"id": 1}})
		}else{
			return await courses.find({}).then(await function(person){
        		return person
			}).catch(function(err){return {"id": 1}})
	    }

	    console.log("Function ended")

	}

	let person = await getPerson()
	return person
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
		deptData.id = Mongoose.Types.ObjectId()
        const inst = new department(deptData)

        inst.save(function(err){
                if(err) return console.log(err)
                console.log("Department created successfully, ID: " + deptData.id)
        });
}

async find(id) {

	async function getPerson() {

		if(id){

        	return await department.find({"id":id}).then(await function(person){
        		return person[0]
			}).catch(function(err){return {"id": 1}})
		}else{
			return await department.find({}).then(await function(person){
        		return person
			}).catch(function(err){return {"id": 1}})
	    }

	}

	console.log("Function ended")


	let person = await getPerson()
	return person
}

static remove(id){
	department.remove({"id": id}, function(err){
		if(err) console.log("An error occurred")
		console.log("Course with ID: " + id + " has been removed")
	})
}

static update(data){
	department.update({id: data.id}, { $set: data}, function(err, raw){
		if(err) return console.log("An error occured" + err)
		console.log("Update successful: " + JSON.stringify(raw))
	})

}


}


return {db, Admins, Students, admin, student, courses, department, Courses, Departments}
}
