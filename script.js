// Calculation Starter
let settings = document.getElementById('settings');
let settingsMenu = document.getElementById('setting-menu');
let calButton = document.getElementById('cal-button');

// Rabbit Container
let rabbitContainer = document.getElementById('container');

// Updating data
let rabbitNumber = document.getElementById('number');
let rabbitFemale = document.getElementById('female');
let rabbitMale = document.getElementById('male');
let rabbitSmall = document.getElementById('small');
let rabbitLimit = document.getElementById('limit');
let rabbitMonths = document.querySelectorAll('.months-container>div');
let rabbitRate = document.getElementById('rate');
let rabbitMoney = document.getElementById('money');

// Data 
let data = {}
let months = {
    conejosAntes: [],
    conejosDespues: [],
    ventas: []
}

settings.addEventListener('click', () => {
    settingsMenu.style.display = 'block';
})

calButton.addEventListener('click', (event) => {
    event.preventDefault();

    let inputData = document.querySelectorAll('input');
    inputData.forEach(input => {
        let dataName = input.getAttribute('data-name');
        let value = input.value;
        data[dataName] = value;
    });

    data.cantidad = Number(data.conejos) + Number(data.conejas) + Number(data.gazapos);
    data.ventas = data.ventas.split(',').map(Number);
    data.money = data.ventas.reduce((a, b) => a + b, 0) * 25
    data.k = Number(data.k);
    data.maximo = Number(data.maximo);

    console.log(data);
    settingsMenu.style.display = 'none';

    calculateValues();

    ajustarConejos(data.cantidad);
});



function calculateValues() {
    let ventas = data.ventas;
    let pmaximo = data.maximo;

    let k = data.k;
    let t = 1;

    let conejosActuales = data.cantidad;

    for (let i = 0; i < ventas.length; i++) {
        console.log(i + 1);
        months.conejosAntes[i] = conejosActuales;
        console.log(`Conejos Antes: ${conejosActuales}`);

        let value = calcularPoblacionFinal(conejosActuales);
        months.conejosDespues[i] = value;
        console.log(`Conejos Despues: ${value}`);

        months.ventas[i] = ventas[i];
        //console.log(`Ventas: ${ventas[i]}`);

        conejosActuales = value - ventas[i];
    }

    // console.log(`Numero de ventas: ${ventas.reduce((a, b) => a + b, 0)}`);
    // console.log(`Ganancias: ${ventas.reduce((a, b) => a + b, 0) * 25}`);

    function calcularPoblacionFinal(x0) {
        let C = (1 / x0) - (1 / pmaximo);
        // Calcular la población final
        let poblacionFinal = pmaximo / (1 + pmaximo * C * Math.exp(-k * t * pmaximo));
        poblacionFinal = poblacionFinal
        //console.log(`Pre-venta: ${poblacionFinal}`);
        return poblacionFinal;
    }

    populateValues();
}

function populateValues() {
    //console.log(months);
    rabbitNumber.innerText = data.cantidad;
    rabbitFemale.innerText = data.conejas;  // Corregí la asignación de rabbitFemale
    rabbitMale.innerText = data.conejos;
    rabbitLimit.innerText = data.maximo;
    rabbitSmall.innerText = data.gazapos;
    rabbitRate.innerText = data.k;
    rabbitMoney.innerText = data.money;

    for (let i = 0; i < rabbitMonths.length; i++) {
        rabbitMonths[i].setAttribute('data-quantity', months.conejosDespues[i]);
        rabbitMonths[i].querySelector('.antes').innerText = months.conejosAntes[i].toFixed(2);
        rabbitMonths[i].querySelector('.despues').innerText = months.conejosDespues[i].toFixed(2);
        rabbitMonths[i].querySelector('.venta').innerText = months.ventas[i];
    }
}


function ajustarConejos(cantidad) {
    const conejos = rabbitContainer.querySelectorAll('img').length;

    //console.log(`Cantidad de conejos: ${conejos}`);
    let iteraciones = Math.abs(cantidad - conejos);


    for (let i = 0; i < iteraciones; i++) {
        if (cantidad > conejos) {
            insertarConejos();
        } else if (cantidad < conejos) {
            quitarConejo();
        } else {
            break;
        }
    }

}

function insertarConejos() {
    const newRabbit = document.createElement('img');
    newRabbit.src = 'media/clean-rabbit.png';

    const maxX = rabbitContainer.offsetWidth - 140;
    const maxY = rabbitContainer.offsetHeight - 140;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    newRabbit.style.position = 'absolute';
    newRabbit.style.left = (randomX + 70) + 'px';
    newRabbit.style.top = (randomY + 70) + 'px';

    if (Math.random() < 0.5) {
        newRabbit.style.transform = 'scaleX(-1)';
    }
    rabbitContainer.appendChild(newRabbit);
}

function quitarConejo() {
    const conejos = rabbitContainer.querySelectorAll('img');
    if (conejos.length > 0) {
        const ultimoConejo = conejos[conejos.length - 1];
        ultimoConejo.remove();
    }
}

rabbitMonths.forEach(month => {
    month.addEventListener('click', (event) => {
        // Si la clase "active" está presente, quítala; de lo contrario, agrégala.
        if (month.classList.contains('active')) {
            month.classList.remove('active');
        } else {
            // Elimina la clase "active" de todos los meses antes de agregarla al actual
            rabbitMonths.forEach(otherMonth => {
                otherMonth.classList.remove('active');
            });

            month.classList.add('active');
            let quantity = month.getAttribute('data-quantity');
            ajustarConejos(quantity);
        }
    });
});
