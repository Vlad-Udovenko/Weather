$(window).on('load', function () {
  const $preloader = $('#p_prldr'),
    $svg_anm = $preloader.find('.svg_anm');
  $svg_anm.fadeOut();
  $preloader.delay(300).fadeOut('slow');
});

let input = $('#city');
let city;
let city3 = $(input).text();
let city2;

let inpVal = input.val();
$(document).on('click', 'span[class^="k"]', function (e) {
  e.preventDefault();
  input.val(inpVal + $(this).attr('value'));
  city2 = $(this).text();
  $('#selected2').css('display', 'block');
});
$(document).on('click', 'span[class^="s"]', function (e) {
  e.preventDefault();
  input.val(inpVal + $(this).attr('value'));
  city2 = $(this).text();
  $('#selected2').css('display', 'block');
});
$(document).on('click', 'input[id^="city"]', function (e) {
  e.preventDefault();
  input.val(inpVal + $(this).attr('value'));
  city2 = $(this).text();
  $('#selected2').css('display', 'none');
});

const znak = ['overcast clouds', 'clear sky', 'few clouds', 'scattered clouds', 'broken clouds', 'shower rain', 'rain', 'thunderstorm', 'snow', 'mist', 'thunderstorm with light rain', 'thunderstorm with rain', 'thunderstorm with heavy rain', 'light thunderstorm', 'thunderstorm', 'heavy thunderstorm', 'ragged thunderstorm', 'thunderstorm with light drizzle', 'thunderstorm with drizzle', 'thunderstorm with heavy drizzle', 'light intensity drizzle', 'drizzle', 'heavy intensity drizzle', 'light intensity drizzle rain', 'drizzle rain', 'heavy intensity drizzle rain', 'shower rain and drizzle', 'heavy shower rain and drizzle', 'shower drizzle', 'light rain', 'moderate rain', 'heavy intensity rain', 'very heavy rain', 'extreme rain', 'freezing rain', 'light intensity shower rain', 'shower rain', 'heavy intensity shower rain', 'ragged shower rain', 'light snow', 'Snow', 'Heavy snow', 'Sleet', 'Light shower sleet', 'Shower sleet', 'Light rain and snow', 'Rain and snow', 'Light shower snow', 'Shower snow', 'Heavy shower snow'];

const znakUA = ['Затяжна хмарність', 'Чисте небо', 'Невелика хмарність', 'Мінлива хмарність', 'Хмарність', 'Зливовий дощ', 'Дощ', 'Гроза', 'Сніг', 'Туман', 'Гроза з невеликим дощем', 'Гроза з дощем', 'гроза з сильним дощем', 'Легка гроза', 'Гроза', 'Сильна гроза', 'Місцями гроза', 'гроза з легким дощем', 'гроза з дощем, що мрячить', 'гроза, сильно дрібний дощ', 'Слабка мряка', 'Мряка', 'Сильна мряка', 'Слабо дрібний дощ', 'дрібний дощ', 'Сильна мряка', 'Короткочасні зливи, мряка', 'Проливний короткочасний дощ, мряка', 'Щільна мряка', 'Невеликий дощ', 'Помірний дощ', 'Сильний дощ', 'Дуже сильний дощ', 'Злива', 'Крижаний дощ', 'Помірний дощ', 'Проливний дощ', 'Сильна злива', 'Змінний злива', 'Легкий снігопад', 'Сніг', 'Сильний снігопад', 'Мокрий сніг', 'невеликий дощ зі снігом', 'Сльота, дощ зі снігом', 'Легкий змінний дощ/ сніг', 'дощ зі снігом', 'невеликий снігопад', 'Безперервний снігопад', 'Рясний снігопад'];
$('#cityB').on('click', function () {
  $('#mapsShow').css('display', 'block');
  $('.p').css('display', 'block');
  $('#adress').css('display', 'block');
  $('#tablo').css('display', 'flex');
  $('#OUT1').css('display', 'block');
  $('#OUT11').css('display', 'block');
  city = $('#city').val();



  const apiURI2 = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=ua, uk&units=metric&appid=38028677a7eb67973cde15a8e4ebb13e`;
  $.ajax({
    url: apiURI2,
    dataType: "jsonp",
    type: "GET",
    async: "true",
    timeout: 500,
    success: function (data) {
      console.log("Success");
    },
    error: function (e) {
      console.log("Error");
      $('#cityC').html('<p style="color:red";>ERROR</p><p style="color:#bef7f1";>Перевірте коректність назви</p>');
      $('#tablo').css('display', 'none');
      $('#map2').css('display', 'none');
      $('#OUT1').css('display', 'none');
      $('#OUT11').css('display', 'none');
      $('.p').css('display', 'none');
      $('#adress').css('display', 'none');
    },
    done: function (e) {
      console.log("DONE");
    },
  }).done(dataHandler3), getWeather2();

  $('.text-center').css('display', 'block');

  $('#selected').text(city);
  $('#selected2').html('<p>(' + city2 + ')</p>');

  function getWeather2() {
    let city4 = $('#city').val();
    const apiURI4 = `https://api.openweathermap.org/data/2.5/weather?q=${city4}&units=metric&appid=38028677a7eb67973cde15a8e4ebb13e`;
    // console.log("success getWeather22");
    // console.log(apiURI4);
    return $.ajax({
      url: apiURI4,
      dataType: "jsonp",
      type: "GET",
      async: "true",
      timeout: 800,
    }).done(dataHandler2);
  }

  function dataHandler2(data) {
    dataString = JSON.stringify(data);
    let tempMode = Math.round(data.main.temp);
    let m4 = znak.indexOf(data.weather[0].description);
    if (data.main.temp && data.sys) {
      if (data.weather) {
        const imgURL = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
        document.getElementById("demo27").innerHTML = "Погода: " + " " + znakUA[m4];
        document.getElementById("demo125").innerHTML = "Температура: " + " " + tempMode + "°C";
        $("#tmp24").attr("src", imgURL);

      }
    }
  }

  function dataHandler3(data) {
    dataString = JSON.stringify(data);
    let now = new Date();
    let h = now.getHours();
    let num = 8 - (Math.floor(h / 3));
    const m = znak.indexOf(data.list[num + 5].weather[0]["description"]);
    const m1 = znak.indexOf(data.list[num + 13].weather[0]["description"]);
    const m2 = znak.indexOf(data.list[num + 21].weather[0]["description"]);
    const m3 = znak.indexOf(data.list[num + 29].weather[0]["description"]);
    const name = data.city.name;
    $('#cityC').text('в' + ' ' + name);
    //1 day
    document.getElementById("demo6").innerHTML = data.list[num + 5].dt_txt;
    document.getElementById("demo4").innerHTML = "Вдень" + " " + Math.floor(data.list[num + 5].main["temp"]) + "°C";
    document.getElementById("demo7").innerHTML = data.list[num + 1].dt_txt;
    document.getElementById("demo5").innerHTML = "Вночі" + " " + Math.floor(data.list[num + 1].main["temp"]) + "°C";
    let imgURL = "https://openweathermap.org/img/w/" + data.list[num + 5].weather[0].icon + ".png";
    $("#tmp4").attr("src", imgURL);
    $("#demo71").text(znakUA[m]);
    // console.log(data.list[num + 5].weather[0]["description"]);
    //2 day
    document.getElementById("demo8").innerHTML = data.list[num + 13].dt_txt;
    document.getElementById("demo9").innerHTML = "Вдень " + " " + Math.floor(data.list[num + 13].main["temp"]) + "°C";
    document.getElementById("demo10").innerHTML = data.list[num + 9].dt_txt;
    document.getElementById("demo11").innerHTML = "Вночі" + " " + Math.floor(data.list[num + 9].main["temp"]) + "°C";
    imgURL = "https://openweathermap.org/img/w/" + data.list[num + 13].weather[0].icon + ".png";
    $("#tmp5").attr("src", imgURL);
    $("#demo72").text(znakUA[m1]);
    //3 day
    document.getElementById("demo12").innerHTML = data.list[num + 21].dt_txt;
    document.getElementById("demo13").innerHTML = "Вдень" + " " + Math.floor(data.list[num + 21].main["temp"]) + "°C";
    document.getElementById("demo14").innerHTML = data.list[num + 17].dt_txt;
    document.getElementById("demo15").innerHTML = "Вночі" + " " + Math.floor(data.list[num + 17].main["temp"]) + "°C";
    imgURL = "https://openweathermap.org/img/w/" + data.list[num + 21].weather[0].icon + ".png";
    $("#tmp6").attr("src", imgURL);
    $("#demo73").text(znakUA[m2]);
    //4 day
    document.getElementById("demo16").innerHTML = data.list[num + 29].dt_txt;
    document.getElementById("demo17").innerHTML = "Вдень" + " " + Math.floor(data.list[num + 29].main["temp"]) + "°C";
    document.getElementById("demo18").innerHTML = data.list[num + 25].dt_txt;
    document.getElementById("demo19").innerHTML = "Вночі" + " " + Math.floor(data.list[num + 25].main["temp"]) + "°C";
    imgURL = "https://openweathermap.org/img/w/" + data.list[num + 29].weather[0].icon + ".png";
    $("#tmp7").attr("src", imgURL);
    $("#demo74").text(znakUA[m3]);
  }

});

function showDateTime() {
  const d = new Date();
  let ndate = d.getDay()
  let n1, n2, n3, n4;
  const weekday = new Array(7);
  weekday[0] = "Неділя";
  weekday[1] = "Понеділок";
  weekday[2] = "Вівторок";
  weekday[3] = "Середа";
  weekday[4] = "Четвер";
  weekday[5] = "П'ятница";
  weekday[6] = "Субота";
  
  if (ndate >= 3) {
    n1 = weekday[(ndate+ 1)];
    n2 = weekday[(ndate + 2)];
    n3 = weekday[(ndate + 3)];
    n4 = weekday[7 - (ndate + 4)];
  }
  if (ndate >= 4) {
    n1 = weekday[(ndate + 1)];
    n2 = weekday[(ndate + 2)];
    n3 = weekday[7 - (ndate + 3)];
    n4 = weekday[9 - (ndate + 4)];
  }
  if (ndate >= 5) {
    n1 = weekday[(ndate + 1)];
    n2 = weekday[7 - (ndate + 2)];
    n3 = weekday[9 - (ndate + 3)];
    n4 = weekday[11 - (ndate + 4)];
  }
  if (ndate >= 6) {
    n1 = weekday[7 - (ndate + 1)];
    n2 = weekday[9 - (ndate+ 2)];
    n3 = weekday[11 - (ndate + 3)];
    n4 = weekday[13 - (ndate + 4)];
  }
  if (ndate < 3) {
    n1 = weekday[(ndate+ 1)];
    n2 = weekday[(ndate + 2)];
    n3 = weekday[(ndate + 3)];
    n4 = weekday[(ndate + 4)];
  }
  for(let i =1; i<=4; i++){
    `document.getElementById("day${i}").innerHTML = n${i};`
  }
}


let $tempText = $("#temp-text");

function formatTemperature(kelvin) {

  const cels = (kelvin - 273.15).toFixed(1);
  $tempText.html(cels);
  if (cels > 24) {
    $("#temp-text").css("color", "red");
  } else if (cels < 18) {
    $("#temp-text").css("color", "blue");
  }
}

function dataHandler(data) {
  dataString = JSON.stringify(data);
  console.log(data.main.temp);
  formatTemperature(data.main.temp);
  if (data.main.temp && data.sys) {
    if (data.weather) {
      let imgURL = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
      $("#weatherImg").attr("src", imgURL);
      let k = znak.indexOf(data.weather[0].description);
      console.log(k);
      $("#weather-text").text(znakUA[k]);
    }
  }
}

function getWeather(locdata) {
  console.log("getWeather has been called.");
  var lat = locdata.latitude;
  var lon = locdata.longitude;

  var apiURI = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=38028677a7eb67973cde15a8e4ebb13e";

  console.log("success getWeather");
  console.log(apiURI);
  return $.ajax({
    url: apiURI,
    dataType: "jsonp",
    type: "GET",
    async: "true",
  }).done(dataHandler);
}