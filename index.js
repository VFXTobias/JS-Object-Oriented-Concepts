
//*********Constructor Concept**********

// Person constructor.  Here we'll create a function that builds a model for an object called Person that we can then call on later.

function Person(firstName, lastName, dob, job){
    this.firstName = firstName;
    this.lastName = lastName;
    this.dob = new Date(dob); // Utilizes an existing JS global constructor called 'Date' to parse the dob string passed into this constructor.
    this.job = job;
    
}

//Now we can create a new person using our constructor by calling it as an assignment to a new variable.  

const henry = new Person('Henry', 'Miller', '08-04-1995', 'Web Developer');

console.log(henry);


//**********Prototypes**********

//Object literals are inheriting from a prototype called Object.prototype. This exists in the JS global scope. When you create a new object you're actually invoking a prototype method that lives within the global of 'Object'. You can literally investigate this by expanding the properties of your new object in the console and traversing down through '__proto__'. The deeper you go, the deeper you can see the history or origin of your object.  Like a heredity tree. I was born from thus which was born from this which was born from that. :)

//When dealing with objects created via a constructor like our 'Person' above then we are inheriting from the Person.prototype or our constructed object's prototype. We're one generation removed in a sense.

//Think of prototypes like an object's inhereted abilities.  You use them to create methods (aka functions) that do specific things within the context of the object itself.  In our constructor for 'Person' we might decide we want to create some useful methods that do things for us.  So we'd create some nexted 'prototypes' to do the job. Let's try it on a new constructor called 'Pet'.


function Pet(firstName, lastName, dob, breed) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.dob = new Date(dob); // Utilizes an existing JS global constructor called 'Date' to parse the dob string passed into this constructor.
    this.breed = breed;

}

Pet.prototype.calcAge = function () {
    const date = new Date(); //This just grabs the date and time right now.
    const currYear = date.getFullYear(); //This parses down the previous date to just the year.
    const birthYear = this.dob.getFullYear(); // This will grab the date of birth (dob) specified just outside of this function but inside the parent function (Person) and parse its full date string down to just the full year.  "this" is the operator that tells this function to look up into our parent scope (Person).

    return currYear - birthYear;
}

//First let's create a pet shall we?

const myDog = new Pet('Alfie', 'Smith', '03-15-2018', 'dog');

console.log(myDog);

//Now let's invoke our prototype method 'calcAge' for myDog.

console.log(myDog.calcAge());

//Ok, let's do another one.  We'll create a return of the full name of our pet.

Pet.prototype.getFullName = function(){
    return `${this.firstName} ${this.lastName}`;
}

console.log(myDog.getFullName());



