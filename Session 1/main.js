let a = 10;

console.log(a);

function THISFUNC(x) {
    return "this function:" + (100 + x);
}

console.log(THISFUNC(10))

function addNumbs(Num1, Num2, Num3) {
    return Num1 + Num2 + Num3;
}

console.log(addNumbs(1, 2, 3))

let ARROWFunc = (m1, m2, m3) => m1 + m2 + m3;
console.log(ARROWFunc(3, 2, 1));


for (let i = 10; i > 0; i--) {
    console.log(i)
}


let P = [100, 200, 300, 400, 500];

for (let i = 0; i < 5; i++) {
    console.log(P[i])
}

let D = [20, 4, 21, 4];
D.forEach(num => {
    console.log(num)
})
console.log("\n\n\n")


function addThenMean(x) {
    let NumberOfItems = 0;
    let sum = 0;
    x.forEach(num => {
        sum += num;
        NumberOfItems++;
    })

    console.log(sum)
    console.log(NumberOfItems)
    return sum/NumberOfItems;
}

console.log(addThenMean([20, 4, 21, 4]))


let e = document.getElementById("Head") 
e.innerText = "byeee";
