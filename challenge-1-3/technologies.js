// Users and technologies

const users = [
    { name: 'Carlos', technologies: ['HTML', 'CSS'] },
    { name: 'Jasmine', technologies: ['JavaScript', 'CSS'] },
    { name: 'Tuane', technologies: ['HTML', 'Node.js'] }
]

// Solution 01 - for statement
/* for ( let pos = 0; pos < users.length; pos++ ) {
    console.log(`${users[pos].name} works with ${users[pos].technologies}`)
} */

// Solution 02 - for/in statement
/* for ( let pos in users) {
    console.log(`${users[pos].name} works with ${users[pos].technologies}`)
} */

// Solution 03 - for/of statement
for (let user of users) {
    console.log(`${user.name} works with ${user.technologies.join(', ')}`)
}

// Search for technology

function checkIfUseCSS(user) {
    for (let technology of user.technologies){
        if (technology == 'CSS') return true
        }

    return false
    
}

for (let pos = 0; pos < users.length; pos++) {
    const worksWithCSS = checkIfUseCSS(users[pos])
    if (worksWithCSS) {
        console.log(`User ${users[pos].name} works with CSS.`)
    }
}
