const fs = require('fs')
const data = require('../data.json')
const { date } = require('../utils')

// index
exports.index = function(req, res) {
    return res.render('students/index', { students: data.students })
}

// show
exports.show = function(req, res) {

    const { id } = req.params

    const foundStudent = data.students.find(function(student) {
        return student.id == id
    })

    if (!foundStudent) return res.send('Student not found!')

    const student = {
        ...foundStudent,
        birthdate: date(foundStudent.birthdate).birthday
    }

    return res.render('students/show', { student })
}

// create
exports.create = function(req,res) {
    return res.render('students/create')
}

// post
exports.post = function(req, res) {
    
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == '') {
            return res.send('Please, fill in all required fields.')
        }
    }

    let {avatar_url, full_name, email, birthdate, school_year, workload } = req.body

    let id = 1
    const lastStudent = data.students[data.students.length - 1]

    if (lastStudent) {
        id = lastStudent.id + 1
    }

    birthdate = Date.parse(birthdate)

    data.students.push({
        id,
        avatar_url,
        full_name,
        email,
        birthdate,
        school_year,
        workload
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 4), function(err) {
        if (err) return res.send('Write file error!')

        return res.redirect('/students')
    })
}

// edit
exports.edit = function(req, res) {

    const { id } = req.params

    const foundStudent = data.students.find(function(student) {
        return id == student.id
    })

    if (!foundStudent) return res.send('Student not found!')

    const student = {
        ...foundStudent,
        birthdate: date(foundStudent.birthdate).iso
    }

    return res.render('students/edit', {student})
}

// put - update
exports.update = function(req, res) {

    const { id } = req.body
    /* id = Number(id) */
    let index = 0

    const foundStudent = data.students.find(function(student, foundIndex) {
        if (id == student.id) {
            index = foundIndex
            return true
        }
    })

    if (!foundStudent) return res.send('Student not found!')

    const student = {
        ...foundStudent,
        ...req.body,
        birthdate: Date.parse(req.body.birthdate),
        id: Number(req.body.id)
    }

    data.students[index] = student

    fs.writeFile('data.json', JSON.stringify(data, null, 4), function(err) {
        if (err) return res.send('Write file error!')

        return res.redirect(`/students/${id}`)
    })
}

// delete
exports.delete = function(req, res) {
    const { id } = req.body

    const filteredStudents = data.students.filter(function(student) {
        return student.id != id
    })

    data.students = filteredStudents

    fs.writeFile('data.json', JSON.stringify(data, null, 4), function(err) {
        if (err) return res.send('Write file error!')

        return res.redirect('/students')
    })
}