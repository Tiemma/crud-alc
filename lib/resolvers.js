"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProjection = getProjection;

var _lodash = require("lodash");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

var db = require('./db')();

function getProjection(fieldASTs) {
  return fieldASTs.fieldNodes[0].selectionSet.selections.reduce(function (projections, selection) {
    projections[selection.name.value] = true;
    return projections;
  }, {});
}

var resolvers = {
  Query: _defineProperty({
    student: function student(root, _ref, source, fieldASTs) {
      _objectDestructuringEmpty(_ref);

      var student = [];
      db.Students.find(null, getProjection(fieldASTs)).then(function (err, person) {
        console.log(person);
        student.push(person);
      });
      return student;
    }
  }, "student", function student(root, _ref2, source, fieldASTs) {
    var id = _ref2.id;

    var student = [];
    db.Students.find(id, getProjection(fieldASTs)).then(function (err, person) {
      console.log(person);
      student.push(person);
    });
    return student;
  }),
  Mutation: {
    createStudent: function createStudent(_) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defineProperty({ id: id, firstName: firstName, lastName: lastName, dept_id: dept_id, gender: gender, email: email, phone: phone, cgpa: cgpa, address: address, age: age, level: level, courses: courses }, "address", address);

      return db.Students.create(data);
    },
    deleteStudent: function deleteStudent(_, _ref4) {
      var id = _ref4.id;

      console.log("Delete student started");
      return db.Students.remove(id);
    },
    updateStudent: function updateStudent(_) {
      var _ref5;

      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (_ref5 = { id: id, firstName: firstName, lastName: lastName, dept_id: dept_id, gender: gender, email: email, phone: phone, cgpa: cgpa, address: address }, _defineProperty(_ref5, "gender", gender), _defineProperty(_ref5, "email", email), _defineProperty(_ref5, "age", age), _defineProperty(_ref5, "level", level), _defineProperty(_ref5, "phone", phone), _defineProperty(_ref5, "courses", courses), _defineProperty(_ref5, "password", password), _ref5);

      console.log("Update Started");
      return db.Students.update(data);
    },
    createDepartment: function createDepartment(_) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { id: id, name: name, shortcode: shortcode };

      console.log("Department Creation started");
      return db.Departments.create(data);
    },
    deleteDepartment: function deleteDepartment(_, _ref6) {
      var id = _ref6.id;

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
    deleteAdmin: function deleteAdmin(_, _ref7) {
      var id = _ref7.id;

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
    deleteCourses: function deleteCourses(_, _ref8) {
      var id = _ref8.id;

      console.log("Delete course started");
      return db.Courses.remove(id);
    },
    updateCourses: function updateCourses(_) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { id: id, name: name, unit: unit, year: year, department: department };

      console.log("Update courses started");
      return db.Courses.update(data);
    }
  }
};

exports.default = resolvers;