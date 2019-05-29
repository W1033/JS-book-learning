// 我们使用 接口(interface) 来描述一个拥有 firstName 和 lastName 字段的对象。(tips:
// 此处就是指 user 对象。) 在 TypeScript 里，只要两个类型内部的结构兼容那么这两个类型就是
// 兼容的。这就允许我们在实现接口时候只要保证包含了接口要求的结构就可以，而不必明确地使用
// implements 语句。
interface Person {
    firstName: string
    lastName: string
}

function greeter(person: Person) {
    return 'Hello '+ person.firstName + ' ' + person.lastName;
}

let user = {
    firstName: 'Jane',
    lastName: 'Eyre'
};

console.log(greeter(user));



