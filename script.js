const fileSystem = require("fs");
const parseArg = (arg) => {
  return arg.slice(2);
};

const calculationInput = parseArg(process.argv);

function calculationForNode(numOne, operation, numTwo) {
  if (
    typeof Number(numOne) !== "number" ||
    typeof Number(numTwo) !== "number" ||
    typeof operation !== "string" ||
    !["+", "-", "*", "/"].includes(operation)
  ) {
    console.log("please input valid data");
    return;
    //process.exit(1) can fully stop whole process
  }
  numOne = Number(numOne);
  numTwo = Number(numTwo);
  if (operation === "+") {
    return numOne + numTwo;
  }
  if (operation === "-") {
    return numOne - numTwo;
  }
  if (operation === "*") {
    return numOne * numTwo;
  }
  if (operation === "/") {
    if (numTwo === 0) {
      console.log("dividend cannot be 0");
      return;
    }
    return numOne / numTwo;
  }
}

console.log(calculationInput);

let operatorArray = ["+", "-", "*", "/"];

function checkPrecedece() {
  for (let i = 0; i < calculationInput.length; i++) {
    if (operatorArray.includes(calculationInput[i])) {
      if (calculationInput[i] === "*" || calculationInput[i] === "/") {
        calculationInput[i - 1] = calculationForNode(
          calculationInput[i - 1],
          calculationInput[i],
          calculationInput[i + 1]
        );
        calculationInput.splice(i, 2);
        break;
      }
    }
  }
}
while (calculationInput.includes("*") || calculationInput.includes("/")) {
  checkPrecedece();
}
console.log(calculationInput);
let cal = 0;

for (let i = 0; i < calculationInput.length; i++) {
  if (operatorArray.includes(calculationInput[i])) {
    if (calculationInput[i - 2] === undefined) cal = calculationInput[i - 1];
    cal = calculationForNode(cal, calculationInput[i], calculationInput[i + 1]);
  }
}
console.log("calculation is", cal);
fileSystem.readFile("./cal.js", { encoding: "utf-8" }, (error, data) => {
  console.log("data from cal.js", data);
  let calculateData = data.split(" ");
  calculateData = calculateData.map((string) => {
    if (operatorArray.includes[string]) {
      return string;
    } else {
      return string.replace(/\D/g, "");
    }
  });
  console.log("calculateData", calculateData);
});

// fs.readFile("./calc.js", { encoding: "utf-8" }, (_, data) => {
//     const stringsArrays = data.split("\n").map(string => string.split(" "));

//     const parsedArrays = stringsArrays.map(stringArray =>
//       stringArray.map(singleString =>
//         operators.includes(singleString)
//           ? singleString
//           : singleString.replace(/\D/g, "")
//       )
//     );

//     console.log("strings from file", parsedArrays);

//     console.log(
//       "Joined Strings",
//       parsedArrays.map(array => array.join(" ")).join("\n")
//     );

//     // console.log("after replacing", parsedStrings);
//   });
