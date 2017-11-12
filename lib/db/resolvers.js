'use strict';

var _lodash = require('lodash');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mongoose = require('mongoose');
var db = require('./db')();

function getProjection(fieldASTs) {
  return fieldASTs.fieldNodes[0].selectionSet.selections.reduce(function (projections, selection) {
    projections[selection.name.value] = true;
    return projections;
  }, {});
}

module.exports = function () {
  var _resolvers;

  console.log("Resolver init");

  var resolvers = (_resolvers = {
    Query: {
      student: async function student(_, _ref) {
        var id = _ref.id;

        var student = new db.Students();
        return await student.find(id);
      },
      students: async function students() {
        var student = new db.Students();
        return await student.find();
      },
      department: async function department(_, _ref2) {
        var id = _ref2.id;

        var department = new db.Departments();
        return await department.find(id);
      },
      departments: async function departments() {
        var department = new db.Departments();
        return await department.find();
      },
      courses: async function courses() {
        var courses = new db.Courses();
        return await courses.find();
      },
      course: async function course(_, _ref3) {
        var id = _ref3.id;

        var course = new db.Courses();
        return await course.find(id);
      }
    },
    Mutation: {
      createStudent: function createStudent(_) {
        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defineProperty({ id: id, firstName: firstName, lastName: lastName, dept_id: dept_id, gender: gender, email: email, phone_no: phone_no, cgpa: cgpa, address: address, age: age, level: level, courses: courses }, 'address', address);

        return db.Students.create(data);
      },
      deleteStudent: function deleteStudent(_, _ref5) {
        var id = _ref5.id;

        console.log("Delete student started");
        return db.Students.remove(id);
      },
      updateStudent: function updateStudent(_) {
        var _ref6;

        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (_ref6 = { id: id, firstName: firstName, lastName: lastName, dept_id: dept_id, gender: gender, email: email, phone: phone, cgpa: cgpa, address: address }, _defineProperty(_ref6, 'gender', gender), _defineProperty(_ref6, 'email', email), _defineProperty(_ref6, 'age', age), _defineProperty(_ref6, 'level', level), _defineProperty(_ref6, 'phone', phone), _defineProperty(_ref6, 'courses', courses), _defineProperty(_ref6, 'password', password), _ref6);

        console.log("Update Started");
        return db.Students.update(data);
      },
      createDepartment: function createDepartment(_) {
        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { id: id, name: name, shortcode: shortcode };

        console.log("Department Creation started");
        return db.Departments.create(data);
      },
      deleteDepartment: function deleteDepartment(_, _ref7) {
        var id = _ref7.id;

        console.log("Delete department started");
        return db.Departments.remove(id);
      },
      updateDepartment: function updateDepartment(_) {
        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { id: id, name: name, shortcode: shortcode };

        console.log("Update department started");
        return db.Departments.update(data);
      },
      createAdmin: function createAdmin(_) {
        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { id: id, name: name, email: email, password: password };

        console.log("Admin Creation started");
        return db.Admins.create(data);
      },
      deleteAdmin: function deleteAdmin(_, _ref8) {
        var id = _ref8.id;

        console.log("Delete admin started");
        return db.Admins.remove(id);
      },
      updateAdmin: function updateAdmin(_) {
        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { id: id, name: name, email: email, password: password };

        console.log("Update admin started");
        return db.Admins.update(data);
      },
      createCourses: function createCourses(_) {
        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { id: id, name: name, unit: unit, year: year, department: department };

        console.log("Courses creation started");
        return db.Courses.create(data);
      },
      deleteCourses: function deleteCourses(_, _ref9) {
        var id = _ref9.id;

        console.log("Delete course started");
        return db.Courses.remove(id);
      },
      updateCourses: function updateCourses(_) {
        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { id: id, name: name, unit: unit, year: year, department: department };

        console.log("Update courses started");
        return db.Courses.update(data);
      }
    },
    Student: {
      department: async function department(student) {
        var department = new db.Departments();
        return await department.find(student.dept_id);
      }
    },
    Courses: {
      department: function (_department) {
        function department(_x9) {
          return _department.apply(this, arguments);
        }

        department.toString = function () {
          return _department.toString();
        };

        return department;
      }(async function (courses) {
        var departments = new db.Departments();
        return await department.find(courses.department);
      })
    }
  }, _defineProperty(_resolvers, 'Student', {
    courses: async function courses(student) {}
  }), _defineProperty(_resolvers, 'Courses', {
    department: async function department(departments) {
      var departments = new Departments();
    }
  }), _resolvers);

  return resolvers;
};