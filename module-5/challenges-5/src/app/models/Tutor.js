const { date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    all(callback) {

        db.query(`
            SELECT tutors.*, count(students) AS total_students 
            FROM tutors
            LEFT JOIN students ON (tutors.id = students.tutor_id)
            GROUP BY tutors.id
            ORDER BY total_students DESC`, function(err, results) {
                if(err) throw `Database Error! ${err}`

                callback(results.rows)
        })
    },
    create(data, callback) {

        const query = `
            INSERT INTO tutors (
                avatar_url, 
                full_name, 
                birthdate, 
                education_level, 
                format, 
                subjects,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `

        const values = [
            data.avatar_url,
            data.full_name,
            date(data.birthdate).iso,
            data.education_level,
            data.format,
            data.subjects,
            date(Date.now()).iso
        ]

        db.query(query, values, function(err, results) {
            if(err) throw `Database Error! ${err}`
            
            callback(results.rows[0])
        })
    },
    find(id, callback) {

        db.query(`
            SELECT * 
            FROM tutors 
            WHERE id = $1`, [id], function(err, results) {
                if(err) throw `Database Error! ${err}`

                callback(results.rows[0])
            })
    },
    findBy(filter, callback) {

        db.query(`
            SELECT tutors.*, count(students) AS total_students 
            FROM tutors
            LEFT JOIN students ON (tutors.id = students.tutor_id)
            WHERE tutors.full_name ILIKE '%${filter}%'
            OR tutors.subjects ILIKE '%${filter}%'
            GROUP BY tutors.id
            ORDER BY total_students DESC`, function(err, results) {
                if(err) throw `Database Error! ${err}`

                callback(results.rows)
        })
    },
    update(data, callback) {

        const query = `
            UPDATE tutors SET
                avatar_url=($1), 
                full_name=($2), 
                birthdate=($3), 
                education_level=($4), 
                format=($5), 
                subjects=($6)
            WHERE id = $7
        `

        const values = [
            data.avatar_url,
            data.full_name,
            date(data.birthdate).iso,
            data.education_level,
            data.format,
            data.subjects,
            data.id
        ]

        db.query(query, values, function(err, results) {
            if(err) throw `Database Error! ${err}`

            callback()
        })
    },
    delete(id, callback) {

        db.query(`
            DELETE FROM tutors
            WHERE id = $1`, [id], function(err, results) {
                if(err) throw `Database Error! ${err}`

                callback()
            })
    },
    paginate(params) {

        const { filter, limit, offset, callback } = params

        let query = '',
            filterQuery = '',
            totalQuery = `(
                SELECT count(*) FROM tutors
            ) AS total`

        if(filter) {
            filterQuery = `
                ${query}
                WHERE tutors.full_name ILIKE '%${filter}%'
                OR tutors.subjects ILIKE '%${filter}%'
            `

            totalQuery = `(
                SELECT count(*) FROM tutors
                ${filterQuery}
            ) AS total`
        }

        query = `
            SELECT tutors.*, ${totalQuery}, count(students) AS total_students
            FROM tutors
            LEFT JOIN students ON (tutors.id = students.tutor_id)
            ${filterQuery}
            GROUP BY tutors.id LIMIT $1 OFFSET $2
        `

        db.query(query, [limit, offset], function(err, results) {
            if(err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    }
}
