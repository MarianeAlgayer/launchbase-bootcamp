const fs = require('fs')
const data = require('./data.json')
const { age, graduation, date } = require('./utils')

// index
exports.index = function(req, res) {
    return res.render('tutors/index', { tutors: data.tutors })
}

// show
exports.show = function(req, res) {

    const { id } = req.params

    const foundTutor = data.tutors.find(function(tutor) {
        return tutor.id == id
    })

    if (!foundTutor) return res.send('Tutor not found!')

    const tutor = {
        ...foundTutor,
        age: age(foundTutor.birthdate),
        education_level: graduation(foundTutor.education_level),
        subjects: foundTutor.subjects.split(","),
        created_at: new Intl.DateTimeFormat("en-GB").format(foundTutor.created_at)
    }

    return res.render('tutors/show', { tutor })
}

// create
exports.post = function(req, res) {
    
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == '') {
            return res.send('Please, fill in all required fields.')
        }
    }

    let {avatar_url, full_name, birthdate, education_level, format, subjects} = req.body

    const id = Number(data.tutors.length + 1)
    const created_at = Date.now()
    birthdate = Date.parse(birthdate)

    data.tutors.push({
        id,
        avatar_url,
        full_name,
        birthdate,
        education_level,
        format,
        subjects,
        created_at
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 4), function(err) {
        if (err) return res.send('Write file error!')

        return res.redirect('/tutors')
    })
}

// edit
exports.edit = function(req, res) {

    const { id } = req.params

    const foundTutor = data.tutors.find(function(tutor) {
        return id == tutor.id
    })

    if (!foundTutor) return res.send('Tutor not found!')

    const tutor = {
        ...foundTutor,
        birthdate: date(foundTutor.birthdate)
    }

    return res.render('tutors/edit', {tutor})
}

// put - update
exports.update = function(req, res) {

    const { id } = req.body
    /* id = Number(id) */
    let index = 0

    const foundTutor = data.tutors.find(function(tutor, foundIndex) {
        if (id == tutor.id) {
            index = foundIndex
            return true
        }
    })

    if (!foundTutor) return res.send('Tutor not found!')

    const tutor = {
        ...foundTutor,
        ...req.body,
        birthdate: Date.parse(req.body.birthdate),
        id: Number(req.body.id)
    }

    data.tutors[index] = tutor

    fs.writeFile('data.json', JSON.stringify(data, null, 4), function(err) {
        if (err) return res.send('Write file error!')

        return res.redirect(`/tutors/${id}`)
    })
}

// delete
exports.delete = function(req, res) {
    const { id } = req.body

    const filteredTutors = data.tutors.filter(function(tutor) {
        return tutor.id != id
    })

    data.tutors = filteredTutors

    fs.writeFile('data.json', JSON.stringify(data, null, 4), function(err) {
        if (err) return res.send('Write file error!')

        return res.redirect('/tutors')
    })
}