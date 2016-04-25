$(document).ready(function() {

    $.getJSON('http://localhost:8080/topspots.json',
        function(data) {
            var tbody = $("<tbody />"),
                tr;
            /*var button = $(' <button type="button" class="btn btn-primary" />');*/
            $.each(data, function(index, jsonObject) {
                tr = $("<tr />");

                $.each(jsonObject, function(key, val) {
                    if (key === "location") {
                        tr.append('<td><a href=\"https://www.google.com/maps?q=' + val + '\"><button type="button" class="btn btn-primary">Open in Google Maps</button></td>');

                    } else {
                        tr.append('<td>' + val + '</td>');
                    }
                });
                tr.appendTo(tbody);
            });
            tbody.appendTo(".table");
        });

    //map jquery 
    var locations = [];
    var position;
    var lat;
    var lng;

    $("#mapbutton").click(function() {
        $("#map").css("box-shadow", "10px 10px 5px #888888");
        $("#mapouter").fadeToggle("fast", "linear", function() {
            // Animation complete.

            $.getJSON("http://localhost:8080/topspots.json", function(data) {
                $.each(data, function(index, jsonObject) {
                        $.each(jsonObject, function(key, value) {
                            position = jsonObject[Object.keys(jsonObject)[2]];
                            lat = position[0];
                            lng = position[1];
                            name = jsonObject[Object.keys(jsonObject)[0]];
                            var indArr = [name, lat, lng];
                            locations.push(indArr);
                        });
                    })
                    /*    type = locations[4][0];                  
                    $("#map").after('<div><p>' + type +'</p></div>');*/

                var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 10,
                    center: new google.maps.LatLng(32.692083, -117.181392),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });

                var infowindow = new google.maps.InfoWindow();

                var marker, i;

                for (i = 0; i < locations.length; i++) {
                    marker = new google.maps.Marker({
                        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                        map: map
                    });

                    google.maps.event.addListener(marker, 'click', (function(marker, i) {
                        return function() {
                            infowindow.setContent(locations[i][0]);
                            infowindow.open(map, marker);
                        }
                    })(marker, i));
                }

            });

        });

    });

    $("#map").draggable();





}); //ready end
/*$.getJSON("topspots1.json", function(data) {
    $.each(data, function(i,obj) {
    $(".row").append("<p>" + obj[i].name"</p>");
});*/

/*      for(var i = 0; i < data.length; i++) {
        var openDiv = '<div class="row">';
        var closeDiv = '</div>';
        $('.table').append(openDiv);
         for (var j = 0; j < data[i].length; i++) {

            tr.append("<div>" + data[i].name + "</div>");
            tr.append("<div>" + data[i].description + "</div>");
            tr.append("<div>" + data[i].location + "</div>");
            $('table').append(closeDiv);
        }
    }
})*/
