var http = require("http");
var h3 = require("h3-js");

//create a server object:
http
  .createServer(function (req, res) {
    //res.write("Hello World!"); //write a response to the client

    var bbox = [
      [-51.23738278645691, -29.95395752495125],
      [-51.08603877335902, -29.960978037475112],
      [-51.07886843744893, -30.083174660583403],
      [-51.263629314591135, -30.098910088603375]
    ];

    var hexagons = h3.polyfill(bbox, 8, true);

    var geojson = {
      type: "Feature",
      geometry: {
        type: "MultiPolygon",
        coordinates: hexagons.map(function toBoundary(hex) {
          return [h3.h3ToGeoBoundary(hex, true)];
        })
      }
    };

    console.log(JSON.stringify(geojson));
    res.write(JSON.stringify(geojson));

    res.end(); //end the response
  })
  .listen(8080); //the server object listens on port 8080
