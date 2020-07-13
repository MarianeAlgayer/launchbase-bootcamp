const express = require('express')
const routes = express.Router()

routes.get('/', function(req, res) {
    return res.redirect('tutors')
})

routes.get('/tutors', function(req, res) {
    return res.render('tutors')
})

routes.get('/students', function(req, res) {
    return res.render('students')
})

module.exports = routes