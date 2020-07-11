// access course-description page

const cards = document.querySelectorAll('.card')

for (let card of cards) {
    card.addEventListener('click', function(){
        const siteId = card.getAttribute('id')
        window.location.href = `/courses/${siteId}`
    })
}

// responsive menu

let show = true;

const header = document.querySelector('header')
const menuToggle = header.querySelector('.menu-toggle')

menuToggle.addEventListener('click', function() {

    document.body.style.overflow = show ? 'hidden' : 'initial'

    header.classList.toggle('on', show)
    show = !show
})