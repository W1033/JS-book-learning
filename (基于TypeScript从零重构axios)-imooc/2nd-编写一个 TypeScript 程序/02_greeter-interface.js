function greeter(person) {
    return 'Hello ' + person.firstName + ' ' + person.lastName;
}
var user = {
    firstName: 'Jane',
    lastName: 'Eyre'
};
console.log(greeter(user));
