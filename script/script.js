const currencyInput = document.getElementById("currency-input-amount");
const yearsInput = document.getElementById("years-input");
const interestInput = document.getElementById("interest-input");

const currencySymbol = document.getElementById("currency-symbol");
const yearsSymbol = document.getElementById("years-symbol");
const percentSymbol = document.getElementById("percent-symbol");

const currencyBorder = document.getElementById("input-container-currency");
const yearsBorder = document.getElementById("input-container-years");
const percentBorder = document.getElementById("input-container-percent");

const radioButtons = [
  {
    button: document.getElementById("repayment"),
    label: document.querySelector('label[for="repayment"]'),
  },
  {
    button: document.getElementById("interest"),
    label: document.querySelector('label[for="interest"]'),
  },
];

function checkInputLength() {
  const inputValue = currencyInput.value;
  const inputLength = inputValue.length;

  if (inputLength > 0) {
    currencySymbol.classList.add("active-symbol");
    currencyBorder.classList.add("active-currency-border");
  } else {
    currencySymbol.classList.remove("active-symbol");
    currencyBorder.classList.remove("active-currency-border");
  }
  console.log(`The length of the input value is: ${inputLength}`);
}
currencyInput.addEventListener("input", checkInputLength);

radioButtons.forEach(({ button, label }) => {
  button.addEventListener("change", isRadioChecked);
});

function isRadioChecked() {
  radioButtons.forEach(({ button, label }) => {
    if (button.checked) {
      label.classList.add("active-label");
    } else {
      label.classList.remove("active-label");
    }
  });
}

/* /////////////////
  Error State
//////////////////*/

const errorMsgCurrency = document.getElementById("errorMsgCurrency");
const errorMsgYears = document.getElementById("errorMsgYears");
const errorMsgInterest = document.getElementById("errorMsgInterest");

const radioButtonsIsChecked = document.querySelectorAll(
  'input[name="query_type"]'
);

const inputElements = [
  {
    input: currencyInput,
    symbol: currencySymbol,
    border: currencyBorder,
    error: errorMsgCurrency,
  },
  {
    input: yearsInput,
    symbol: yearsSymbol,
    border: yearsBorder,
    error: errorMsgYears,
  },
  {
    input: interestInput,
    symbol: percentSymbol,
    border: percentBorder,
    error: errorMsgInterest,
  },
];

function isError() {
  inputElements.forEach(({ input, symbol, border, error }) => {
    if (!input.value.trim()) {
      symbol.classList.add("error-symbol");
      border.classList.add("error-currency-border");
      error.textContent = "This field is required.";
    } else {
      symbol.classList.remove("error-symbol");
      border.classList.remove("error-currency-border");
      error.textContent = "";
    }
  });

  let radioChecked = false;
  radioButtonsIsChecked.forEach((radio) => {
    if (radio.checked) {
      radioChecked = true;
    }
  });

  const labelTest = document.querySelector('label[for="repayment"]');

  if (!radioChecked) {
    errorMsgRadio.textContent = "Please select a mortgage type.";
  } else {
    errorMsgRadio.textContent = "";
    labelTest.classList.remove("active-label ");
  }
}

/* /////////////////
  Changing view for before and after calculations
//////////////////*/

// document.addEventListener("DOMContentLoaded", () => {
//   inputElements.forEach(({ input }) => {
//     input.addEventListener("input", isError);
//   });

//   radioButtonsIsChecked.forEach((radio) => {
//     radio.addEventListener("change", isError);
//   });

//   const clearFieldsBtn = document.getElementById("clear-all-fields");
//   clearFieldsBtn.addEventListener("click", clearFields);

//   function clearFields() {
//     // Clear input fields text content
//     inputElements.forEach(({ input, symbol, border, error }) => {
//       input.value = "";
//       error.textContent = "";

//       symbol.classList.remove("active-symbol");
//       border.classList.remove("active-currency-border");
//       symbol.classList.remove("error-symbol");

//       border.classList.add("input-container");
//       symbol.classList.add("currency-symbol");

//       afterCalculations.classList.add("hidden");
//       afterCalculations.classList.remove("visible-calculations");
//       beforeCalculations.classList.add("visible-calculations");
//     });

//     // Clear radio buttons
//     radioButtons.forEach((radio) => {
//       radio.checked = false;
//       radio.classList.remove("active-label");
//     });
//     errorMsgRadio.textContent = "";
//   }

//   const calculateButton = document.querySelector(".calculate-button");
//   const beforeCalculations = document.querySelector(
//     ".results-before-calculations"
//   );
//   const afterCalculations = document.querySelector(
//     ".results-after-calculations"
//   );

//   const radioButtons = document.querySelectorAll('input[name="query_type"]');

//   const monthlyRep = document.getElementById("monthly-repayment");
//   const totalRep = document.getElementById("total-repayment");

//   calculateButton.addEventListener("click", () => {
//     if (
//       currencyInput.value === "" ||
//       yearsInput.value === "" ||
//       interestInput.value === ""
//     ) {
//       return;
//     }

//     let radioChecked = false;
//     radioButtons.forEach((radio) => {
//       if (radio.checked) {
//         radioChecked = true;
//       }
//     });

//     if (!radioChecked) {
//       return;
//     }

//     const amount = parseFloat(currencyInput.value);
//     const term = parseInt(yearsInput.value);
//     const interestRate = parseFloat(interestInput.value);

//     if (isNaN(amount) || isNaN(term) || isNaN(interestRate)) {
//       return;
//     }

//     const monthlyInterestRate = interestRate / 100 / 12;
//     const numberOfPayments = term * 12;
//     const monthlyRepayment =
//       (amount * monthlyInterestRate) /
//       (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
//     const totalRepayment = monthlyRepayment * numberOfPayments;

//     monthlyRep.innerHTML = `
//       £${monthlyRepayment.toFixed(2)}
//     `;

//     totalRep.innerHTML = `
//       £${totalRepayment.toFixed(2)}
//     `;

//     beforeCalculations.classList.add("hidden");
//     beforeCalculations.classList.remove("visible-calculations");

//     afterCalculations.classList.remove("hidden");
//     afterCalculations.classList.add("visible-calculations");
//   });
// });
document.addEventListener("DOMContentLoaded", () => {
  inputElements.forEach(({ input }) => {
    input.addEventListener("input", isError);
  });

  radioButtonsIsChecked.forEach((radio) => {
    radio.addEventListener("change", isError);
  });

  const clearFieldsBtn = document.getElementById("clear-all-fields");
  clearFieldsBtn.addEventListener("click", clearFields);

  function clearFields() {
    // Clear input fields text content
    inputElements.forEach(({ input, symbol, border, error }) => {
      input.value = "";
      error.textContent = "";

      symbol.classList.remove("active-symbol", "error-symbol");
      border.classList.remove(
        "active-currency-border",
        "error-currency-border"
      );

      border.classList.add("input-container");
      symbol.classList.add("currency-symbol");

      afterCalculations.classList.add("hidden");
      afterCalculations.classList.remove("visible-calculations");
      beforeCalculations.classList.add("visible-calculations");
    });

    // Clear radio buttons
    radioButtons.forEach(({ button, label }) => {
      button.checked = false;
      label.classList.remove("active-label", "error-label");
    });

    // Clear radio button error message
    const errorMsgRadio = document.getElementById("errorMsgRadio");
    errorMsgRadio.textContent = "";
  }

  const calculateButton = document.querySelector(".calculate-button");
  const beforeCalculations = document.querySelector(
    ".results-before-calculations"
  );
  const afterCalculations = document.querySelector(
    ".results-after-calculations"
  );

  const radioButtons = document.querySelectorAll('input[name="query_type"]');

  const monthlyRep = document.getElementById("monthly-repayment");
  const totalRep = document.getElementById("total-repayment");

  calculateButton.addEventListener("click", () => {
    if (
      currencyInput.value === "" ||
      yearsInput.value === "" ||
      interestInput.value === ""
    ) {
      return;
    }

    let radioChecked = false;
    radioButtons.forEach((radio) => {
      if (radio.checked) {
        radioChecked = true;
      }
    });

    if (!radioChecked) {
      return;
    }

    const amount = parseFloat(currencyInput.value);
    const term = parseInt(yearsInput.value);
    const interestRate = parseFloat(interestInput.value);

    if (isNaN(amount) || isNaN(term) || isNaN(interestRate)) {
      return;
    }

    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = term * 12;
    const monthlyRepayment =
      (amount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
    const totalRepayment = monthlyRepayment * numberOfPayments;

    monthlyRep.innerHTML = `£${monthlyRepayment.toFixed(2)}`;
    totalRep.innerHTML = `£${totalRepayment.toFixed(2)}`;

    beforeCalculations.classList.add("hidden");
    beforeCalculations.classList.remove("visible-calculations");

    afterCalculations.classList.remove("hidden");
    afterCalculations.classList.add("visible-calculations");
  });
});
