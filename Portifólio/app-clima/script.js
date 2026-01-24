// Seleciona os elementos do HTML
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const resultDiv = document.getElementById("result");

// Evento de clique no botão
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();

  // Validação simples
  if (city === "") {
    resultDiv.innerHTML = "<p>❌ Digite uma cidade</p>";
    return;
  }

  // Primeiro: buscar latitude e longitude da cidade
  fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=pt`)
    .then(response => response.json())
    .then(data => {
      if (!data.results) {
        resultDiv.innerHTML = "<p>❌ Cidade não encontrada</p>";
        return;
      }

      const { latitude, longitude, name } = data.results[0];

      // Segundo: buscar clima usando latitude e longitude
      return fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      ).then(response => response.json())
       .then(weatherData => {
        const temperature = weatherData.current_weather.temperature;
        const wind = weatherData.current_weather.windspeed;

        // Exibe o resultado
        resultDiv.innerHTML = `
          <p><strong>Cidade:</strong> ${name}</p>
          <p><strong>Temperatura:</strong> ${temperature} °C</p>
          <p><strong>Vento:</strong> ${wind} km/h</p>
        `;
      });
    })
    .catch(() => {
      resultDiv.innerHTML = "<p>⚠️ Erro ao buscar clima</p>";
    });
});
