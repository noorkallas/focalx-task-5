class Calculator {
  constructor() {
    this.display = document.getElementById("calc-display");
    this.clear();
    this.bindEvents();
  }

  bindEvents() {
    const buttons = document.querySelectorAll(".glass-btn");
    buttons.forEach((button) => button.addEventListener("click", (e) => this.buttonClick(e)));
    document.getElementById("clear").addEventListener("click", () => this.clear());
    document.getElementById("equals").addEventListener("click", () => this.calculate());
    document.addEventListener("keydown", (e) => this.handleKeyboardInput(e)); // Add keyboard support
  }

  buttonClick(event) {
    const value = event.target.getAttribute("data-value");
    if (value) {
      this.appendToDisplay(value);
    }
  }

  appendToDisplay(value) {
    if (this.display.value === "0" && value !== ".") {
      this.display.value = value;
    } else {
      this.display.value += value;
    }
  }

  clear() {
    this.display.value = "0";
  }

  calculate() {
    try {
      const result = eval(this.display.value.replace("×", "*").replace("÷", "/"));
      this.display.value = result;
    } catch (e) {
      this.display.value = "Error";
    }
  }

  handleKeyboardInput(event) {
    const key = event.key;

    if (!isNaN(key) || key === ".") {
      this.appendToDisplay(key);
    }

    // Operators
    if (key === "+" || key === "-" || key === "*" || key === "/") {
      this.appendToDisplay(key);
    }

    switch (key) {
      case "Enter":
        this.calculate();
        break;
      case "Escape":
        this.clear();
        break;
      case "Backspace":
        this.backspace();
        break;
    }
  }

  backspace() {
    if (this.display.value.length > 1) {
      this.display.value = this.display.value.slice(0, -1);
    } else {
      this.clear();
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Calculator();
});
