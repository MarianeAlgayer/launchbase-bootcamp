// Cálculo da aposentadoria

const nome = 'Carlos'
const sexo = 'M'
const idade = 60
const contribuicao = 35     // em anos

calculoContribuicao = idade + contribuicao

let mensagem = ''

// Resolução 01

/* if (sexo == 'F') {
    if ( contribuicao >= 30 && calculoContribuicao >= 85) {
        mensagem = `${nome}, você pode se aposentar!`
    } else {
        mensagem = `${nome}, você não pode se aposentar!`
    }
} else {
    if (contribuicao >= 35 && calculoContribuicao >= 95) {
        mensagem = `${nome}, você pode se aposentar!`
    } else {
        mensagem = `${nome}, você não pode se aposentar!`
    }
} */

// Resolução 02

const mulherPodeAposentar = sexo == 'F' && contribuicao >= 30 && calculoContribuicao >= 85
const homemPodeAposentar = sexo == 'M' && contribuicao >= 35 && calculoContribuicao >= 95

if (mulherPodeAposentar || homemPodeAposentar) {
    mensagem = `${nome}, você pode se aposentar!`
} else {
    mensagem = `${nome}, você não pode se aposentar!`
}

console.log(mensagem)
