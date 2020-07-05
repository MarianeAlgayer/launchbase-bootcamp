const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const courses = require('./data')

server.use(express.static('public'))

server.set('view engine', 'njk')

nunjucks.configure('views', {
    express:server,
    autoescape:false,
    noCache:true
})

server.get('/', function(req, res) {
    return res.render('home')
})

server.get('/about', function(req, res) {
    return res.render('about')
})

server.get('/courses', function(req, res) {
    return res.render('courses', { items: courses })
})

server.get('/courses/:id', function(req, res) {
    const id = req.params.id

    const course = courses.find(function(course) {
        if (course.id == id) {
            return true
        }
    })

    if (!course) {
        return res.render('not-found')
    }

    return res.render('course-description', { course: course })
})

server.use(function(req, res) {
    res.status(404).render('not-found')
})

server.listen(5000, function() {
    console.log('server is running')
})
