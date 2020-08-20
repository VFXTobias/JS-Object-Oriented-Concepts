
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

//Think of prototypes like an object's inhereted abilities.  You use them to create methods (aka functions) that do specific things within the context of the object itself.  In our constructor for 'Person' we might decide we want to create some useful methods that do things for us.  So we'd create some nested 'prototypes' to do the job. Let's try it on a our 'Person' constructor.

Person.prototype.calcAge = function () {
    const date = new Date(); //This just grabs the date and time right now.
    const currYear = date.getFullYear(); //This parses down the previous date to just the year.
    const birthYear = this.dob.getFullYear(); // This will grab the date of birth (dob) specified just outside of this function but inside the parent function (Person) and parse its full date string down to just the full year.  "this" is the operator that tells this function to look up into our parent scope (Person).

    return currYear - birthYear;
}

//Now let's invoke our prototype method 'calcAge' for Henry.

console.log(henry.calcAge());

//Ok, let's do another one.  We'll create a return of the full name of our person.

Person.prototype.getFullName = function(){
    return `${this.firstName} ${this.lastName}`; //Notice that 'this' works here because we're traversing down into our heredity or our parent.  In this case, it's 'Person'. 'Person' contains keys named 'firstName' and 'lastName'.  
}

console.log(henry.getFullName());


//**********Prototypal Inheritance**********

//This is a concept where one object's prototype methods are inherited from another object.

//Let's try this by creating a new 'Customer' constructor that utilizes a 'call' to our Person constructor above in order to make use of existing properties from Person.

function Customer(firstName, lastName, dob, job, phone, membership){
    
    Person.call(this, firstName, lastName, dob, job); //The call() allows for a function/method belonging to one object to be assigned and called for a different object. call() provides a new value of this to the function/method. With call(), you can write a method once and then inherit it in another object, without having to rewrite the method for the new object.  The result in our case is that firstName and lastName are inherited from 'Person' into 'Customer'.
    this.phone = phone;
    this.membership = membership;
}

//Inherit the Person prototype methods.

Customer.prototype = Object.create(Person.prototype); // This allows us to explicitly inherit prototypes that we created for 'Person' and utilize them within 'Customer'

//Make Customer.prototype return Customer().

Customer.prototype.constructor = Customer; // This allows us to return a 'Customer' constructor within our prototypes when we use 'Customer' rather than just referencing only 'Person' which is our inherited constructor. See __proto__, it's tricky to understand but think of it like creating a smaller sandbox within our current sandbox so that we can do unique prototypes or override our parent's prototypes.

//Let's try to clear this up with an example. First, we'll create a 'Greeting' prototype for 'Person'. Then we'll create a unique 'Greeting' protoype for 'Customer' that can supercede the 'Person' greeting when we need it.

Person.prototype.greeting = function(){
    return `Hello ${this.firstName} ${this.lastName}!`;
}

Customer.prototype.greeting = function(){
    return `Hello ${this.firstName} ${this.lastName}.  Welcome to your ${this.membership} membership!`
}


//Let's test this all out by creating a new Customer.

const scott = new Customer('Scott', 'Vanderburg', '01-15-2001', 'Gamer', '555-555-5555', 'Premium');

console.log(scott);

console.log(scott.greeting()); //The important thing to understand here is that we are differentiating this person as a 'Customer' with our greeting as opposed to a 'Person' that is not yet a customer.

//Remember Henry?  Let's greet him.  See the difference?

console.log(henry.greeting()); //Henry is a 'Person' object. So his greeting is using the original parent level 'Greeting' prototype.  When we greeted Scott, while we are using inherited prototypes from 'Person' we are able to override our call to 'greeting' with a unique version that lives inside of 'Customer'.  

//Here's another test. We need to calculate the age of our customer Scott but the prototype for calculating the age lives inside the Person constructor. Can we inherit it?  Let's try.

console.log(scott.calcAge());

