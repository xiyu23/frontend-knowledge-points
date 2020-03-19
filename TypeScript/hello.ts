interface Person {
  firstName: string;
  lastName: string;
}

class Student {
  fullName: string;
  constructor(public firstName: string, public middleinitial: string, public lastName: string) {
    this.fullName = firstName + " " + middleinitial + " " + lastName;
  }
}

function greeter(person: Person) {
  return "Hi, " + person.firstName + " " + person.lastName;
}


let user = {
  firstName: "Yu",
  lastName: "Hui",
  another: "Xi"
};

let user2 = new Student("Yun", "Dr.", "Hui");

console.log(greeter(user2));
