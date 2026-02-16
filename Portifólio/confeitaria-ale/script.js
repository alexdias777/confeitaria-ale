

let currentSlide = 0; 
// Variável que guarda qual grupo de imagens está visível atualmente

const slidesContainer = document.querySelector('.slides'); 
// Selecionando o container que envolve todas as imagens do carrossel

const slides = document.querySelectorAll('.slides img'); 
// Selecionando as imagens dentro do carrossel


/* Detectando quantas imagens devem aparecer dependendo do tamanho da tela */
function getImagesPerSlide() {

    if (window.innerWidth <= 600) {
        return 1; // Se for celular, mostra 1 imagem por vez
    }

    if (window.innerWidth <= 1024) {
        return 2; // Se for tablet, mostra 2 imagens por vez
    }

    return 4; // Se for desktop ou TV, mostra 4 imagens por vez
}


/* Exibindo o grupo correto de imagens */
function showSlide(index) {

    const imagesPerSlide = getImagesPerSlide(); 
    // Descobre quantas imagens devem ser mostradas agora

    const totalSlides = slides.length; 
    // Conta quantas imagens existem no total

    const totalGroups = Math.ceil(totalSlides / imagesPerSlide); 
    // Calcula quantos "grupos" de imagens existem


    /* Controle de limite para criar efeito infinito */
    if (index >= totalGroups) {
        currentSlide = 0; 
        // Se passar do último grupo, volta para o primeiro
    } else if (index < 0) {
        currentSlide = totalGroups - 1; 
        // Se for menor que zero, vai para o último grupo
    } else {
        currentSlide = index; 
        // Caso esteja dentro do limite, apenas atualiza normalmente
    }


    const offset = -(currentSlide * 100); 
    // Calcula o deslocamento horizontal em porcentagem


    slidesContainer.style.transform = `translateX(${offset}%)`; 
    // Move visualmente o carrossel usando transform
}


/* Função chamada pelos botões de anterior e próximo */
function moveSlide(direction) {
    showSlide(currentSlide + direction); 
    // Soma ou subtrai 1 ao grupo atual e chama a função showSlide
}


/* Recalcula automaticamente se o usuário redimensionar a tela */
window.addEventListener("resize", () => {
    showSlide(currentSlide); 
    // Atualiza a exibição mantendo o slide atual correto
});


/* Inicializa o carrossel ao carregar a página */
showSlide(currentSlide);


/* Configura troca automática a cada 5 segundos */
setInterval(() => {
    moveSlide(1); 
    // Move automaticamente para o próximo grupo
}, 5000);




/*  CARRINHO  */


const cartItemsList = document.getElementById("cart-items"); 
// Selecionando a lista onde os itens serão exibidos

const totalItemsDisplay = document.getElementById("total-items"); 
// Selecionando o elemento que mostra a quantidade total

const totalValueDisplay = document.getElementById("total-value"); 
// Selecionando o elemento que mostra o valor total

const finalizeButton = document.getElementById("GoIfood"); 
// Selecionando o botão no HTML

let cart = []; 
// Armazenando os produtos adicionados


/* Visualizando o carrinho */
function updateCart() {

    cartItemsList.innerHTML = ""; 
    // Limpando

    let totalItems = 0; 
    // Somando

    let totalValue = 0; 
    // valor total


    cart.forEach((item, index) => {
        // Verificando os itens no carrinho

        totalItems += item.quantity; 
        // Soma quantidades

        totalValue += item.price * item.quantity; 
        // Soma valores


        const li = document.createElement("li"); 
        // Cria um novo elemento de lista

        li.textContent = `${item.name} - R$ ${item.price} x ${item.quantity} `; 
        // Define o texto do item exibido


        const removeButton = document.createElement("button"); 
        // Cria botão de remover

        removeButton.textContent = "Remover"; 
        // Define o texto do botão

        removeButton.addEventListener("click", () => {
            cart.splice(index, 1); 
            // Remove o item do array

            updateCart(); 
            // Atualiza novamente a exibição
        });

        li.appendChild(removeButton); 
        // Adiciona o botão ao item da lista

        cartItemsList.appendChild(li); 
        // Adiciona o item na lista do carrinho
    });


    totalItemsDisplay.textContent = totalItems; 
    // Atualiza total de itens

    totalValueDisplay.textContent = totalValue.toFixed(2); 
    // Atualiza valor total com duas casas decimais

    finalizeButton.style.display = totalItems > 0 ? "block" : "none"; 
    // Mostra botão apenas se tiver itens
}


/* Evento para todos botões "Adicionar ao Carrinho" */
document.querySelectorAll(".add-to-cart").forEach(button => {

    button.addEventListener("click", () => {

        const name = button.getAttribute("data-name"); 
        // Captura o nome do produto

        const price = parseFloat(button.getAttribute("data-price")); 
        // Captura o preço e converte para número


        const existingItem = cart.find(item => item.name === name); 
        // Verifica se o produto já está no carrinho

        if (existingItem) {
            existingItem.quantity++; 
            // Se já existir, aumenta a quantidade
        } else {
            cart.push({ name, price, quantity: 1 }); 
            // Se não existir, adiciona novo item
        }

        updateCart(); 
        // Atualiza exibição
    });
});



/* VOLTAR AO TOPO */


window.onscroll = function() {

    const backToTopButton = document.getElementById("back-to-top"); 
    // Seleciona o botão

    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopButton.style.display = "block"; 
        // Mostra botão se rolar a página
    } else {
        backToTopButton.style.display = "none"; 
        // Esconde botão se estiver no topo
    }
};


document.getElementById("back-to-top").onclick = function() {

    document.body.scrollTop = 0; 
    // Volta ao topo para Safari

    document.documentElement.scrollTop = 0; 
    // Volta ao topo para outros navegadores
};
