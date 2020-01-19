let field = document.createElement('div'); // создаем блок на странице
document.body.appendChild(field);
field.classList.add('field');

for (let i = 1; i <101; i++) {
    //создаем ячейки(еще 100 маленьких блока внутри)
    let excel = document.createElement('div'); 
    field.appendChild(excel);
    excel.classList.add('excel');
}

//присваиваем каждой ячейке координаты
let excel = document.getElementsByClassName('excel');
let x = 1;
let y = 10;

for (let i  = 0; i<excel.length; i++) {
    //условия при котором ячейки каждые 10 клеток начинают с новой строки
    if (x > 10 ){
        x = 1;
        y--;
    }
    excel[i].setAttribute('posX', x);
    excel[i].setAttribute('posY', y);
    x++;
}

//змейка это соседние ячейки с особым классом!!! которые находятся в css
//Функция создания змеи

function generateSnake (){
    let posX = Math.round(Math.random() * (10-3) + 3 );
    let posY = Math.round(Math.random() * (10-1) + 1 );
    return [posX, posY];
}

let cordinates = generateSnake();
//Мы ищем в нашем поле ячейку у которой атрибут позишн икс будет соответсотвовать первому элементу cordinates, a атрибут позишн игрик должен быть равен кординжйтс 1
let snakeBody = [document.querySelector('[posX = "' + cordinates[0] + '"][posY = "' +
cordinates[1] + '"]'), document.querySelector('[posX = "' + (cordinates[0]-1) + '"][posY = "' +
cordinates[1] + '"]'), document.querySelector('[posX = "' + (cordinates[0]-2) + '"][posY = "' +
cordinates[1] + '"]')];

//Связываем наш класс и ячейку, для того чтобы дать ячейке картинку
for (let i = 0; i<snakeBody.length; i++) {
    snakeBody[i].classList.add('snakebody');
}
    snakeBody[0].classList.add('head');

//Начинаем создавать яблоко

let mouse; // mouse потому что автор даун, вместо змейки и яблок у него длинный кот и мыши -_-


//Делаем тоже самое, что и при создании змеи
function createMouse () {
    function generateMouse (){
        let posX = Math.round(Math.random() * (10-3) + 3 );
        let posY = Math.round(Math.random() * (10-1) + 1 );
        return [posX, posY];
    }
    let mouseCordinates = generateMouse();
    //По аналогии со змеей 
    mouse = document.querySelector('[posX = "' + mouseCordinates[0] + '"][posY = "' +
    mouseCordinates[1] + '"]');  
    //Отлично, теперь нужно исправить возможную ошибку если ячейка яблока будет совпадать с ячейкой змеи (когда генерируется)
//Создаем цикл Вайл пока мышь занимает те же ячейки что и змея должны заного генрировать координаты и заного ставить мышь, пока она не станет на свободное
    while(mouse.classList.contains('snakebody')) {
        let mouseCordinates = generateMouse();
        mouse = document.querySelector('[posX = "' + mouseCordinates[0] + '"][posY = "' +
        mouseCordinates[1] + '"]');
    }
    mouse.classList.add('mouse');
}

createMouse();

let direction = 'right';
let steps = false;

let input = document.createElement('input');
document.body.appendChild(input);
input.style.cssText = `
margin: auto;
margin-top: 40px;
font-size: 20px;
display: block;
`;

let score = 0;
input.value = `Ваши очки: ${score}`;


//Создаем функцию движения вправо
//Возмьем последний элемент массива уберем у него snakebody и отцепим от нашего массива в принципе
function move() {
    let snakeCoordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
    snakeBody[0].classList.remove('head');
    snakeBody[snakeBody.length-1].classList.remove('snakebody');
    snakeBody.pop();

    // устанавливаем условия при которых змейка может двигаться влево вправо вверх вниз при это перескакивая на обратную сторону, когда она упирается в стену
    if (direction == 'right'){
        if (snakeCoordinates[0] < 10) {
            snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0]+1) + '"][posY = "' +
            snakeCoordinates[1] + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "1"][posY = "' +
            snakeCoordinates[1] + '"]'));
        }
    } else if (direction == 'left'){
        if (snakeCoordinates[0] > 1) {
            snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0]-1) + '"][posY = "' +
            snakeCoordinates[1] +  '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "10"][posY = "' +
            snakeCoordinates[1] + '"]'));
        }
    } else if (direction == 'up'){
        if (snakeCoordinates[1] < 10) {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' +
            (+snakeCoordinates[1] + 1) +  '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "1"]'));
        }
    } else if (direction == 'down'){
        if (snakeCoordinates[1] > 1) {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' +
            (snakeCoordinates[1] -1 ) +  '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "10"]'));
        }
    }


    if (snakeBody[0].getAttribute('posX') == mouse.getAttribute('posX') &&
     snakeBody[0].getAttribute('posY') == mouse.getAttribute('posY')){
         mouse.classList.remove('mouse');
        let a = snakeBody[snakeBody.length-1].getAttribute('posX');
        let b = snakeBody[snakeBody.length-1].getAttribute('posY');
        snakeBody.push(document.querySelector('[posX = "' + a + '"][posY = "' + b + '"]'));
        createMouse();
        score++;
        input.value = `Ваши очки: ${score}`;
     }
            


     if (snakeBody[0].classList.contains('snakebody')) {
        setTimeout(() => {
            alert(`Игра окончена. Ваши очки: ${score}`)
        }, 200) 
         clearInterval(interval);
         snakeBody[0].style.background = 'url(SnakeHeadDead.png) center no-repeat';
         snakeBody[0].style.backgroundSize = 'cover';
     }


    snakeBody[0].classList.add('head');
    for (let i = 0; i<snakeBody.length; i++) {
        snakeBody[i].classList.add('snakebody');
    }


    steps = true;
}

let interval = setInterval(move,300);

//устанавливаем движение змейки на кнопки
window.addEventListener('keydown', function(e){
    if (steps == true) {
        if (e.keyCode == 37 && direction != 'right') {
            direction = 'left';
            steps= false;
        }
        else if (e.keyCode == 38 && direction != 'down') {
            direction = 'up';
            steps= false;
        }
        else if (e.keyCode == 39 && direction != 'left') {
            direction = 'right';
            steps= false;
        }
        else if (e.keyCode == 40 && direction != 'up') {
            direction = 'down';
            steps= false;
        }
}
});

/* function XO(str) {
    str.toLowerCase()
    var countX = 0;
    var countY = 0;
    var strArray = str.split("");
    for (var i = 0; i<strArray.length; i++){
        if(strArray[i] === 'x'){
            countX++;
        } else if(strArray[i] === 'o'){
            countY++
        }
    }
    if (countX === countY)
        return true;
     else 
        return false;
    

}
console.log(XO("xxxxxxx"));
*/
