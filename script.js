let month = document.getElementById('month');

let monthName = document.getElementById('monthName');

let moreButtons = document.querySelectorAll('.more');

let mainButton = document.getElementById('button');


let mothers = 0;
let big = 0;
let small = 0;

let monthsCalculations = []

month.addEventListener('input', () => {
    switch (month.value) {
        case '120':
            monthName.textContent = 'Enero';
            break;
        case '110':
            monthName.textContent = 'Febrero';
            break;
        case '100':
            monthName.textContent = 'Marzo';
            break;
        case '90':
            monthName.textContent = 'Abril';
            break;
        case '80':
            monthName.textContent = 'Mayo';
            break;
        case '70':
            monthName.textContent = 'Junio';
            break;
        case '60':
            monthName.textContent = 'Julio';
            break;
        case '50':
            monthName.textContent = 'Agosto';
            break;
        case '40':
            monthName.textContent = 'Septiembre';
            break;
        case '30':
            monthName.textContent = 'Octubre';
            break;
        case '20':
            monthName.textContent = 'Noviembre';
            break;
        case '10':
            monthName.textContent = 'Diciembre';
            break;
        default:
            console.log('this is anything')
            console.log(month.value);
            break;
    }
})

moreButtons.forEach(moreButton => {
    moreButton.addEventListener('click', () => {
        let container = moreButton.parentNode;

        let number = container.parentNode.querySelector('.number');

        let newRabbit = document.createElement('img');
        newRabbit.setAttribute('src', 'media/rabbit.png');

        // Generar coordenadas aleatorias dentro de los límites del contenedor
        let maxX = container.offsetWidth;
        let maxY = container.offsetHeight;



        let randomX = Math.floor(Math.random() * maxX);
        let randomY = Math.floor(Math.random() * maxY);


        if (randomX > 140) {
            console.log('this was reduced');
            console.log(randomX);
            randomX = randomX - 70;
        }

        if (randomY > 140) {
            console.log('this was reduced');
            console.log(randomY);
            randomY = randomY - 70;
        }
        // Aplicar las coordenadas al estilo de posición
        newRabbit.style.position = 'absolute';
        newRabbit.style.left = randomX + 'px';
        newRabbit.style.top = randomY + 'px';



        // Invertir aleatoriamente horizontalmente
        if (Math.random() < 0.5) {
            newRabbit.style.transform = 'scaleX(-1)';
        }

        number.textContent = Number(number.textContent) + 1;



        container.appendChild(newRabbit);
    });
});


mainButton.addEventListener('click', () => {
    let numbers = document.querySelectorAll('.number');

    //let p0 = Array.from(numbers).reduce((acc, current) => acc + Number(current.textContent), 0);
    let p0 = 27;
    let pmaximo = 70;

    let k = 0.0252;
    let constante = 1 / p0 - 1 / pmaximo;





    for (let t = 1; t < 12; t++) {

        let complex = Math.pow(Math.exp(1), (pmaximo * k * t));
        let up = pmaximo * complex
        let down = complex + (pmaximo * constante);

        let x = up / down;
        console.log(x);

        monthsCalculations.push(Math.floor(x));

    }
    console.log(monthsCalculations);
});


