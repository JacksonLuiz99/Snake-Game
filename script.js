document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const snakeElement = document.getElementById('snake');
    const foodElement = document.getElementById('food');
    const scoreDisplay = document.getElementById('score');

    let snakeX = 10;
    let snakeY = 10;
    let foodX = 5;
    let foodY = 5;
    let dx = 0;
    let dy = 0;
    let intervalTime = 200; // Intervalo inicial
    let score = 0;
    let snakeBody = [{x: 10, y: 10}]; // Inicializa o corpo da cobra com uma célula
    let interval = setInterval(updateGame, intervalTime);

    function updateGame() {
        // Move a cabeça da cobra
        snakeX += dx;
        snakeY += dy;

        // Verifica colisões com as bordas do tabuleiro
        if (snakeX < 0 || snakeX >= 20 || snakeY < 0 || snakeY >= 20) {
            gameOver();
            return;
        }

        // Verifica se a cobra comeu a comida
        if (snakeX === foodX && snakeY === foodY) {
            eatFood();
            score++;
            scoreDisplay.textContent = score;
            // Adiciona uma nova célula ao corpo da cobra
            snakeBody.push({});
            clearInterval(interval);
            intervalTime *= 0.9; // Diminui o intervalo de tempo
            interval = setInterval(updateGame, intervalTime); // Reinicia o intervalo com a velocidade aumentada
        }

        // Move o corpo da cobra
        for (let i = snakeBody.length - 1; i > 0; i--) {
            snakeBody[i].x = snakeBody[i - 1].x;
            snakeBody[i].y = snakeBody[i - 1].y;
        }
        snakeBody[0].x = snakeX;
        snakeBody[0].y = snakeY;

        // Atualiza a posição da cobra no tabuleiro
        for (let i = 0; i < snakeBody.length; i++) {
            const part = snakeBody[i];
            const snakePart = document.createElement('div');
            snakePart.classList.add('snake-body');
            snakePart.style.left = part.x * 20 + 'px';
            snakePart.style.top = part.y * 20 + 'px';
            gameBoard.appendChild(snakePart);
        }

        // Remove a última célula do corpo da cobra
        while (gameBoard.children.length > snakeBody.length + 1) {
            gameBoard.removeChild(gameBoard.lastChild);
        }
    }

    // Função para comer comida
    function eatFood() {
        foodX = Math.floor(Math.random() * 20);
        foodY = Math.floor(Math.random() * 20);
        foodElement.style.left = foodX * 20 + 'px';
        foodElement.style.top = foodY * 20 + 'px';
    }

    // Função de fim de jogo
    function gameOver() {
        clearInterval(interval);
        alert('Game Over! Pontuação: ' + score);
    }

    // Controle da cobra usando as setas do teclado
    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowUp':
                if (dy !== 1) { // Impede a cobra de voltar sobre si mesma
                    dx = 0;
                    dy = -1;
                }
                break;
            case 'ArrowDown':
                if (dy !== -1) {
                    dx = 0;
                    dy = 1;
                }
                break;
            case 'ArrowLeft':
                if (dx !== 1) {
                    dx = -1;
                    dy = 0;
                }
                break;
            case 'ArrowRight':
                if (dx !== -1) {
                    dx = 1;
                    dy = 0;
                }
                break;
        }
    });
});
