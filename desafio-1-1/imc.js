// Cálculo de IMC

const nome = 'Carlos'
const peso = 84
const altura = 1.88

const imc = peso / (altura * altura)

let mensagem = ''

if (imc >= 30) {
    mensagem = `${nome}, você está acima do peso.`
} else {
    mensagem = `${nome}, você não está acima do peso.`
}

console.log(mensagem)
