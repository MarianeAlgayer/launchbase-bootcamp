// Users and technologies

const users = [
    {name: 'Carlos', technologies: ['HTML', 'CSS']},
    {name: 'Jasmine', technologies: ['JavaScript', 'CSS']},
    {name: 'Tuane', technologies: ['HTML', 'Node.js']}
]

// Solution 01 - for statement
/* for (let pos = 0; pos < users.length; pos++) {

    let technologies = ''
    for (let k = 0; k < users[pos].technologies.length; k++) {
        if (k == 0) {
            technologies = users[pos].technologies[k]
        } else {
            technologies += ', ' + users[pos].technologies[k]
        }
    }

    console.log(`${users[pos].name} works with ${technologies}`)
} */

// Solution 02 - for/in statement
/* for (let pos in users) {
    console.log(`${users[pos].name} works with ${users[pos].technologies.join(', ')}`)
} */

// Solution 03 - for/of statement
for (let user of users) {
    console.log(`${user.name} works with ${user.technologies.join(', ')}`)
}

// Search for technology

function checkIfUseCSS(user) {
    for (let technology of user.technologies) {
        if (technology == 'CSS') {
            return true
        }
    }

    return false
}

for (let user of users) {
    const worksWithCSS = checkIfUseCSS(user)
    
    if (worksWithCSS) {
        console.log(`User ${user.name} works with CSS`)
    }
}
