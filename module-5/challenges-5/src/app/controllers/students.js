const { date } = require('../../lib/utils')
const Student = require('../models/Student')

module.exports = {
    index(req, res) {

        Student.all(function(students) {
            return res.render('students/index', { students })
        })
    },
    show(req, res) {

        Student.find(req.params.id, function(student) {
            if(!student) return res.send('Student not found!')

            student.birthdate = date(student.birthdate).birthday

            return res.render('students/show', { student })
        })
    },
    create(req, res) {

        Student.tutorsSelectOptions(function(options) {
            return res.render('students/create', { tutorOptions: options })
        })
    },
    post(req, res) {

        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == '') {
                return res.send('Please, fill in all required fields.')
            }
        }

        Student.create(req.body, function(student) {
            return res.redirect(`/students/${student.id}`)
        })
    },
    edit(req, res) {

        Student.find(req.params.id, function(student) {
            if(!student) return res.send('Student not found!')

            student.birthdate = date(student.birthdate).iso

            Student.tutorsSelectOptions(function(options) {
                return res.render('students/edit', { student, tutorOptions: options })
            })
        })
    },
    update(req, res) {

        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == '') {
                return res.send('Please, fill in all required fields.')
            }
        }

        Student.update(req.body, function() {
            return res.redirect(`/students/${req.body.id}`)
        })
    },
    delete(req, res) {

        Student.delete(req.body.id, function() {
            return res.redirect(`/students`)
        })
    }
}

