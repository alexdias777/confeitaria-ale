// Aguarda o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", function() {
    // Evento para o botão "Finalizar Compra"
    const finalizeButton = document.getElementById("GoIfood"); 
    // Selecionando o botão no HTML

    if (finalizeButton) {
        finalizeButton.addEventListener('click', function() {
            window.open('https://www.ifood.com.br/delivery/alvorada-rs/bolos-doces-salada-de-frutas---bolo-de-pote-da-ale-passo-do-feijo/a61a583c-b947-4287-a6d0-8230133bbee1', '_blank');
        });
    }

    // Outras funções e eventos do seu código...
});
