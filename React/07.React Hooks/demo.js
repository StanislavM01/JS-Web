let a = { fName: 'stoqn', grades: [4, 5, 6] }
let b = JSON.parse(JSON.stringify(a))
a.grades.push(5) 
console.log(a.grades, b.grades)
//let c = a.splice(1,0,11)

//console.log(c,a)
console.log(a == b)