import { useState } from "react";
import { FaTimes, FaDivide, FaPlus, FaEquals, FaBackspace, FaMinus } from 'react-icons/fa';
import { evaluate } from 'mathjs';
import "./App.css";

const Output = (output) => {
  return <div className="outputData" id={output.id}>{output.data}</div>;
};

let isEvaluated = false;

function App() {
  const operators = ["/", "*", "+", "-"];
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
  
  const [mainValue, setMainValue] = useState("0");
  const [backValue, setBackValue] = useState("0");

  const clicked = (buttonClicked) => {
    const value = buttonClicked.target.getAttribute("data-value");

    let currentValue = mainValue;
    let finalValue = backValue;

    if (value === "clear"){
      currentValue = "0";
      finalValue = "0";  
    }

    if (isEvaluated){ 
      finalValue = "0";
      if (currentValue === "Infinity" || numbers.includes(value) || value === "."){
        currentValue = "0"
      }
      isEvaluated = false;
    }

    if(value === "equal"){
      try{
        let result = 0;
        
        if (!(finalValue === "0")){
          finalValue = `${finalValue}${currentValue} = `;
          currentValue = "0";
          
          result = evaluate(finalValue.replace("=", ""));
          
          currentValue = result.toString();
          isEvaluated = true;
        }
      }
      catch(error){
        console.log(error);
        alert("Couldn't Calculate!");
        finalValue = "0";
        currentValue = "0";
      }
    }

    else if(value === "." && !(currentValue.includes("."))){
      currentValue = currentValue + value;
    }
    
    else if(value === "backspace" && !(currentValue === "0")){
        currentValue = currentValue.slice(0,-1)
    }
    
    else if(operators.includes(value)){
      if(finalValue === "0"){
        finalValue = `${currentValue} ${value} `;
      }else{
        finalValue = `${finalValue}${currentValue} ${value} `;
      }
      currentValue = "0";
    }

    else if(numbers.includes(value)){
      
      if(currentValue === "0"){
        currentValue = value;
      }

      else{
        currentValue = currentValue + value;
      }
    }  

    if (currentValue === ""){
      currentValue = "0";
    }
    setMainValue(currentValue);
    setBackValue(finalValue);
    };

  return (
    <div className="calculator">
      <div className="display">
        <Output id="backValue" data={backValue} />
        <Output id= "mainValue" data={mainValue}/>
      </div>
      <div className="keypad">
          <button id = "clear" onClick = {b => clicked(b)} data-value = "clear">C</button>
          <button id = "backspace" onClick = {b => clicked(b)} data-value = "backspace"><FaBackspace /></button>
          <button className = "operators" id = "divide" onClick = {b => clicked(b)} data-value = "/"><FaDivide /></button>

          <button className = "numbers" id = "7" onClick = {b => clicked(b)} data-value = "7">7</button>
          <button className = "numbers" id = "8" onClick = {b => clicked(b)} data-value = "8">8</button>
          <button className = "numbers" id = "9" onClick = {b => clicked(b)} data-value = "9">9</button>
          <button className = "operators" id = "multiply" onClick = {b => clicked(b)} data-value = "*"><FaTimes /></button>

          <button className = "numbers" id = "4" onClick = {b => clicked(b)} data-value = "4">4</button>
          <button className = "numbers" id = "5" onClick = {b => clicked(b)} data-value = "5">5</button>
          <button className = "numbers" id = "6" onClick = {b => clicked(b)} data-value = "6">6</button>
          <button className = "operators" id = "subtract" onClick = {b => clicked(b)} data-value = "-"><FaMinus /></button>
          
          <button className = "numbers" id = "1" onClick = {b => clicked(b)} data-value = "1">1</button>
          <button className = "numbers" id = "2" onClick = {b => clicked(b)} data-value = "2">2</button>
          <button className = "numbers" id = "3" onClick = {b => clicked(b)} data-value = "3">3</button>
          <button className = "operators" id = "add" onClick = {b => clicked(b)} data-value = "+"><FaPlus /></button>

          <button className = "numbers" id = "zero" onClick = {b => clicked(b)} data-value = "0">0</button>
          <button id = "decimal" onClick = {b => clicked(b)} data-value = ".">.</button>
          <button className = "operators" id = "equal-sign" onClick = {b => clicked(b)} data-value = "equal"><FaEquals /></button>
      </div>
    </div>
  );
}

export default App;