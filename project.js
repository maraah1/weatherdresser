var dayInspoButton = document.querySelector('button[name="dayInspoButton"]')
var nightInspoButton = document.querySelector('button[name="nightInspoButton"]')
var secondDayButton = document.querySelector('button[name="secondDayButton"]')
var secondNightButton = document.querySelector('button[name="secondNightButton"]')
var dayPics = document.querySelector('.day_inspoPics')
var nightPics = document.querySelector('.night_inspoPics')
//console.log(nightPics)


let cities = {
  "new_york": {
    lat: 40.7128,
    lng: 74.0060
  },
  "phoenix": {
    lat: 33.4484,
    lng: 112.0740
  },
  "denver": {
    lat: 39.7392,
    lng: 104.9903
  },
  "hawaii": {
    lat: 19.8968,
    lng: 155.5828
  },
  "paris": {
    lat: 48.8566,
    lng: 2.3522
  },
  "chiang_mai": {
    lat: 18.7061,
    lng: 98.9817
  }
}



var name = window.location.search.split('?')[1].split('&')[0].split('=')[1]
var incoming_city = window.location.search.split('?')[1].split('&')[1].split('=')[1].toLowerCase()
var parsed_city = incoming_city.replace(/\+/ig, "_");

console.log("parsed_city is " + parsed_city);
var latitude = cities[parsed_city].lat
var longitude = cities[parsed_city].lng

//localStorage.setItem("longitude", longitude);
/// you can then retrieve it on any page using localStorage.getItem("longitude")
dayInspoButton.style.display = "none"
nightInspoButton.style.display = "none"
dayPics.style.display = "none"
nightPics.style.display = "none"
secondNightButton.style.display = "none"
secondDayButton.style.display = "none"
//mainContent.style.backgroundColor = "white"

fetchApi()

function calcDay(coordinates) {
  var dailyData = coordinates['hourly']['data']
  //console.log(dailyData)
  const currentTimeInHours = new Date(dailyData[0].time * 1000).getHours();
  //console.log(currentTimeInHours)
  const hoursUntilDay = (6 - currentTimeInHours + 1)
  //console.log(hoursUntilDay)
  const dayCalc = 24 + hoursUntilDay

  return dayCalc;
  //console.log(dayCalc);
}

function calcNight(coordinates) {
  var dailyData = coordinates['hourly']['data']
  //console.log(dailyData)
  const currentTimeInHours = new Date(dailyData[0].time * 1000).getHours();
  //console.log(currentTimeInHours)
  const hoursUntilDay = 19 - currentTimeInHours
  //console.log(hoursUntilDay)
  const nightCalc = currentTimeInHours + hoursUntilDay

  return nightCalc;
  console.log(nightCalc);
}

function calcNow(coordinates) {
  var dailyData = coordinates['hourly']['data']
  //console.log(dailyData)
  const currentTimeInHours = new Date(dailyData[0].time * 1000).getHours();
  //console.log(currentTimeInHours)

  return currentTimeInHours;
}

var phrase = ''
var textBox = document.querySelector('.textBox')
// textBox.innerHTML = `${phrase}! <br> I suggest wearing a heavy jacket. kjfnka fawkheufh weauhrwe iuhrweiuhriwuehi weirhi ehrieuh iuerhi ueheuh dkajf kahfk kafha kahfkawh ake alkfhuae kaj`


function fetchApi(type) {
  fetch('http://localhost:3000/' + latitude + '/' + longitude)
    .then(response => response.json())
    .then(coordinates => {
      var dailyData = coordinates['hourly']['data']
      console.log(dailyData)
      let calc;
      if (type === "night") {
        calc = calcNight(coordinates)
        phrase = `Tonight`
      } else if (type === "day") {
        calc = calcDay(coordinates)
        phrase = `Tomorrow`
      } else {
        calc = calcNow(coordinates)
        phrase = `Hello ${name}!`
      }


      if (dailyData[calc].apparentTemperature <= 33) {
        textBox.innerHTML = `${phrase} It's going to be cold today so suggest wearing a heavy jacket. Possibly faux fur, paired with a pair of boots, jeans, and longsleeve turtle neck!`
      } else if (dailyData[calc].apparentTemperature > 33 && dailyData[calc].apparentTemperature <= 50) {
        textBox.innerHTML = `${phrase} It'll be kind of chilly, so I suggest wearing short sleeves with a jacket or a light hoodie, skinny jeans with a pair of sneakers or chunky heel booties!`
      } else if (dailyData[calc].apparentTemperature > 50 && dailyData[calc].apparentTemperature <= 60) {
        textBox.innerHTML = `${phrase} Its is going to be pretty medium, so I suggest trying a long sleeve off the shoulder look with a pair of pants or shorts, and sneaks with some sunglasses! `
      } else if (dailyData[calc].apparentTemperature > 60 && dailyData[calc].apparentTemperature <= 90) {
        textBox.innerHTML = `${phrase} Its going to be pretty hot, so I suggest going out in your favorite shorts and sandals!`
      }
      if (dailyData[calc].precipProbability >= .5) {
        textBox.innerHTML = `There is also a big chance of rain so bring an umbrella ella ella eh eh eh`
      }
      if (dailyData[calc].humidity >= .5 && dailyData[calc].humidity > 1) {
        textBox.innerHTML = `Its going to be humid too, so for my curly girls I suggest wearing a ponytail or hat!`
      }

    })

}

// jQuery(document).ready(function($) {
//   $.ajax({
//     url: "http://api.wunderground.com/api/6cda0e3f3058e59b/geolookup/conditions/q/IA/Cedar_Rapids.json",
//     dataType: "jsonp",
//     success: function(parsed_json) {
//       var location = parsed_json['location']['city'];
//       var temp_f = parsed_json['current_observation']['temp_f'];
//       alert("Current temperature in " + location + " is: " + temp_f);
//     }
//   });
// });



var dayButton = document.querySelector('button[name="dayButton"]')

dayButton.addEventListener('click', function() {
  fetchApi("day")
  //document.body.classList.add('background-day')
  //mainContent.style.backgroundColor = "red"
})


var nightButton = document.querySelector('button[name="nightButton"]')
//console.log(nightButton)

nightButton.addEventListener('click', function() {
  fetchApi("night")
  //document.body.classList.add('background-night')


})

var styleHoroButton = document.querySelector('button[name="horoButton"]')
document.body.style.backgroundColor = "white"
styleHoroButton.addEventListener('click', function(input) {
  fetch('http://localhost:3000/' + latitude + '/' + longitude)
    .then(response => response.json())
    .then(coordinates => {
      var matchWords = coordinates['hourly']['data'][0].icon
      //console.log(matchWords)
      var cloudy = matchWords.match(/cloudy/i)
      var rain = matchWords.match(/rain/i)
      var sunny = matchWords.match(/sunny/i)
      var hot = matchWords.match(/hot/i)
      var humid = matchWords.match(/humid/i)
      var wind = matchWords.match(/wind/i)

      if (cloudy) {
        textBox.innerHTML = `A little Cloud Wont Ruin Your Day! Get Out There And Try New Colors! You Never Know What May Compliment You!`
      } else if (rain) {
        textBox.innerHTML = `Rain Rain Come My Way! Finally Time To Pull Out Those Knee High Boots, Super Cute Cardigan, And Rock It!`
      } else if (sunny) {
        textBox.innerHTML = `Helllooo Sunshine! Pull Out Those Stunna Shades And Your Favorite Pair Of Shorts! You Never Know Whose Eyes You Might Catch!`
      } else if (hot) {
        textBox.innerHTML = `Make The Best Of Your Day And Kick It By The Pool! Maybe That Cute Swimsuit Is What You Need To Reset`
      } else if (humid) {
        textBox.innerHTML = `Stickiness! No! Always Carry Some Blotting Sheets To Keep That "Shine" From Preventing Your Shine!`
      } else if (wind) {
        textBox.innerHTML = `Nothing Beats Confidence! So Let Your Hair Down And Let Your Hair Blow In The Wind Like Beyonce!`
      }
    })
})

// var styleInspoButton = document.querySelector('button[name="inspobutton"]')
//console.log(styleInspoButton)
var inspoSubButtons = document.querySelector('.inspoSubButtons')
//console.log(inspoSubButtons)
var secondDayButton = document.querySelector('button[name="secondDayButton"]')
//console.log(secondDayButton)
var secondNightButton = document.querySelector('button[name="secondNightButton"]')
//console.log(secondNightButton)
var mainContent = document.querySelector('.main-content')
//console.log(mainContent)



function myFunc() {
  // secondDayButton.style.display = secondDayButton.style.display === "none" ? "block" : "none"

  textBox.style.display = textBox.style.display === "none" ? "block" : "none"
  dayInspoButton.style.display = dayInspoButton.style.display === "none" ? "block" : "none";
  nightInspoButton.style.display = nightInspoButton.style.display === "none" ? "block" : "none";
}

function dayFunc() {
  mainContent.classList.add('background-day')

  dayInspoButton.style.display = dayInspoButton.style.display === "block" ? "none" : "block";
  secondDayButton.style.display = secondDayButton.style.display === "none" ? "block" : "none"
  dayPics.style.display = dayPics.style.display === "none" ? "block" : "none";
  nightInspoButton.style.display = nightInspoButton.style.display === "block" ? "none" : "block";

}



function secondDayFunc() {
  mainContent.classList.remove('background-day')
  dayInspoButton.style.display = dayInspoButton.style.display === "none" ? "block" : "none";
  nightInspoButton.style.display = nightInspoButton.style.display === "none" ? "block" : "none";
  secondDayButton.style.display = secondDayButton.style.display === "block" ? "none" : "none"
  dayPics.style.display = dayPics.style.display === "block" ? "none" : "none";

}

function nightFunc() {
  mainContent.classList.add('background-night')
  secondNightButton.style.display = secondNightButton.style.display === "none" ? "block" : "none"
  nightPics.style.display = nightPics.style.display === "none" ? "block" : "none";
  dayInspoButton.style.display = dayInspoButton.style.display === "block" ? "none" : "block";
  nightInspoButton.style.display = nightInspoButton.style.display === "block" ? "none" : "block";

}


function secondNightFunc() {
  mainContent.classList.remove('background-night')
  dayInspoButton.style.display = dayInspoButton.style.display === "none" ? "block" : "none";
  nightInspoButton.style.display = nightInspoButton.style.display === "none" ? "block" : "none";
  secondNightButton.style.display = secondNightButton.style.display === "block" ? "none" : "none"
  nightPics.style.display = nightPics.style.display === "block" ? "none" : "none";
}