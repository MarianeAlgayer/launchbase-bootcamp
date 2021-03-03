const { date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    all(callback) {

        db.query(`
            SELECT * 
            FROM students`, function(err, results) {
                if(err) throw `Database Error! ${err}`

                callback(results.rows)
        })
    },
    create(data, callback) {

        const query = `
            INSERT INTO students (
                avatar_url, 
                full_name,
                email, 
                birthdate, 
                school_year,
                workload,
                tutor_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `

        const values = [
            data.avatar_url,
            data.full_name,
            data.email,
            date(data.birthdate).iso,
            data.school_year,
            data.workload,
            data.tutor
        ]

        db.query(query, values, function(err, results) {
            if(err) throw `Database Error! ${err}`
            
            callback(results.rows[0])
        })
    },
    find(id, callback) {

        db.query(`
            SELECT students.*, tutors.full_name AS tutor_name
            FROM students 
            LEFT JOIN tutors ON (students.tutor_id = tutors.id)
            WHERE students.id = $1`, [id], function(err, results) {
                if(err) throw `Database Error! ${err}`

                callback(results.rows[0])
            })
    },
    update(data, callback) {

        const query = `
            UPDATE students SET
                avatar_url=($1), 
                full_name=($2), 
                email=($3),
                birthdate=($4), 
                school_year=($5),
                workload=($6),
                tutor_id=($7)
            WHERE id = $8
        `

        const values = [
            data.avatar_url,
            data.full_name,
            data.email,
            date(data.birthdate).iso,
            data.school_year,
            data.workload,
            data.tutor,
            data.id
        ]

        db.query(query, values, function(err, results) {
            if(err) throw `Database Error! ${err}`

            callback()
        })
    },
    delete(id, callback) {

        db.query(`
            DELETE FROM students
            WHERE id = $1`, [id], function(err, results) {
                if(err) throw `Database Error! ${err}`

                callback()
            })
    },
    tutorsSelectOptions(callback) {

        db.query(`
            SELECT full_name, id 
            FROM tutors`, function(err, results) {
                if(err) throw `Database Error! ${err}`

                callback(results.rows)
            })
    },
    paginate(params) {

        const { filter, limit, offset, callback } = params

        let query = '',
            filterQuery = '',
            totalQuery = `(
                SELECT count(*) FROM students
            ) AS total`

        if(filter) {
            filterQuery = `
                ${query}
                WHERE students.full_name ILIKE '%${filter}%'
                OR students.email ILIKE '%${filter}%'
            `

            totalQuery = `(
                SELECT count(*) FROM students
                ${filterQuery}
            ) AS total`
        }

        query = `
            SELECT students.*, ${totalQuery}
            FROM students
            ${filterQuery}
            LIMIT $1 OFFSET $2
        `

        db.query(query, [limit, offset], function(err, results) {
            if(err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    }
}