"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _student = require("./schema/student");

var _student2 = _interopRequireDefault(_student);

var _department = require("./schema/department");

var _department2 = _interopRequireDefault(_department);

var _courses = require("./schema/courses");

var _courses2 = _interopRequireDefault(_courses);

var _admin = require("./schema/admin");

var _admin2 = _interopRequireDefault(_admin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
	// DB instance  definition

	var db = _mongoose2.default.createConnection('mongodb://crud:crud@ds249575.mlab.com:49575/crud');

	console.log("DB Connected");

	//Model definitions
	var student = db.model('Student', _student2.default);
	var admin = db.model('Admin', (0, _admin2.default)());
	var courses = db.model('Course', _courses2.default);
	var dept = db.model('Department', _department2.default);

	var studentData = [];

	//Student class

	var Students = function () {
		function Students() {
			_classCallCheck(this, Students);
		}

		_createClass(Students, null, [{
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
			key: "find",
			value: function find(id, projections) {

				var dataCallBack = new Promise(function (resolve, reject) {
					if (id) student.find({ "id": id }, projections, function (err, person) {
						if (err) {
							console.log(err);
							reject(err);
						} else {
							console.log(person);
							resolve(person);
						}
					});else student.find({ available: true }, projections, function (err, persons) {
						if (err) {
							console.log(err);
							reject(err);
						} else {
							console.log(persons);
							resolve(persons);
						}
					});
				});

				return dataCallBack;
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

		_createClass(Admins, null, [{
			key: "create",
			value: function create(adminData) {
				var inst = new admin(adminData);

				inst.save(function (err) {
					if (err) return console.log(err);
					console.log("Admin Created successfully, ID: " + adminData.id);
				});
				return inst;
			}
		}, {
			key: "find",
			value: function find(id, projections) {

				var dataCallBack = new Promise(function (resolve, reject) {
					if (id) admin.find({ "id": id }, projections, function (err, person) {
						if (err) {
							reject(err);
						} else {
							resolve(person);
						}
					});else admin.find({ available: true }, projections, function (err, persons) {
						if (err) {
							reject(err);
						} else {
							resolve(persons);
						}
					});
				});

				return dataCallBack;
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

		_createClass(Courses, null, [{
			key: "create",
			value: function create(courseData) {
				var inst = new course(courseData);

				inst.save(function (err) {
					if (err) return console.log(err);
					console.log("Course created successfully, ID: " + courseData.id);
				});
			}
		}, {
			key: "find",
			value: function find(id, projections) {

				var dataCallBack = new Promise(function (resolve, reject) {
					if (id) course.find({ "id": id }, projections, function (err, person) {
						if (err) {
							reject(err);
						} else {
							resolve(person);
						}
					});else course.find({ available: true }, projections, function (err, persons) {
						if (err) {
							reject(err);
						} else {
							resolve(persons);
						}
					});
				});

				return dataCallBack;
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

		_createClass(Departments, null, [{
			key: "create",
			value: function create(deptData) {
				var inst = new dept(deptData);

				inst.save(function (err) {
					if (err) return console.log(err);
					console.log("Department created successfully, ID: " + deptData.id);
				});
			}
		}, {
			key: "find",
			value: function find(id, projections) {

				var dataCallBack = new Promise(function (resolve, reject) {
					if (id) dept.find({ "id": id }, projections, function (err, person) {
						if (err) {
							reject(err);
						} else {
							resolve(person);
						}
					});else dept.find({ available: true }, projections, function (err, persons) {
						if (err) {
							reject(err);
						} else {
							resolve(persons);
						}
					});
				});

				return dataCallBack;
			}
		}, {
			key: "remove",
			value: function remove(id) {
				dept.remove({ "id": id }, function (err) {
					if (err) console.log("An error occurred");
					console.log("Course with ID: " + id + " has been removed");
				});
			}
		}, {
			key: "update",
			value: function update(data) {
				dept.update({ id: data.id }, { $set: data }, function (err, raw) {
					if (err) return console.log("An error occured" + err);
					console.log("Update successful: " + JSON.stringify(raw));
				});
			}
		}]);

		return Departments;
	}();

	return { db: db, Admins: Admins, Students: Students, admin: admin, student: student, courses: courses, dept: dept, Courses: Courses, Departments: Departments };
};