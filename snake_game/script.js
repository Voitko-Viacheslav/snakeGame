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
// let grd = ctx.createLinearGradient(0, 0, 390, 390);
// // функция добавления цвета
// grd.addColorStop(0, 'blue');
// grd.addColorStop(1, 'red');
// // функция заполнения градиент
// ctx.fillStyle = grd;
// // функция откуда начнется градиент конкретно в канвасе
// ctx.fillRect(10, 10, 300, 350);

//
//
//
let score = 0; // счет игры
let cellsQuan = 20; // Количество ячеек
let cellSize = 400 / cellsQuan; // размер ячейки

// // Очищаем холст
// ctx.clearRect(0, 0, 400, 400);

// Функция для отрисовки всех ячеек
function drawAllCells() {
  for (var i = 0; i < cellsQuan; ++i) {
    for (var j = 0; j < cellsQuan; ++j) {
      drawCell(i, j);
    }
  }
}
// Функция для отрисовки одной ячейки
function drawCell(i, j) {
  // Метод strokeRect()рисует обведенный прямоугольник, начальная точка которого находится в точке (x, y),
  // а размер определяется параметрами widthи height.
  ctx.strokeRect(i * cellSize, j * cellSize, cellSize, cellSize);
}

drawAllCells();

const min = 0; // Минимальное значение
const max = 400; // Максимальное значение
const step = cellsQuan; // Шаг

// функция для отрисовки еды
let drawFood = () => {
  ctx.strokeStyle = 'white';
  ctx.strokeRect(
    getRandomNumberStep(min, max, step),
    getRandomNumberStep(min, max, step),
    20,
    20
  );
};
drawFood();

// функция случайного числа с шагом
function getRandomNumberStep(min, max, step) {
  const range = (max - min) / step;
  const randomIndex = Math.floor(Math.random() * range);
  return min + randomIndex * step;
}
// console.log(getRandomNumberWithStep(min, max, step)); // Вывод случайного числа с шагом 20

// функция для отрисовки змеи
let drawSnake = () => {
  ctx.strokeStyle = 'yellow';
  ctx.strokeRect(
    getRandomNumberStep(min, max, step),
    getRandomNumberStep(min, max, step),
    20,
    20
  );
};
drawSnake();

setInterval(function () {
  // ctx.clearRect(0, 0, 400, 400); //Очищаем старое.
  //   // g.fillStyle = "red"; //Даем красный цвет для рисования яблока.
  //   // g.fillRect(...a, s, s); //Рисуем яблоко на холсте 30x30 с координатами a[0] и a[1].
  //   // g.fillStyle = "#000"; //А теперь черный цвет для змейки.
}, 60);
