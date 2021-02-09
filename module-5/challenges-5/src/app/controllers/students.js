const { date } = require('../../lib/utils')

module.exports = {
    index(req, res) {

        return res.render('students/index')
    },
    show(req, res) {

        return
    },
    create(req, res) {

        return res.render('students/create')
    },
    post(req, res) {

        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == '') {
                return res.send('Please, fill in all required fields.')
            }
        }
    
        let {avatar_url, full_name, email, birthdate, school_year, workload } = req.body
    
        return
    },
    edit(req, res) {

        return
    },
    update(req, res) {

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
    
        return
    },
    delete(req, res) {

        return
    }
}
