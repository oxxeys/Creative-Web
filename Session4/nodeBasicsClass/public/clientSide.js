console.log("!")
myForm = document.getElementById("myForm")
myForm.addEventListener("submit", sumbitted);


let students = [];

function sumbitted(event){
    console.log("!")
    event.preventDefault();
    console.log("Sumbitted")

    let subStudents = {
        fname: event.target.fname.value,
        pass: event.target.pass.value
    }
    students.push(subStudents);
    console.log(students)


    // make json 
    let obj = {firstName: event.target.fname.value, pass: event.target.pass.value}


    let myJSON = JSON.stringify(obj)
    console.log(myJSON)
}    

