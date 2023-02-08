// Key
const key= 'key de acesso'

// Selecionando elementos da doom
const cidade= document.querySelector('h3')
const temp= document.querySelector('h4')
const description= document.querySelector('.description')
const humidity= document.querySelector('.humidity')
const wind= document.querySelector('.wind')
const svgLocation= document.querySelector('svg')
const button= document.querySelector('.button')
const input= document.querySelector('input')
const imgCountry= document.querySelector('.imgCountry')
const imgWeather= document.querySelector('.imgWeather')
const containerD= document.querySelector('.containerD')

//Chamada da API
const callAPI= (city)=>{
     return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}&lang=pt_br`)
    .then((response)=>{return response.json()})
    .catch((err)=>{console.log('deu ruim '+err)})
}

const validField=()=>{
    return document.querySelector('input').reportValidity()
}

//Passando e pegando parametros da API 
const catchCity= async (city)=>{
   try{
    if(validField()){
        city = input.value
        const waitCall = await callAPI(city)
        cidade.innerHTML = waitCall.name
        //console.log(waitCall)

        //pegando bandeira do país
        imgCountry.style.visibility = "visible"
        svgLocation.style.visibility= 'visible'
        imgCountry.setAttribute('src', `https://flagsapi.com/${waitCall.sys.country}/flat/64.png`)

        imgWeather.style.visibility='visible'
        imgWeather.setAttribute('src', ` http://openweathermap.org/img/wn/${waitCall.weather[0].icon}.png`)

        
        //pegando a temperatura e descrição
        wind.innerHTML=`Vento: ${Math.trunc(waitCall.wind.speed*3.6)} Km/h`
        temp.innerHTML = `${Math.trunc(waitCall.main.temp)}°C `
        description.innerHTML = waitCall.weather[0].description.toUpperCase()
        humidity.innerHTML= 'Humidade: '+waitCall.main.humidity+"%"
        containerD.style.visibility='visible'
        input.value = ''
    }
    
   }
   // TODO: mensagem de erro caso não encontre o país
   catch(err){
    if(err){
        cidade.innerHTML = 'Cidade não encontrada'
        svgLocation.style.visibility = "hidden"
        imgCountry.style.visibility = "hidden"
        imgWeather.style.visibility= 'hidden'
        temp.innerHTML = ""
        input.value = ''
        containerD.style.visibility='hidden'
        console.log('erro ' + err)
    }
    
   }
}

button.addEventListener('click', catchCity)