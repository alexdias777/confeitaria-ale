
document.addEventListener("DOMContentLoaded", function() {
    let currentSlide = 0; 
    

    const slidesContainer = document.querySelector('.slides'); 
    

    const slides = document.querySelectorAll('.slides img'); 
   

    /* Detectando quantas imagens devem aparecer dependendo do tamanho da tela */
    function getImagesPerSlide() {
        if (window.innerWidth <= 600) {
            return 1; 
        }
        if (window.innerWidth <= 1024) {
            return 2; 
        }
        return 4; 
    }

    /* Exibindo o grupo correto de imagens */
    function showSlide(index) {
        const imagesPerSlide = getImagesPerSlide(); 
        

        const totalSlides = slides.length; 
        

        const totalGroups = Math.ceil(totalSlides / imagesPerSlide); 
       
        if (index >= totalGroups) {
            currentSlide = 0; 
            
        } else if (index < 0) {
            currentSlide = totalGroups - 1; 
            
        } else {
            currentSlide = index; 
            
        }

        const offset = -(currentSlide * 100); 
        

        slidesContainer.style.transform = `translateX(${offset}%)`; 
        
    }

  
    function moveSlide(direction) {
        showSlide(currentSlide + direction); 
        
    }

    /* Recalculando automaticamente se o usuário redimensionar a tela */
    window.addEventListener("resize", () => {
        showSlide(currentSlide); 
        // Atualizando a exibição mantendo o slide atual correto
    });

    /* Inicializa o carrossel ao carregar a página */
    showSlide(currentSlide);

   
    setInterval(() => {
        moveSlide(1); 
        
    }, 5000);

    /* CARRINHO */
    const cartItemsList = document.getElementById("cart-items"); 
   

    const totalItemsDisplay = document.getElementById("total-items"); 
   

    const totalValueDisplay = document.getElementById("total-value"); 
    

    const finalizeButton = document.getElementById("GoIfood"); 
   

    let cart = []; 
    
    function updateCart() {
        cartItemsList.innerHTML = ""; 
        

        let totalItems = 0; 
        

        let totalValue = 0; 
        

        cart.forEach((item, index) => {
           

            totalItems += item.quantity; 
            

            totalValue += item.price * item.quantity; 
            

            const li = document.createElement("li"); 
            

            li.textContent = `${item.name} - R$ ${item.price} x ${item.quantity} `; 
            

            const removeButton = document.createElement("button"); 
            

            removeButton.textContent = "Remover"; 
            

            removeButton.addEventListener("click", () => {
                cart.splice(index, 1); 
                // Removendo o item do array

                updateCart(); 
                
            });

            li.appendChild(removeButton); 
            

            cartItemsList.appendChild(li); 
            
        });

        totalItemsDisplay.textContent = totalItems; 
        

        totalValueDisplay.textContent = totalValue.toFixed(2); 
        // Atualiza valor total com duas casas decimais

        if (finalizeButton) {
            finalizeButton.style.display = totalItems > 0 ? "block" : "none"; 
            
        }
    }

    /*botões "Adicionar ao Carrinho" */
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
            
        });
    });

    /* VOLTAR AO TOPO */
    window.onscroll = function() {
        const backToTopButton = document.getElementById("back-to-top"); 
        

        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopButton.style.display = "block"; 
            
        } else {
            backToTopButton.style.display = "none"; 
            
        }
    };

    document.getElementById("back-to-top").onclick = function() {
        document.body.scrollTop = 0; 
       

        document.documentElement.scrollTop = 0; 
        
    };
});
