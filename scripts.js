const apiKey = "9193c7cc2bbdffbaa5a4975ce75b40bc";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const umidityElement = document.querySelector("#umidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

const errorMessageContainer = document.querySelector("#error-message");
const loader = document.querySelector("#loader");

const suggestionContainer = document.querySelector("#suggestions");
const suggestionButtons = document.querySelectorAll("#suggestions button");



// Atualize o evento do botão de pesquisa para chamar createBackButton
searchBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const city = cityInput.value;
  showWeatherData(city);
  createBackButton(); // Chama a função para criar o botão de voltar
});

// ... (seu código existente)


// Loader
const toggleLoader = () => {
  loader.classList.toggle("hide");
};

const getWeatherData = async (city) => {
  toggleLoader();

  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

  const res = await fetch(apiWeatherURL);
  const data = await res.json();


  toggleLoader();

  return data;
};

// Tratamento de erro
const showErrorMessage = () => {
  errorMessageContainer.classList.remove("hide");
};

const hideInformation = () => {
  errorMessageContainer.classList.add("hide");
  weatherContainer.classList.add("hide");
  

  suggestionContainer.classList.add("hide");
};

const showWeatherData = async (city) => {
  hideInformation();

  const data = await getWeatherData(city);

  if (data.cod === "404") {
    showErrorMessage();
    return;
  }

  // Dentro da função showWeatherData, após atualizar as informações de temperatura:
  if (parseInt(data.main.temp) >= 20 && parseInt(data.main.temp) <= 30) {
    // Verifica se a temperatura é maior ou igual a 20 graus
    document.getElementById("sol").innerHTML =
      "<img src='icons8-smiling-sun-48.png'>";
    document.getElementById("message").style.color = "green";
    const messageElement = document.querySelector("#message");
    messageElement.innerText = "SOLO ADEQUADO PARA SEMEADURA!";
  } else {
     
    // Caso a temperatura seja inferior a 20 graus, remova a mensagem (caso ela exista)

    document.getElementById("sol").innerHTML =
      "<img src='icons8-sad-sun-48.png'>";
    const messageElement = document.querySelector("#message");
    alert("SOLO NÃO ADEQUADO PARA SEMEADURA");
    document.getElementById("message").style.color = "red";
    messageElement.innerText = "SOLO NÃO ADEQUEADO";
  }


  cityElement.innerText = data.name;
  tempElement.innerText = parseInt(data.main.temp);
  descElement.innerText = data.weather[0].description;
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  );

  umidityElement.innerText = `${data.main.humidity}%`;
  windElement.innerText = `${data.wind.speed}km/h`;

  // Change bg image
  document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;

  weatherContainer.classList.remove("hide");
};

searchBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const city = cityInput.value;
  
 

  showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    const city = e.target.value;

    showWeatherData(city);

  }
});

// Sugestões
suggestionButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const city = btn.getAttribute("id");

    showWeatherData(city);
  });
});
