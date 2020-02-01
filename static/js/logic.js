
<<<<<<< HEAD
function drawLines() {  //----------------------------------
	for (var  i= 0; i < data.length; i++) {

        var source = [data[i]["Takeoff_Latitude"], data[i]["Takeoff_Longitude"]];
        var destination = [data[i]["Target_Latitude"], data[i]["Target_Longitude"]];
        console.log(source, destination);

        // lay down color-coded markers for origin of attack
        L.circleMarker(source, {
            radius: 4,
            stroke: false,
            color: "green",
            fillOpacity: 1
        }).bindPopup(data[i]["Country"] + "<br>" + data[i]["Takeoff_Base"], {
                //offset: (0,0)
            })
            .addTo(myMap)
            .on('mouseover', function (e) {
                this.openPopup()
            .on('mouseout', function (e) {
                this.closePopup();
            });
        });
        
        // lay down gray markers for target
        L.circleMarker(destination, {
            radius: 10,
            stroke: false,
            color: "gray",
            fillOpacity: 0.3
        }).bindPopup(data[i]["Target_City"] + "<br>" + data[i]["Target_Country"])
            .addTo(myMap)
            .on('mouseover', function (e) {
                this.openPopup()
            .on('mouseout', function (e) {
                this.closePopup();
            });
        });

        // draw attack lines
	    L.polyline([source, destination], {
	    	snakingSpeed: 10,
    		color: colors(i),
    		weight: 1
    	}).addTo(myMap).snakeIn();
    };
} //--------------------------------------------------------

function colors(i) {

    if (data[i]["Country"] == "GREAT BRITAIN") {
        return "red"
    }   else if (data[i]["Country"] == "USA") {
        return "blue"
    }   else if (data[i]["Country"] == "NEW ZEALAND") {
        return "yellow"
    }   else if (data[i]["Country"] == "SOUTH AFRICA") {
        return "orange"    
    }   else {
        return "black"
    }

}
//static/data/WWIIops2.csv
var data;
Papa.parse("http://localhost:5000/WWII", {
    header: true,
    download: true,
    dynamicTyping: true,
    complete: function(results) {
        console.log(results);
        data = results.data;
        console.log(data);


        drawLines(); // Call function

    }
});
=======
// function colors(i) {

//     if (data[i]["Country"] == "GREAT BRITAIN") {
//         return "red"
//     }   else if (data[i]["Country"] == "USA") {
//         return "blue"
//     }   else if (data[i]["Country"] == "NEW ZEALAND") {
//         return "yellow"
//     }   else if (data[i]["Country"] == "SOUTH AFRICA") {
//         return "orange"    
//     }   else {
//         return "black"
//     }

// }
// return(data )
// var data;
// Papa.parse('static/data/WWIIops2.csv', {
//     header: true,
//     download: true,
//     dynamicTyping: true,
//     complete: function(results) {
//         console.log(results);
//         data = results.data;
//         //console.log(data);


//         drawLines(); // Call function

//     }
// });
>>>>>>> 9234c670039d707cb9dff93cd304614afe48c0e0

    //create base layers
// var baseMaps = {
// 	"World Map": layer0
	//"WW II 1939": baseMap1939
// };

    //create overlays
//var overlayMaps = {
    //Overlay1: overlay1
    //Overlay2: overlay2,
    //Markers: groupedMarkers
// };

// var myMap = L.map("map", {
//     center: [30,90],
//     zoom: 3,
//     layers: layer0  // change to [baseMaps, overlayMaps] show default layer
//     })
// ;

//     //add layer control
// L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
//     }).addTo(myMap) // add layer control to the map
// ;


function createMap(Markers) {

    var layer0 = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.dark",
        accessToken: API_KEY
    });//.addTo(myMap);
    
    var scale = L.control.scale(); // Creating scale control
             scale.addTo(myMap); // Adding scale control to the map
    
    var myMap = L.map("map", {
    center: [30,90],
    zoom: 3,
    layers: [layer0, Markers]  // change to [baseMaps, overlayMaps] show default layer
    })}
;
    // // Create a baseMaps object to hold the lightmap layer
    // var baseMaps = {
    //   "Light Map": lightmap
    // };
  
    // // Create an overlayMaps object to hold the bikeStations layer
    // var overlayMaps = {
    //   "Bike Stations": bikeStations
    // };
  
    // // Create the map object with options
    // var map = L.map("map-id", {
    //   center: [40.73, -74.0059],
    //   zoom: 12,
    //   layers: [lightmap, bikeStations]
    // });
  
    // // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    // L.control.layers(baseMaps, overlayMaps, {
    //   collapsed: false
    // }).addTo(map);
// }

// function createMarkers(response) {

//     // Pull the "stations" property off of response.data
//     var stations = response.data.stations;
  
//     // Initialize an array to hold bike markers
//     var bikeMarkers = [];
  
//     // Loop through the stations array
//     for (var index = 0; index < stations.length; index++) {
//       var station = stations[index];
  
//       // For each station, create a marker and bind a popup with the station's name
//       var bikeMarker = L.marker([station.lat, station.lon])
//         .bindPopup("<h3>" + station.name + "<h3><h3>Capacity: " + station.capacity + "<h3>");
  
//       // Add the marker to the bikeMarkers array
//       bikeMarkers.push(bikeMarker);
//     }
  
//     // Create a layer group made from the bike markers array, pass it into the createMap function
//     createMap(L.layerGroup(bikeMarkers));
// }

function drawLines(response) {  //----------------------------------

    var Orimarkers = [];
    var Desmarkers = [];
    var ODLine = [];

    for (var index =0; index <response.data.length; index++) {
      var Orimarker = L.circleMarker(response.data.Takeoff_Latitude,response.data.Takeoff_Latitude, {
        radius: 4,
        stroke: false,
        color: "green",
        fillOpacity: 1
    }).bindPopup(response.data.Country + "<br>" + response.data.Takeoff_Base)
        .addTo(myMap)
        .on('mouseover', function () {
            this.openPopup()
        .on('mouseout', function () {
            this.closePopup();
            });
        });

     Orimarkers.push(Orimarker);

     var Desmarker = L.circleMarker(response.data.Target_Latitude,response.data.Target_Latitude, {
        radius: 10,
        stroke: false,
        color: "gray",
        fillOpacity: 0.3
    }).bindPopup(response.data.Target_City + "<br>" + response.data.Target_Country)
        .addTo(myMap)
        .on('mouseover', function () {
            this.openPopup()
        .on('mouseout', function () {
            this.closePopup();
            });
        });

     Desmarkers.push(Desmarker);

     var Line = L.polyline([response.data.Takeoff_Latitude,response.data.Takeoff_Latitude,response.data.Target_Latitude,response.data.Target_Latitude], {
        snakingSpeed: 10,
        color: colors(i),
        weight: 1
    })
     
     ODLine.push(Line);
    }

    // L.polyline([source, destination], {
    //     snakingSpeed: 10,
    //     color: colors(i),
    //     weight: 1
    // }).addTo(myMap).snakeIn();

    createMap(L.layerGroup(Orimarkers));
    // createMap(L.layerGroup(Desmarkers));
    // createMap(L.layerGroup(ODLine));


} //--------------------------------------------------------


	// for (var  i= 0; i < data.length; i++) {

    //     var source = [data[i]["Takeoff Latitude"], data[i]["Takeoff Longitude"]];
    //     var destination = [data[i]["Target Latitude"], data[i]["Target Longitude"]];
    //     //console.log(source, destination);

        // // lay down color-coded markers for origin of attack
        // L.circleMarker(source, {
        //     radius: 4,
        //     stroke: false,
        //     color: "green",
        //     fillOpacity: 1
        // }).bindPopup(data[i]["Country"] + "<br>" + data[i]["Takeoff Base"], {
        //         //offset: (0,0)
        //     })
        //     .addTo(myMap)
        //     .on('mouseover', function (e) {
        //         this.openPopup()
        //     .on('mouseout', function (e) {
        //         this.closePopup();
        //     });
        // });
        
        // lay down gray markers for target
        // L.circleMarker(destination, {
        //     radius: 10,
        //     stroke: false,
        //     color: "gray",
        //     fillOpacity: 0.3
        // }).bindPopup(data[i]["Target City"] + "<br>" + data[i]["Target Country"])
        //     .addTo(myMap)
        //     .on('mouseover', function (e) {
        //         this.openPopup()
        //     .on('mouseout', function (e) {
        //         this.closePopup();
        //     });
        // });

        // draw attack lines
// 	    L.polyline([source, destination], {
// 	    	snakingSpeed: 10,
//     		color: colors(i),
//     		weight: 1
//     	}).addTo(myMap).snakeIn();
//     };
// } //--------------------------------------------------------


// function drawLines() {  //----------------------------------

// 	for (var  i= 0; i < data.length; i++) {

//         var source = [data[i]["Takeoff Latitude"], data[i]["Takeoff Longitude"]];
//         var destination = [data[i]["Target Latitude"], data[i]["Target Longitude"]];
//         //console.log(source, destination);

//         // lay down color-coded markers for origin of attack
//         L.circleMarker(source, {
//             radius: 4,
//             stroke: false,
//             color: "green",
//             fillOpacity: 1
//         }).bindPopup(data[i]["Country"] + "<br>" + data[i]["Takeoff Base"], {
//                 //offset: (0,0)
//             })
//             .addTo(myMap)
//             .on('mouseover', function (e) {
//                 this.openPopup()
//             .on('mouseout', function (e) {
//                 this.closePopup();
//             });
//         });
        
//         // lay down gray markers for target
//         L.circleMarker(destination, {
//             radius: 10,
//             stroke: false,
//             color: "gray",
//             fillOpacity: 0.3
//         }).bindPopup(data[i]["Target City"] + "<br>" + data[i]["Target Country"])
//             .addTo(myMap)
//             .on('mouseover', function (e) {
//                 this.openPopup()
//             .on('mouseout', function (e) {
//                 this.closePopup();
//             });
//         });

//         // draw attack lines
// 	    L.polyline([source, destination], {
// 	    	snakingSpeed: 10,
//     		color: colors(i),
//     		weight: 1
//     	}).addTo(myMap).snakeIn();
//     };
// } //--------------------------------------------------------


var queryUrl = "http://localhost:5000/WWII"

d3.json(queryUrl,function(data) {
    // Once we get a response, send the data.features object to the createFeatures function
    drawLines(data);
});


