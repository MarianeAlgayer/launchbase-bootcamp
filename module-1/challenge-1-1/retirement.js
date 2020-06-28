// Retirement calculation

const name = 'Carlos'
const gender = 'M'
const age = 60
const contribution = 35     // in years

contributionCalculation = age + contribution

let message = ''

// Solution 01

/* if (gender == 'F') {
    if ( contribution >= 30 && contributionCalculation >= 85) {
        message = `${name}, you can retire!`
    } else {
        message = `${name}, you cannot retire!`
    }
} else {
    if (contribution >= 35 && contributionCalculation >= 95) {
        message = `${name}, you can retire!`
    } else {
        message = `${name}, you cannot retire!`
    }
} */

// Solution 02

const womanCanRetire = gender == 'F' && contribution >= 30 && contributionCalculation >= 85
const manCanRetire = gender == 'M' && contribution >= 35 && contributionCalculation >= 95

if (womanCanRetire || manCanRetire) {
    message = `${name}, you can retire!`
} else {
    message = `${name}, you cannot retire!`
}

console.log(message)
