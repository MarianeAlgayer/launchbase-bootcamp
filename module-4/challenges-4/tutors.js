const fs = require('fs')
const data = require('./data.json')
const { age, graduation, date } = require('./utils')

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
        return tutor.id == id
    })

    if (!foundTutor) return res.send('Tutor not found!')

    const tutor = {
        ...foundTutor,
        birthdate: date(foundTutor.birthdate)
    }

    return res.render('tutors/edit', {tutor})
}