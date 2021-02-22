const { age, graduation, date } = require('../../lib/utils')
const Tutor = require('../models/Tutor')

module.exports = {
    index(req, res) {

        Tutor.all(function(tutors) {
            return res.render('tutors/index', { tutors })
        })
    },
    show(req, res) {

        Tutor.find(req.params.id, function(tutor) {
            if(!tutor) return res.send('Tutor not found!')

            tutor.age = age(tutor.birthdate)
            tutor.education_level = graduation(tutor.graduation_level)
            tutor.subjects = tutor.subjects.split(",")
            tutor.created_at = date(tutor.created_at).format

            return res.render('tutors/show', { tutor })
        })
    },
    create(req, res) {

        return res.render('tutors/create')
    },
    post(req, res) {

        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == '') {
                return res.send('Please, fill in all required fields.')
            }
        }

        Tutor.create(req.body, function(tutor) {
            return res.redirect(`/tutors/${tutor.id}`)
        })
    },
    edit(req, res) {

        Tutor.find(req.params.id, function(tutor) {
            if(!tutor) return res.send('Tutor not found!')

            tutor.birthdate = date(tutor.birthdate).iso

            return res.render('tutors/edit', { tutor })
        })
    },
    update(req, res) {

        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == '') {
                return res.send('Please, fill in all required fields.')
            }
        }

        Tutor.update(req.body, function() {
            return res.redirect(`/tutors/${req.body.id}`)
        })
    },
    delete(req, res) {

        Tutor.delete(req.body.id, function() {
            return res.redirect(`/tutors`)
        })
    }
}
