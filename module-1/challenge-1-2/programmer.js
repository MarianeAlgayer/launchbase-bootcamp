const programmer = {
    name: 'Carlos',
    age: 32,
    technologies: [
        { name: 'C++', speciality: 'Desktop' },
        { name: 'Python', speciality: 'Data Science' },
        { name: 'JavaScript', speciality: 'Web/Mobile' }
    ]
}

console.log(`User ${programmer.name} is ${programmer.age} years old and codes in ${programmer.technologies[0].name} with specialization on ${programmer.technologies[0].speciality}.`)
