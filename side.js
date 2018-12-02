const currentTimeInHours = new Date(DailyData[0].time * 1000).getHours();
const hoursUntilNight = 19 - currentTimeInHours;
const nightTime = currentTimeInHours + hoursUntilNight



let name = window.location.search.split('?')[1].split('=')[0]
let latitude = window.location.search.split('?')[1].split('&')[1].split('=')[0]
let longitude = window.location.search.split('?')[1].split('&')[2].split('=')[0]