const currentPage = window.location.pathname
const menuItems = window.document.querySelectorAll('header #menu a')

for (item of menuItems) {
    if (currentPage.includes(item.getAttribute('href'))) {
        item.classList.add('active')
    }
}