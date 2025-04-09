// Datos de las cartas (8 elementos = 4 pares)
const cardData = [
  { id: 1, img: 'pez.webp' },
  { id: 1, img: 'pecera.png' },
  { id: 2, img: 'ojos5.jpg' },
  { id: 2, img: 'gafas2.jpg' },
  { id: 3, img: 'zumo.jpg' },
  { id: 3, img: 'naranja.jpg' },
  { id: 4, img: 'gasolina.jpg' },
  { id: 4, img: 'coche2.png' },
];

let selectedCards = [];
let matchedCards = 0;
const gameContainer = document.querySelector('.game-container');
const restartBtn = document.getElementById('restart-btn');
const restartContainer = document.querySelector('.restart-container');

// Función para barajar el arreglo (algoritmo Fisher-Yates)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Crear las cartas en el DOM
function createCards() {
  const shuffledCards = shuffle(cardData.slice());
  shuffledCards.forEach(cardInfo => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.dataset.card = cardInfo.id;
      card.innerHTML = `<img src="${cardInfo.img}" alt="${cardInfo.img}">`;
      card.addEventListener('click', selectCard);
      gameContainer.appendChild(card);
  });
}

// Función para seleccionar una carta
function selectCard() {
  if (this.classList.contains('matched') || this.classList.contains('selected')) {
      return;
  }

  this.classList.add('selected');
  selectedCards.push(this);

  if (selectedCards.length === 2) {
      checkMatch();
  }
}

// Función para verificar si las dos cartas seleccionadas son un par
function checkMatch() {
  const [firstCard, secondCard] = selectedCards;

  if (firstCard.dataset.card === secondCard.dataset.card) {
      firstCard.classList.add('matched');
      secondCard.classList.add('matched');
      matchedCards += 1;
      selectedCards = [];

      // Desvanecer las cartas emparejadas con una transición de opacidad
      setTimeout(() => {
          firstCard.classList.add('hidden');
          secondCard.classList.add('hidden');
      }, 300); // Asegura que la animación de selección ocurra antes

      if (matchedCards === cardData.length / 2) {
        // Mostrar el botón de reinicio en lugar de la alerta
        setTimeout(() => {
          const restartContainer = document.querySelector('.restart-container');
          restartContainer.style.display = 'flex'; // Hacemos visible el botón de reinicio
        }, 2000); // Tiempo para mostrar el mensaje, puedes ajustarlo
      }
    } else {
      setTimeout(() => {
        firstCard.classList.remove('selected');
        secondCard.classList.remove('selected');
        selectedCards = [];
      }, 1000);
    
      // Añadir la clase 'incorrect' para mostrar el borde rojo
      firstCard.classList.add('incorrect');
      secondCard.classList.add('incorrect');

      // Remover la clase incorrect después de 0.5 segundos
      setTimeout(() => {
          firstCard.classList.remove('incorrect');
          secondCard.classList.remove('incorrect');
      }, 500);

      // Desmarcar las cartas después de 1 segundo
      setTimeout(() => {
          firstCard.classList.remove('selected');
          secondCard.classList.remove('selected');
          selectedCards = [];
      }, 1000);
  }
}

// Función para reiniciar el juego
function restartGame() {
  // Limpiar el contenedor de las cartas
  gameContainer.innerHTML = '';
  // Reiniciar variables
  selectedCards = [];
  matchedCards = 0;
  restartContainer.style.display = 'none'; // Ocultar el botón de reinicio
  createCards(); // Crear nuevas cartas
}

// Asignar el evento al botón de reinicio para ir al siguiente juego
restartBtn.addEventListener('click', () => {
  window.location.href = "../A/index.html"; // Ajusta la ruta según tu estructura
});

// Inicializar el juego
createCards();
