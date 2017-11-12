"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mongoose = require('mongoose');
var StudentSchema = require("../schema/student")();
var DepartmentSchema = require("../schema/department")();
var CoursesSchema = require("../schema/courses")();
var AdminSchema = require("../schema/admin")();

module.exports = function () {
	// DB instance  definition
	var db = Mongoose.createConnection('mongodb://localhost:27017/crud');
	Mongoose.Promise = global.Promise;

	//Model definitions
	var student = db.model('Student', StudentSchema);
	var admin = db.model('Admin', AdminSchema);
	var courses = db.model('Course', CoursesSchema);
	var department = db.model('Department', DepartmentSchema);

	//Student class

	var Students = function () {
		function Students() {
			_classCallCheck(this, Students);
		}

		_createClass(Students, [{
			key: "find",
			value: async function find(id) {

				async function getPerson() {

					if (id) {

						return await student.find({ "id": id }).then((await function (person) {
							return person[0];
						})).catch(function (err) {
							return { "id": 1 };
						});
					} else {
						return await student.find({}).then((await function (person) {
							return person;
						})).catch(function (err) {
							return { "id": 1 };
						});
					}

					console.log("Function ended");
				}

				var person = await getPerson();
				return person;
			}
		}], [{
			key: "create",
			value: function create(studentData) {
				var inst = new student(studentData);

				inst.save(function (err) {
					if (err) return console.log(err);
					console.log("Student created successfully, ID: " + studentData.id);
				});

				return "Created successfully";
			}
		}, {
			key: "remove",
			value: function remove(id) {
				student.remove({ "id": id }, function (err) {
					if (err) console.log("An error occurred");
					console.log("Student with ID: " + id + " has been removed");
				});
			}
		}, {
			key: "update",
			value: function update(data) {
				student.update({ id: data.id }, { $set: data }, function (err, raw) {
					if (err) return console.log("An error occured" + err);
					console.log("Update successful: " + JSON.stringify(raw));
				});
			}
		}]);

		return Students;
	}();

	var Admins = function () {
		function Admins() {
			_classCallCheck(this, Admins);
		}

		_createClass(Admins, [{
			key: "find",
			value: async function find(id) {

				async function getPerson() {

					if (id) {

						return await admin.find({ "id": id }).then((await function (person) {
							return person[0];
						})).catch(function (err) {
							return { "id": 1 };
						});
					} else {
						return await admin.find({}).then((await function (person) {
							return person;
						})).catch(function (err) {
							return { "id": 1 };
						});
					}

					console.log("Function ended");
				}

				var person = await getPerson();
				return person;
			}
		}], [{
			key: "create",
			value: function create(adminData) {
				adminData.id = Mongoose.Types.ObjectId();
				var inst = new admin(adminData);

				inst.save(function (err) {
					if (err) return console.log(err);
					console.log("Admin Created successfully, ID: " + adminData.id);
				});
				return inst;
			}
		}, {
			key: "remove",
			value: function remove(id) {
				admin.remove({ "id": id }, function (err) {
					if (err) console.log("An error occurred");
					console.log("Admin with ID: " + id + " has been removed");
				});
			}
		}, {
			key: "update",
			value: function update(data) {
				admin.update({ id: data.id }, { $set: data }, function (err, raw) {
					if (err) return console.log("An error occured" + err);
					console.log("Update successful: " + JSON.stringify(raw));
				});
			}
		}]);

		return Admins;
	}();

	var Courses = function () {
		function Courses() {
			_classCallCheck(this, Courses);
		}

		_createClass(Courses, [{
			key: "find",
			value: async function find(id) {

				async function getPerson() {

					if (id) {

						return await courses.find({ "id": id }).then((await function (person) {
							return person[0];
						})).catch(function (err) {
							return { "id": 1 };
						});
					} else {
						return await courses.find({}).then((await function (person) {
							return person;
						})).catch(function (err) {
							return { "id": 1 };
						});
					}

					console.log("Function ended");
				}

				var person = await getPerson();
				return person;
			}
		}], [{
			key: "create",
			value: function create(courseData) {
				courseData.id = Mongoose.Types.ObjectId();
				var inst = new courses(courseData);

				inst.save(function (err) {
					if (err) return console.log(err);
					console.log("Course created successfully, ID: " + courseData.id);
				});
			}
		}, {
			key: "remove",
			value: function remove(id) {
				course.remove({ "id": id }, function (err) {
					if (err) console.log("An error occurred");
					console.log("Course with ID: " + id + " has been removed");
				});
			}
		}, {
			key: "update",
			value: function update(data) {
				course.update({ id: data.id }, { $set: data }, function (err, raw) {
					if (err) return console.log("An error occured" + err);
					console.log("Update successful: " + JSON.stringify(raw));
				});
			}
		}]);

		return Courses;
	}();

	var Departments = function () {
		function Departments() {
			_classCallCheck(this, Departments);
		}

		_createClass(Departments, [{
			key: "find",
			value: async function find(id) {

				async function getPerson() {

					if (id) {

						return await department.find({ "id": id }).then((await function (person) {
							return person[0];
						})).catch(function (err) {
							return { "id": 1 };
						});
					} else {
						return await department.find({}).then((await function (person) {
							return person;
						})).catch(function (err) {
							return { "id": 1 };
						});
					}
				}

				console.log("Function ended");

				var person = await getPerson();
				return person;
			}
		}], [{
			key: "create",
			value: function create(deptData) {
				deptData.id = Mongoose.Types.ObjectId();
				var inst = new department(deptData);

				inst.save(function (err) {
					if (err) return console.log(err);
					console.log("Department created successfully, ID: " + deptData.id);
				});
			}
		}, {
			key: "remove",
			value: function remove(id) {
				department.remove({ "id": id }, function (err) {
					if (err) console.log("An error occurred");
					console.log("Course with ID: " + id + " has been removed");
				});
			}
		}, {
			key: "update",
			value: function update(data) {
				department.update({ id: data.id }, { $set: data }, function (err, raw) {
					if (err) return console.log("An error occured" + err);
					console.log("Update successful: " + JSON.stringify(raw));
				});
			}
		}]);

		return Departments;
	}();

	return { db: db, Admins: Admins, Students: Students, admin: admin, student: student, courses: courses, department: department, Courses: Courses, Departments: Departments };
};