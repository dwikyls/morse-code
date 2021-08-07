const input = document.getElementById("codeInput");
const result = document.getElementById("codeResult");
const history = document.getElementById("history");
const translateButton = document.getElementById("translateButton");
const resetButton = document.getElementById("resetButton");

async function getMorseCode() {
  try {
    const response = await fetch("morse.json");
    return await response.json();
  } catch (e) {
    console.log(e);
  }
}

async function realTimeTranslate() {
  const morseCode = await getMorseCode();
  let morsePattern = /^[.-]{1,5}(?:[ \t]+[.-]{1,5})*(?:[ \t]+[.-]{1,5}(?:[ \t]+[.-]{1,5})*)*$/;


  input.addEventListener('input', (e) => {
    if (input.value == "") return result.innerHTML = "";

    setTimeout(() => {
      let codeToArray = input.value.split(" ");

      codeToArray.forEach((codeString) => {
        if (codeString.match(morsePattern) != null) {
          Object.keys(morseCode).forEach(function (key) {
            if (morseCode[key] == codeString) {
              result.innerHTML += `${key}`;
            }
          });
        }
      });
    }, 1000);
  }, false);
}

async function translate() {
  const morseCode = await getMorseCode();

  translateButton.addEventListener("click", async function (event) {
    // .--/.-/.-./-./---/-./--.
    // let code = input.value;
    let codeToArray = input.value.split("//");

    // console.log(codeToArray.length, codeToArray);

    codeToArray.forEach((codeString) => {
      codeString.split("/").forEach((code) => {
        Object.keys(morseCode).forEach(function (key) {
          if (morseCode[key] == code) {
            result.innerHTML += `${key}`;
          }
        });
      });
      result.innerHTML += ` `;
    });
    history.innerHTML += `${input.value}`;

    input.value = "";
  });
}

resetButton.addEventListener("click", () => {
  history.innerHTML = "";
  result.innerHTML = "";
})

translate();
// realTimeTranslate();
