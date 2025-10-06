import { sumar, restar, multiplicar, dividir } from 'calculadora_pinedoo';

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("input");
  let expression = "";
  let shouldReset = false;

  const updateDisplay = () => {
    input.textContent = expression || "0";
  };

  const clear = () => {
    expression = "";
    shouldReset = false;
    updateDisplay();
  };

  const addNumber = (num) => {
    if (shouldReset) {
      expression = "";
      shouldReset = false;
    }
    expression += num;
    updateDisplay();
  };

  const addOperator = (op) => {
    if (!expression) return;

    const lastChar = expression.slice(-1);
    if ("+-×÷".includes(lastChar)) {
      expression = expression.slice(0, -1);
    }
    expression += op;
    shouldReset = false;
    updateDisplay();
  };

  const parseExpression = (expr) => {
    const match = expr.match(/(-?\d+(\.\d+)?)([+\-×÷])(-?\d+(\.\d+)?)/);
    if (!match) throw new Error("Expresión inválida");

    return {
      a: parseFloat(match[1]),
      op: match[3],
      b: parseFloat(match[4])
    };
  };

  const calculate = ({ a, op, b }) => {
    switch (op) {
      case "+": return sumar(a, b);
      case "-": return restar(a, b);
      case "×": return multiplicar(a, b);
      case "÷": return dividir(a, b);
      default: throw new Error("Operador inválido");
    }
  };

  const showResult = () => {
    try {
      const parsed = parseExpression(expression);
      const result = calculate(parsed);
      expression = result.toString();
      shouldReset = true;
    } catch {
      expression = "Error";
      shouldReset = true;
    }
    updateDisplay();
  };

  document.querySelectorAll(".numbers div").forEach(btn => {
    btn.addEventListener("click", () => {
      const val = btn.textContent;
      val === "C" ? clear() : addNumber(val);
    });
  });

  document.querySelectorAll(".operators div").forEach(btn => {
    btn.addEventListener("click", () => addOperator(btn.textContent));
  });

  document.getElementById("result").addEventListener("click", showResult);

  updateDisplay();
});
