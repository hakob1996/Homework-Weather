var search = $("#search");
var btn = $("#searchBtn");
var main = $("#main");
var date = new Date();
var cityList = $("#cityList");
var homebtn = $("#home"); 
var currentDate = date.toLocaleDateString();
var cityArr = [];

//5 days
var box1 = $('#box1');
var box2 = $('#box2');
var box3 = $('#box3');
var box4 = $('#box4');
var box5 = $('#box5');


function geoFindMe() {

    const status = document.querySelector('#status');
    const mapLink = document.querySelector('#map-link');
  
    mapLink.href = '';
    mapLink.textContent = '';
  
    function success(position) {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;
  
      status.textContent = '';
      mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
      mapLink.textContent = ` ${latitude}  ${longitude} `;
      var currentLoc = "http://api.openweathermap.org/data/2.5/weather?appid=e36819190b77325aed260ffeaa672f41&lat=" + `${latitude}` +"&lon=" + `${longitude}` +"&units=imperial";
      mapLink.textContent="";
        
        $.ajax({
            url: currentLoc,
            method: "GET"
        }).then(function (response){
            var h1 = $("<h1>");
        h1.text(response.name + "(" + currentDate + ")");
        main.append(h1);
        var br1 = $("<br>");
        main.append(br1);
        var temEl = $("<h4>");
        temEl.text("Temperature: " + response.main.temp + " °F");
        main.append(temEl);
        var br2 = $("<br>");
        main.append(br2);
        var humEl = $("<h4>");
        humEl.text("Humidity: " + response.main.humidity + " %");
        main.append(humEl);
        var br3 = $("<br>");
        main.append(br3);
        var windEl = $("<h4>");
        windEl.text("Wind speed: " + response.wind.speed + " MPH");
        main.append(windEl);
        var br4 = $("<br>");
        main.append(br4);   
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        var UVindexURL = "https://api.openweathermap.org/data/2.5/uvi?appid=e36819190b77325aed260ffeaa672f41&lat=" + lat +"&lon=" + lon +"&units=imperial";
   
        
        $.ajax({
            url: UVindexURL,
            method: "GET"
        }).then(function (response){
            var UVindex = $("<h4>");
            UVindex.text("UV Index: " + response.value );
            main.append(UVindex);
        });
        var fdaysURL = "https://api.openweathermap.org/data/2.5/forecast?id="+response.id+"&appid=e36819190b77325aed260ffeaa672f41&units=imperial";
        $.ajax({
         url: fdaysURL,
         method: "GET"
     }).then(function (response){
         console.log(response);
         //box1
         var h5el = $("<h5>");
         h5el.text(currentDate);
         box1.append(h5el);
         var pic1= "https://openweathermap.org/img/w/" + response.list[0].weather[0].icon + ".png"
         box1.append("<img src=" + pic1 + ">");
         var temp1 = $("<h6>").text("Temp: " + response.list[0].main.temp + " °F");
         box1.append(temp1);
         var hum1 = $("<h6>").text("Humidity: " + response.list[0].main.humidity + " %");
         box1.append(hum1);
         //box2
         var box2date = new Date();
         box2date.setDate(box2date.getDate() + 1);
         var day2 = box2date.toLocaleDateString();
         var h5el1 = $("<h5>");
         h5el1.text(day2);
         box2.append(h5el1);
         var pic2= "https://openweathermap.org/img/w/" + response.list[8].weather[0].icon + ".png"
         box2.append("<img src=" + pic2 + ">");
         var temp2 = $("<h6>").text("Temp: " + response.list[8].main.temp + " °F");
         box2.append(temp2);
         var hum2 = $("<h6>").text("Humidity: " + response.list[8].main.humidity + " %");
         box2.append(hum2);
         //box3
         var box3date = new Date();
         box3date.setDate(box3date.getDate() + 2);
         var day3 = box3date.toLocaleDateString();
         var h5el2 = $("<h5>");
         h5el2.text(day3);
         box3.append(h5el2);
         var pic3= "https://openweathermap.org/img/w/" + response.list[16].weather[0].icon + ".png"
         box3.append("<img src=" + pic3 + ">");
         var temp3 = $("<h6>").text("Temp: " + response.list[16].main.temp + " °F");
         box3.append(temp3);
         var hum3 = $("<h6>").text("Humidity: " + response.list[16].main.humidity + " %");
         box3.append(hum3);
        //box4
         var box4date = new Date();
         box4date.setDate(box4date.getDate() + 3);
         var day4 = box4date.toLocaleDateString();
         var h5el3 = $("<h5>");
         h5el3.text(day4);
         box4.append(h5el3);
         var pic4= "https://openweathermap.org/img/w/" + response.list[24].weather[0].icon + ".png"
         box4.append("<img src=" + pic4 + ">");
         var temp4 = $("<h6>").text("Temp: " + response.list[24].main.temp + " °F");
         box4.append(temp4);
         var hum4 = $("<h6>").text("Humidity: " + response.list[24].main.humidity + " %");
         box4.append(hum4);
        //box5
        var box5date = new Date();
        box5date.setDate(box5date.getDate() + 4);
        var day5 = box5date.toLocaleDateString();
        var h5el4 = $("<h5>");
        h5el4.text(day5);
        box5.append(h5el4);
        var pic5= "https://openweathermap.org/img/w/" + response.list[32].weather[0].icon + ".png"
        box5.append("<img src=" + pic5 + ">");
        var temp5 = $("<h6>").text("Temp: " + response.list[32].main.temp + " °F");
        box5.append(temp5);
        var hum5 = $("<h6>").text("Humidity: " + response.list[32].main.humidity + " %");
        box5.append(hum5);
     });
     
     });
        
    }
  
    function error() {
      status.textContent = 'Unable to retrieve your location';
    }
  
    if (!navigator.geolocation) {
      status.textContent = 'Geolocation is not supported by your browser';
    } else {
      status.textContent = 'Locating…';
      navigator.geolocation.getCurrentPosition(success, error);
    }
  
  }
  
  geoFindMe();
  
for(var i=0; i<cityArr.length; i++){
    var iUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityArr[i] + "&APPID=e36819190b77325aed260ffeaa672f41&units=imperial";
    $.ajax({
        url: iUrl,
        method: "GET"
    }).then(function (response){
        var listEl = $("<p>");
        listEl.text(response.name);
        cityList.append(listEl);

    });
   

}

    


btn.on("click", function(event) {
    event.preventDefault();
    main.empty();
    $(".fdays").empty();


    var cityName = search.val();
    cityArr.push(cityName);
    search.val("");
    // cityArr.shift();
    cityList.empty();
    if(cityName === ""){
       return 
    }
    
    for(var i=0; i<cityArr.length; i++){

        var iUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityArr[i] + "&APPID=e36819190b77325aed260ffeaa672f41&units=imperial";
        $.ajax({
            url: iUrl,
            method: "GET"
        }).then(function (response){
            var listEl = $("<p>");
            listEl.text(response.name);
            cityList.prepend(listEl);
            
    
        });
        
       
    
    }
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=e36819190b77325aed260ffeaa672f41&units=imperial";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var h1 = $("<h1>");
        h1.text(response.name + "(" + currentDate + ")");
        main.append(h1);
        var br1 = $("<br>");
        main.append(br1);
        var temEl = $("<h4>");
        temEl.text("Temperature: " + response.main.temp + " °F");
        main.append(temEl);
        var br2 = $("<br>");
        main.append(br2);
        var humEl = $("<h4>");
        humEl.text("Humidity: " + response.main.humidity + " %");
        main.append(humEl);
        var br3 = $("<br>");
        main.append(br3);
        var windEl = $("<h4>");
        windEl.text("Wind speed: " + response.wind.speed + " MPH");
        main.append(windEl);
        var br4 = $("<br>");
        main.append(br4);   
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        var UVindexURL = "https://api.openweathermap.org/data/2.5/uvi?appid=e36819190b77325aed260ffeaa672f41&lat=" + lat +"&lon=" + lon + "&units=imperial";
   
        
        $.ajax({
            url: UVindexURL,
            method: "GET"
        }).then(function (response){
            var UVindex = $("<h4>");
            UVindex.text("UV Index: " + response.value );
            main.append(UVindex);
        });
       
       
        var fdaysURL = "https://api.openweathermap.org/data/2.5/forecast?id="+response.id+"&appid=e36819190b77325aed260ffeaa672f41&units=imperial";
        $.ajax({
         url: fdaysURL,
         method: "GET"
     }).then(function (response){
         console.log(response);
         //box1
         var h5el = $("<h5>");
         h5el.text(currentDate);
         box1.append(h5el);
         var pic1= "https://openweathermap.org/img/w/" + response.list[0].weather[0].icon + ".png"
         box1.append("<img src=" + pic1 + ">");
         var temp1 = $("<h6>").text("Temp: " + response.list[0].main.temp + " °F");
         box1.append(temp1);
         var hum1 = $("<h6>").text("Humidity: " + response.list[0].main.humidity + " %");
         box1.append(hum1);
         //box2
         var box2date = new Date();
         box2date.setDate(box2date.getDate() + 1);
         var day2 = box2date.toLocaleDateString();
         var h5el1 = $("<h5>");
         h5el1.text(day2);
         box2.append(h5el1);
         var pic2= "https://openweathermap.org/img/w/" + response.list[8].weather[0].icon + ".png"
         box2.append("<img src=" + pic2 + ">");
         var temp2 = $("<h6>").text("Temp: " + response.list[8].main.temp + " °F");
         box2.append(temp2);
         var hum2 = $("<h6>").text("Humidity: " + response.list[8].main.humidity + " %");
         box2.append(hum2);
         //box3
         var box3date = new Date();
         box3date.setDate(box3date.getDate() + 2);
         var day3 = box3date.toLocaleDateString();
         var h5el2 = $("<h5>");
         h5el2.text(day3);
         box3.append(h5el2);
         var pic3= "https://openweathermap.org/img/w/" + response.list[16].weather[0].icon + ".png"
         box3.append("<img src=" + pic3 + ">");
         var temp3 = $("<h6>").text("Temp: " + response.list[16].main.temp + " °F");
         box3.append(temp3);
         var hum3 = $("<h6>").text("Humidity: " + response.list[16].main.humidity + " %");
         box3.append(hum3);
        //box4
         var box4date = new Date();
         box4date.setDate(box4date.getDate() + 3);
         var day4 = box4date.toLocaleDateString();
         var h5el3 = $("<h5>");
         h5el3.text(day4);
         box4.append(h5el3);
         var pic4= "https://openweathermap.org/img/w/" + response.list[24].weather[0].icon + ".png"
         box4.append("<img src=" + pic4 + ">");
         var temp4 = $("<h6>").text("Temp: " + response.list[24].main.temp + " °F");
         box4.append(temp4);
         var hum4 = $("<h6>").text("Humidity: " + response.list[24].main.humidity + " %");
         box4.append(hum4);
        //box5
        var box5date = new Date();
        box5date.setDate(box5date.getDate() + 4);
        var day5 = box5date.toLocaleDateString();
        var h5el4 = $("<h5>");
        h5el4.text(day5);
        box5.append(h5el4);
        var pic5= "https://openweathermap.org/img/w/" + response.list[32].weather[0].icon + ".png"
        box5.append("<img src=" + pic5 + ">");
        var temp5 = $("<h6>").text("Temp: " + response.list[32].main.temp + " °F");
        box5.append(temp5);
        var hum5 = $("<h6>").text("Humidity: " + response.list[32].main.humidity + " %");
        box5.append(hum5);
     });
     
     });
     
     homebtn.on("click", function() {
         location.reload();
         
     });
     

    });

   

