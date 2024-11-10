const key = "2862413eb1d9c4d5f49401c6ff8bdda0"

function dataScreen(data) {
    console.log(data)
    const name = document.querySelector('.input_city').value
    
    document.querySelector('.city').innerHTML = "Tempo em " + name
    
    document.querySelector('#temp').innerHTML = 'Temperatura: ' + Math.round(data.main.temp) + '°C'

    document.querySelector('#min').innerHTML = 'Mínimo: ' + Math.round(data.main.temp_min) + '°C'

    document.querySelector('#max').innerHTML = 'Máximo: ' +  Math.round(data.main.temp_max) + '°C'
    
    document.querySelector('.climate').innerHTML = data.weather[0].description
    
    document.querySelector('.humidity').innerHTML = 'Umidade: '+ data.main.humidity + '%'
   
    document.querySelector('.img-climate').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
}

async function seachCity(city) {
   try {
       const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`)

       if(!response.ok) {
        throw new Error('Cidade não encontrada')
       }

       const data = await response.json()

       if(data.cod !== 200) {
         throw new Error('Cidade não encontrada')
       }

       dataScreen(data)

   } catch(error) {
        document.querySelector('.city').innerHTML = "Erro: " + error.message;
        document.querySelector('#temp').innerHTML = '';
        document.querySelector('#min').innerHTML = '';
        document.querySelector('#max').innerHTML = '';
        document.querySelector('.climate').innerHTML = '';
        document.querySelector('.humidity').innerHTML = '';
        document.querySelector('.img-climate').src = '';
   }
}
function buttonClick() {
    const city = document.querySelector('.input_city').value
    if(city.trim() === '') {
        alert('Por favor, insira o nome de uma cidade. ')
        return
    }

    document.querySelector('.city').innerHTML = 'Carregando...'
    
    seachCity(city)
}