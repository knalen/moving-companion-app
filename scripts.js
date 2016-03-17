function dataLoad() {
    var picture = $("#picture");
    var wikiElem = $("#wikipedia-links");
    var weather = $("#weather");
    var greeting = $("#greeting");
    
    
//clear out any old data before a new request
picture.text("");    
wikiElem.text("");
weather.text("");
    
//load the StreetView image
    
    var street = $("#street").val();
    var city = $("#city").val();
    var address = street + ", " + city;
    var size = "350x400";
    var streetViewURL = "https://maps.googleapis.com/maps/api/streetview?size=" + size + "&location=" + address + "";
    picture.append("<img class='locimg' src='" + streetViewURL + "'>");
    
// access wikipedia articles
    
    var wikiURL = "http://en.wikipedia.org/w/api.php?action=opensearch&search=" + city + "&format=json&callback=wikiCallback";
    var errorWiki = setTimeout(function () {
        wikiElem.text("Cannot retrieve Wikipedia links");
    }, 5000);
    
    $.ajax({
        url: wikiURL,
        dataType: "jsonp",
        //jsonp callback
        success: function(response) {
            var articleList = response[1];
            for (var i = 0; i < articleList.length; i++) {
                articleStr = articleList[i];
                var url = "http://en.wikipedia.org/wiki/" + articleStr;
                wikiElem.append('<li><a href="' + url + '">'+ articleStr + "</a></li>")
            }
            clearTimeout(errorWiki);
        }
    })
    
//weather api 
    
    var weatherURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=326c7cea29dd4ea915754dc600389e5d";
    $.ajax({
        method: "GET",
        url: weatherURL,
        dataType: "jsonp",
        success: function(data) {
            console.log(data);
            var temperature = Math.round(data.main.temp);
            console.log(temperature);
            console.log(city);
            weather.append("<p>Currently, the temperature is " + temperature + " degrees Celsius" + "</p>")
        }
    })
        
    return false;
}

$("#form-container").submit(dataLoad);