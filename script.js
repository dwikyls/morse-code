const input = document.getElementById("codeInput");
const result = document.getElementById("codeResult");
const history = document.getElementById("history");
const translateButton = document.getElementById("translateButton");
const resetButton = document.getElementById("resetButton");

async function getMorseCode() {
  try {
    return await fetch("morse.json", {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
       })
      .then(data => data.json());
  } catch (e) {
    console.log(e);
  }
}

input.addEventListener("keyup", function (event) {
  if (event.keyCode === 32) {
    event.preventDefault();

    document.getElementById("translateButton").click();
  }

  if (event.keyCode === 188) {
    event.preventDefault();

    document.getElementById("translateButton").click();
  }

});

async function translate() {
  const morseCode = await getMorseCode();

  translateButton.addEventListener("click", async function (event) {
    let code = input.value.replace(",", "").replace(' ', "");

    Object.keys(morseCode).forEach(function (key) {
      if (morseCode[key] == `${code}`) {
        history.innerHTML += `${code} `;
        result.innerHTML += `${key}`;
      }
    });

    input.value = "";
  });

  resetButton.addEventListener("click", () => {
    history.innerHTML = "";
    result.innerHTML = "";
  })
}

translate();
