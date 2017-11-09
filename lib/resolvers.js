"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProjection = getProjection;

var _lodash = require("lodash");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var db = require('./db')();

function getProjection(fieldASTs) {
  return fieldASTs.fieldNodes[0].selectionSet.selections.reduce(function (projections, selection) {
    projections[selection.name.value] = true;
    return projections;
  }, {});
}

var resolvers = {
  Mutation: {
    createStudent: function createStudent(_) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defineProperty({ id: id, firstName: firstName, lastName: lastName, dept_id: dept_id, gender: gender, email: email, phone_no: phone_no, cgpa: cgpa, address: address, age: age, level: level, courses: courses }, "address", address);

      return db.Students.create(data);
    },
    deleteStudent: function deleteStudent(_, _ref2) {
      var id = _ref2.id;

      console.log("Delete student started");
      return db.Students.remove(id);
    },
    updateStudent: function updateStudent(_) {
      var _ref3;

      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (_ref3 = { id: id, firstName: firstName, lastName: lastName, dept_id: dept_id, gender: gender, email: email, phone: phone, cgpa: cgpa, address: address }, _defineProperty(_ref3, "gender", gender), _defineProperty(_ref3, "email", email), _defineProperty(_ref3, "age", age), _defineProperty(_ref3, "level", level), _defineProperty(_ref3, "phone", phone), _defineProperty(_ref3, "courses", courses), _defineProperty(_ref3, "password", password), _ref3);

      console.log("Update Started");
      return db.Students.update(data);
    },
    createDepartment: function createDepartment(_) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { id: id, name: name, shortcode: shortcode };

      console.log("Department Creation started");
      return db.Departments.create(data);
    },
    deleteDepartment: function deleteDepartment(_, _ref4) {
      var id = _ref4.id;

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
    deleteAdmin: function deleteAdmin(_, _ref5) {
      var id = _ref5.id;

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
    deleteCourses: function deleteCourses(_, _ref6) {
      var id = _ref6.id;

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