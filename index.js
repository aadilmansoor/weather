weather.style.display="none"

function handleKeys(evt)
   {
      if(evt.keyCode === 13) /*13 is the keyCode for the 'Enter' key*/
      {
        climate();
      }
   }

   document.addEventListener('keydown', handleKeys, true);


function climate(){
    place = search.value
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=b41ec3be35c7dac8aabbc21ba253137a`)
    .then(data=>data.json()).then(data => displayData(data))
}

function displayData(data) {
    weather.style.display="block"
    let currentDate = new Date();
    hours = currentDate.getHours()
    mins = currentDate.getMinutes();

    tempt = Math.round(Math.floor(data.main.temp)-273.15)
    plac = data.name
    condition = data.weather[0].description
    humidity = data.main.humidity
    wind = data.wind.speed
    timezone = data.timezone

    loc.innerHTML = `<i class="fa-sharp fa-solid fa-location-dot">${plac}</i>`
    tem.innerHTML = `${tempt}&#8451;`
    cond.innerHTML = condition
    winspeed.innerHTML = `<i  class="fa-solid fa-wind">${wind}</i>km/h`
    humid.innerHTML = `<i class="fa-sharp fa-solid fa-droplet">${humidity}</i>%`
    if(timezone == 19800){
        mins = ('0'+mins).slice(-2);
        hours = ('0'+hours).slice(-2);
        if(hours>=6 && hours<=18){
            imag.setAttribute('src','./images/day.jpg')
        } else {
            imag.setAttribute('src','./images/night.jpg')
        }
        let times = hours + ":" + mins
        time.innerHTML = times
    } else{
        timezone -= 19800
        hour =  Math.floor(timezone/3600)
        min = Math.floor((timezone%3600)/60)
        if(timezone > 0){
            console.log(mins,min);
            mins += min
            if(mins>59){
                mins -=60
                hour+=1
            }
            hours += hour
            if(hours>23){
                hours -= 24
            }
        } else {
            console.log(hours,hour);
            mins -= min
            if(mins>59){
                mins -= 60
                hours += 1
            }
            hours+=hour
            if(hours<24){
                hours += 24
            }
        }
        if(hours>=6 && hours<=18){
            imag.setAttribute('src','./images/day.jpg')
        } else {
            imag.setAttribute('src','./images/night.jpg')
        }
        mins = ('0'+mins).slice(-2);
        hours = ('0'+hours).slice(-2);
        let times = hours + ":" + mins
        time.innerHTML = times

    }
}

