const express = require('express')
const routes = express.Router()
const tutors = require('./controllers/tutors')
const students = require('./controllers/students')

routes.get('/', function(req, res) {
    return res.redirect('/tutors')
})

// tutors

routes.get('/tutors', tutors.index)
routes.get('/tutors/create', tutors.create)
routes.get('/tutors/:id', tutors.show)
routes.get('/tutors/:id/edit', tutors.edit)
routes.post('/tutors', tutors.post)
routes.put('/tutors', tutors.update)
routes.delete('/tutors', tutors.delete)

// students

routes.get('/students', students.index)
routes.get('/students/create', students.create)
routes.get('/students/:id', students.show)
routes.get('/students/:id/edit', students.edit)
routes.post('/students', students.post)
routes.put('/students', students.update)
routes.delete('/students', students.delete)

module.exports = routes
