let scoreNumber = document.querySelector('.score-number');
const winField = document.querySelector('.popup-win');
const win = document.querySelector('.win');
const person = document.querySelector('.person');
const currentTime = document.querySelector('.current-time');
const totalWinTime = document.querySelector('.win-time');
const totalWinScore = document.querySelector('.win-score');
const btnClose = document.querySelector('.close');
const btnPause = document.querySelector('.btn-pause');
const btnStart = document.querySelector('.btn-start');
const eatSound = document.querySelector('.eat-sound');
const fieldName = document.querySelector('.enter-name');
const playerName = document.querySelector('.inp-name');
const levelGame = document.querySelector('.level');
const speedGame = document.querySelector('.speed');

// todo Start Время в игре
currentTime.textContent = '0:00';

let seconds = 0;
// считает время
function countTime(s) {
  let min = Math.floor(s / 60);
  let sec = Math.floor(s - min * 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min}:${sec}`;
}

function addTime() {
  currentTime.textContent = countTime(seconds);
}

function showTime() {
  seconds++;
  addTime();
  totalWinTime.textContent = currentTime.textContent;
}

let timeGame;
//! End Время в игре

// Закрываю попап
btnClose.addEventListener('click', function () {
  // winField.style.opacity = '0';
  winField.classList.remove('field-visible');
  currentTime.textContent = '0:00';
  score = 0;
  scoreNumber.textContent = score;
  // поле ввода имени показываю
  fieldName.classList.remove('name-hide');
  // 1 Удаляю что бы заново начать игру
  snake.splice(0);
  snake[0] = {
    x: cellsQuan * 10,
    y: cellsQuan * 10,
  };
  // 1 Удаляю что бы заново начать игру
  seconds = 0;
  // timeGame = setInterval(showTime, 1000);
  // startgame = setInterval(drawGame, 300);
  btnStart.disabled = false;
  // timeGame = setInterval(showTime, 1000);
});

let nameP;
let count = 0;
if (count == 0) {
  btnPause.disabled = true;
  // запускаю игру
  btnStart.addEventListener('click', function () {
    // clearInterval(drawGame);
    // показываю поле с именем
    nameP = playerName.value;
    fieldName.classList.add('name-hide');
    // name = prompt('What is your name?');
    if (nameP.length === 0 || nameP === ' ' || nameP == null) {
      person.textContent = 'user';
    } else {
      person.textContent = nameP;
    }
    // очищаю инпут
    playerName.value = '';

    timeGame = setInterval(showTime, 1000);
    startgame = setInterval(drawGame, speedValue.textContent);
    btnStart.disabled = true;
    levelGame.disabled = true;
    speedGame.disabled = true;
    count++;
  });
}

// Пауза в игре
btnPause.addEventListener('click', function () {
  // winField.style.opacity = '0.9';
  btnPause.classList.toggle('active-pause');
  win.textContent = 'Pause';
  btnClose.style.display = 'none';
  winField.classList.toggle('pause');
  if (winField.classList.contains('pause')) {
    clearInterval(startgame);
  } else {
    startgame = setInterval(drawGame, 300);
  }
  console.log(winField.classList.contains('pause'));
});

// Проиграл
function loose() {
  winField.classList.add('field-visible');
  // winField.style.opacity = '0.9';
  btnClose.style.display = 'block';
  win.textContent = 'You are loose';
  // делаю инпут активным
  levelGame.disabled = false;
  speedGame.disabled = false;
}

let gameCanvas = document.querySelector('.game-field');
console.log(gameCanvas);
// функция указывает формат рисовки
const ctx = gameCanvas.getContext('2d');
console.log(ctx);

// // первоначальная точка
// ctx.moveTo(0, 20);
// // рисую линию
// ctx.lineTo(20, 80);
// // задаю цвет линии
// ctx.strokeStyle = 'blue';
// // функция отрисовки
// ctx.stroke();

// // задаю параметри текста
// ctx.font = '30px Arial';
// // функция создания текста
// ctx.fillText('Hello world', 120, 50);

// // создаю переменную в которую передаю функцию создания нрадиента
// let grd = ctx.createLinearGradient(0, 0, 400, 400);
// // функция добавления цвета
// grd.addColorStop(0, 'yellow');
// grd.addColorStop(1, 'blue');
// // функция заполнения градиент
// ctx.fillStyle = grd;
// // функция откуда начнется градиент конкретно в канвасе
// ctx.fillRect(0, 0, 400, 400);

//
//
//
let score = 0; // счет игры
let cellsQuan = 20; // Количество ячеек
let cellSize = 400 / cellsQuan; // размер ячейки

// Функция для отрисовки всех ячеек
function drawAllCells() {
  for (var i = 0; i < cellsQuan; i++) {
    for (var j = 0; j < cellsQuan; j++) {
      drawCell(i, j);
    }
  }
}

// Когда змея съедает еду звук
function snakeAteFoodSound() {
  // Воспроиграйте звук
  eatSound.play();

  // Остановите звук через 1 секунду
  setTimeout(() => {
    eatSound.pause();
    eatSound.currentTime = 0; // Сбросите позицию воспроизведения
  }, 1000); // 1000 миллисекунд = 1 секунда
}

// Функция для отрисовки одной ячейки
function drawCell(i, j) {
  // Метод strokeRect()рисует обведенный прямоугольник, начальная точка которого находится в точке (x, y),
  // а размер определяется параметрами width и height.
  ctx.strokeRect(i * cellSize, j * cellSize, cellSize, cellSize);
}
// drawAllCells();

const min = 0; // Минимальное значение
const max = 400; // Максимальное значение
const step = cellsQuan; // Шаг

// координаты еды что бы рандомно появлялась
let food = {
  x: getRandomNumberStep(min, max, step),
  y: getRandomNumberStep(min, max, step),
};

// функция для отрисовки еды
// let drawFood = () => {
//   ctx.fillStyle = 'white';
//   ctx.fillRect(
//     getRandomNumberStep(min, max, step),
//     getRandomNumberStep(min, max, step),
//     20,
//     20
//   );
// };
// drawFood();

// функция случайного числа с шагом
function getRandomNumberStep(min, max, step) {
  const range = (max - min) / step;
  const randomIndex = Math.floor(Math.random() * range);
  return min + randomIndex * step;
}
// console.log(getRandomNumberWithStep(min, max, step)); // Вывод случайного числа с шагом 20

// змея
let snake = [];
snake[0] = {
  x: cellsQuan * 10,
  y: cellsQuan * 10,
};
// функция для отрисовки змеи
// let drawSnake = () => {
//   ctx.fillStyle = 'yellow';
//   ctx.fillRect(
//     getRandomNumberStep(min, max, step),
//     getRandomNumberStep(min, max, step),
//     20,
//     20
//   );
// };
// drawSnake();

// направление змейки
document.addEventListener('keydown', snakeDirection);
let dir;
function snakeDirection(e) {
  if (e.keyCode == 37 && dir !== 'right') {
    dir = 'left';
  } else if (e.keyCode == 38 && dir !== 'down') {
    dir = 'up';
  } else if (e.keyCode == 39 && dir !== 'left') {
    dir = 'right';
  } else if (e.keyCode == 40 && dir !== 'up') {
    dir = 'down';
  }
  // console.log(dir);
}

// змея кушает себя
function eatSnake(head, snakeBody) {
  for (let i = 0; i < snakeBody.length; i++) {
    if (head.x == snakeBody[i].x && head.y == snakeBody[i].y) {
      console.log(head.x, snakeBody[i].x);
      console.log(head.y, snakeBody[i].y);
      clearInterval(startgame);
    }
  }
}

// Уровень игры
const levelInput = document.querySelector('.level');
const levelValue = document.querySelector('.level-value');
levelInput.addEventListener('input', updateLevelValue);
function updateLevelValue() {
  levelValue.textContent = levelInput.value;
}

// Скорость игры
const spedInput = document.querySelector('.speed');
const speedValue = document.querySelector('.speed-value');
spedInput.addEventListener('input', updateSpeedValue);
function updateSpeedValue() {
  speedValue.textContent = spedInput.value;
  console.log(speedValue.textContent);
}

// отрисовка игры
function drawGame() {
  // делаю кнопку активной
  btnPause.disabled = false;
  ctx.clearRect(0, 0, 400, 400);
  // рисую игровое поле
  drawAllCells();
  // рисую еду
  ctx.fillStyle = 'white';
  ctx.fillRect(food.x, food.y, cellsQuan, cellsQuan);

  // делаем координаты для переопределения
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // рисую змею
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(snake[i].x, snake[i].y, cellsQuan, cellsQuan);
  }

  // кушаю еду
  if (snakeX == food.x && snakeY == food.y) {
    score++;
    scoreNumber.textContent = score;
    food = {
      x: getRandomNumberStep(min, max, step),
      y: getRandomNumberStep(min, max, step),
    };
    snakeAteFoodSound();
  } else {
    // удаляем последний елемент в масиве(что бы змейка отрисовывалась заново)
    snake.pop();
  }

  // В попапе скор
  totalWinScore.textContent = score;

  // Выигрываю игру
  if (scoreNumber.textContent == levelValue.textContent) {
    clearInterval(startgame);
    clearInterval(timeGame);
    // winField.style.opacity = '0.9';
    winField.classList.add('field-visible');
    // Отображаю кнопку
    btnClose.style.display = 'block';
    win.textContent = 'You are Win';
    // делаю кнопку не активной
    btnPause.disabled = true;
    btnStart.disabled = true;
    // делаю инпут активным
    levelGame.disabled = false;
    speedGame.disabled = false;
    updateResult(
      person.textContent,
      totalWinScore.textContent,
      totalWinTime.textContent
    );
  }

  // Проигрываю игру
  if (
    snakeX == cellsQuan * cellsQuan + 20 ||
    snakeX == -20 ||
    snakeY == cellsQuan * cellsQuan + 20 ||
    snakeY == -20
  ) {
    loose();
    clearInterval(timeGame);
    clearInterval(startgame);
    btnPause.disabled = true;
  }

  // Двигаю змейку
  if (dir == 'left') {
    snakeX -= cellsQuan;
  }
  if (dir == 'right') {
    snakeX += cellsQuan;
  }
  if (dir == 'up') {
    snakeY -= cellsQuan;
  }
  if (dir == 'down') {
    snakeY += cellsQuan;
  }

  // переопределенная змея
  let snakeHead = {
    x: snakeX,
    y: snakeY,
  };

  // проверка когда ем сам себя
  // eatSnake(snakeHead, snake);

  // переопределеную голову додаю к змеи
  snake.unshift(snakeHead);
  // console.log(snakeHead);
}

// let startgame = setInterval(drawGame, 300);
// drawGame();

function addResult(placeGame, playerName, scoreGame) {
  const tableBody = document.querySelector('.table tbody');
  const newRowTable = document.createElement('tr');
  newRowTable.innerHTML = `<td>${placeGame}</td><td>${playerName}</td><td>${scoreGame}</td>`;
  tableBody.appendChild(newRowTable);
}

function updateResult(playerName1, scoreGame1) {
  const result = JSON.parse(localStorage.getItem('results')) || [];
  // использую {} что бы дальше мог сортировать
  result.push({ playerName1, scoreGame1 });
  result.sort((a, b) => b.scoreGame1 - a.scoreGame1);
  // что бы видно было только 10 игр
  result.splice(10);
  // переделываю в строку так как localStorage работает только со строками
  localStorage.setItem('results', JSON.stringify(result));
  const tableBody = document.querySelector('.table tbody');
  // для очистки чтобы не допустить дублирования результатов
  tableBody.innerHTML = '';
  result.forEach((res, index) => {
    addResult(index + 1, res.playerName1, res.scoreGame1);
  });
}

// потом сделаю что бы время считало
// function addResult(placeGame, playerName, scoreGame, timeGame) {
//   const tableBody = document.querySelector('.table tbody');
//   const newRowTable = document.createElement('tr');
//   newRowTable.innerHTML = `<td>${placeGame}</td><td>${playerName}</td><td>${scoreGame}</td><td>${timeGame}</td>`;
//   tableBody.appendChild(newRowTable);
// }

// function updateResult(playerName1, scoreGame1, timeGame1) {
//   const result = JSON.parse(localStorage.getItem('results')) || [];
//   // использую {} что бы дальше мог сортировать
//   result.push({ playerName1, scoreGame1, timeGame1 });
//   result.sort((a, b) => b.scoreGame1 - a.scoreGame1);
//   // что бы видно было только 10 игр
//   result.splice(3);
//   // переделываю в строку так как localStorage работает только со строками
//   localStorage.setItem('results', JSON.stringify(result));
//   const tableBody = document.querySelector('.table tbody');
//   // для очистки чтобы не допустить дублирования результатов
//   tableBody.innerHTML = '';
//   result.forEach((res, index) => {
//     addResult(index + 1, res.playerName1, res.scoreGame1, res.timeGame1);
//   });
// }
