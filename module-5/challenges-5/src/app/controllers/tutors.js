const { age, graduation, date } = require('../../lib/utils')

module.exports = {
    index(req, res) {
        
        return res.render('tutors/index')
    },
    show(req, res) {

        return
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
    
        let {avatar_url, full_name, birthdate, education_level, format, subjects} = req.body
    
        return
    },
    edit(req, res) {

        return
    },
    update(req, res) {

        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == '') {
                return res.send('Please, fill in all required fields.')
            }
        }

        return
    },
    delete(req, res) {

        return
    }
}
