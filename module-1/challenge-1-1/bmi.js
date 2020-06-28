// Body mass index (BMI) calculator

const name = 'Carlos'
const weight = 84
const height = 1.88

const bmi = weight / (height * height)

let message = ''

if (bmi >= 30) {
    message = `${name}, you are overweight.`
} else {
    message = `${name}, you are not overweight.`
}

console.log(message)
