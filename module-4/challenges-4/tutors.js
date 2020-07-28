const fs = require('fs')
const data = require('./data.json')

// create
exports.post = function(req, res) {
    
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == '') {
            return res.send('Please, fill in all required fields.')
        }
    }

    let {avatar_url, full_name, birthdate, education_level, format, subject} = req.body

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
        subject,
        created_at
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 4), function(err) {
        if (err) return res.send('Write file error!')

        return res.redirect('/tutors')
    })
}
