// Seleciona os elementos do HTML
const cepInput = document.getElementById("cepInput");
const searchBtn = document.getElementById("searchBtn");
const resultDiv = document.getElementById("result");

// Adiciona evento de clique no botão
searchBtn.addEventListener("click", () => {

  // Remove qualquer caractere que não seja número
  const cep = cepInput.value.replace(/\D/g, "");

  // Verifica se o CEP tem exatamente 8 dígitos
  if (cep.length !== 8) {
    resultDiv.innerHTML = "<p>❌ CEP inválido</p>";
    return;
  }

  // Faz a requisição à API ViaCEP
  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => response.json()) // Converte a resposta para JSON
    .then(data => {

      // Verifica se a API retornou erro
      if (data.erro) {
        resultDiv.innerHTML = "<p>❌ CEP não encontrado</p>";
        return;
      }

      // Exibe os dados retornados na tela
      resultDiv.innerHTML = `
        <p><strong>Logradouro:</strong> ${data.logradouro}</p>
        <p><strong>Bairro:</strong> ${data.bairro}</p>
        <p><strong>Cidade:</strong> ${data.localidade}</p>
        <p><strong>Estado:</strong> ${data.uf}</p>
      `;
    })
    .catch(() => {
      // Caso ocorra algum erro na requisição
      resultDiv.innerHTML = "<p>⚠️ Erro ao buscar CEP</p>";
    });
});
