const currentTimeInHours = new Date(DailyData[0].time * 1000).getHours();
const hoursUntilNight = 19 - currentTimeInHours;
const nightTime = currentTimeInHours + hoursUntilNight
const dayTime =


  console.log("Result: ", result)
console.log('Time:', DailyData[hoursUntilNight > 0 ? nightTime : currentTimeInHours])




var name = window.location.search.split('?')[1].split('=')[0]
var latitude = window.location.search.split('?')[1].split('&')[1].split('=')[0]
var longitude = window.location.search.split('?')[1].split('&')[2].split('=')[0]


  <!-- <div id="morning_forecast">Its bright and shiny!</div>
  <
  div id = "evening_forecast" > Its dark and rainy. < /div> -->
  <!-- <button type="button" name="button" id="morning_button">Morning Forecast</button>
  <
  button type = "button"
name = "button"
id = "evening_button" > Evening Forecast < /button> -->

console.log('Time:', new Date(DailyData[0].time * 1000).getHours()) vbnm, lkb nm, 21 vbnm, . /



// let morning_button = document.getElementById('morning_button')
// let evening_button = document.getElementById('evening_button')
//
// let morning_forecast_div = document.getElementById('morning_forecast')
// let evening_forecast_div = document.getElementById('evening_forecast')
//
// morning_button.addEventListener('click', () => {
//   evening_forecast_div.style.display = "none"
//   morning_forecast_div.style.display = "block"
// })
// evening_button.addEventListener('click', () => {
//   evening_forecast_div.style.display = "block"
//   morning_forecast_div.style.display = "none"
// })
// })