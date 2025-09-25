console.log("start!")

myForm = document.getElementById("myForm")
myForm.addEventListener("submit", sumbitted);


let students = [];

function sumbitted(){
    event.preventDefault();
    console.log("Sumbitted")

    let subStudents = {
        fname: event.target.fname.value,
        lname: event.target.lname.value
    }
    students.push(subStudents);
    console.log(students)


    // make json 
    let obj = {firstName: event.target.fname.value, lastName: event.target.lname.value, age: event.target.age.value}


    let myJSON = JSON.stringify(obj)
    console.log(myJSON)
}    

