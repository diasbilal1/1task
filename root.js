const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Главная страница
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/bmiCalculator.html');
});

// Страница калькулятора ИМТ
app.get('/bmicalculator', (req, res) => {
  res.sendFile(__dirname + '/views/bmiCalculator.html');
});

// Обработка данных формы калькулятора ИМТ
app.post('/bmicalculator', (req, res) => {
  const weight = parseFloat(req.body.weight);
  const height = parseFloat(req.body.height);
  
  // Логика расчета ИМТ
  const bmi = calculateBMI(weight, height);
  const currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');
  
  // Отправка результата ИМТ и временной метки
  res.send(`Ваш ИМТ: ${bmi}. Рассчитано ${currentTime}`);
});

function calculateBMI(weight, height) {
  const bmi = weight / (height * height);
  return bmi.toFixed(2);
}

app.listen(port, () => {
  console.log(`Сервер запущен на порте ${port}`);
});
