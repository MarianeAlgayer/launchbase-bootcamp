const express = require('express')
const routes = express.Router()
const tutors = require('./tutors')

routes.get('/', function(req, res) {
    return res.redirect('/tutors')
})

routes.get('/tutors', tutors.index)

routes.get('/tutors/create', function(req,res) {
    return res.render('tutors/create')
})

routes.get('/tutors/:id', tutors.show)

routes.get('/tutors/:id/edit', tutors.edit)

routes.post('/tutors', tutors.post)

routes.put('/tutors', tutors.update)

routes.delete('/tutors', tutors.delete)

routes.get('/students', function(req, res) {
    return res.render('students/index')
})

module.exports = routes
