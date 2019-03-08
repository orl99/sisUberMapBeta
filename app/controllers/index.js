// DEPENDENCIES

var map = require('ti.map');
var permissions = require('permissions');

// List of map types to traverse, and our initial index
var mapTypes = [map.NORMAL_TYPE, map.SATELLITE_TYPE, map.HYBRID_TYPE];
var mapType = 0;

// Android has a fourth map type. We use conditional code, which Alloy automatically
// strips as dead code when it builds for other platforms.
if (OS_ANDROID) {
  mapTypes.push(map.TERRAIN_TYPE);
}

/**
 * self-executing function to organize otherwise inline constructor code
 * @param  {Object} args arguments passed to the controller
 */
(function(args) {

  // Use strict mode for this function scope. We can't do this for all of the
  // controller because after Alloy has compiled all of this file is wrapped.
  // FIXME: https://jira.appcelerator.org/browse/ALOY-1263
  'use strict';

  // Open the window. We didn't give it an id in the view, but it defaults to
  // the name of the controller/view.
  $.index.open();

})(arguments[0] || {});

/**
 * Bound to the Window's open event via XML.
 * Gets our current position and then continues the same process as when you
 * longpress somewhere on the map, which is reverseGeocode().
 */
function showCurrentPosition() {
  'use strict';

  // Use library to handle run-time permissions
  permissions.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE, function(e) {

    if (!e.success) {

      // In some cases the library will already have displayed a dialog, in other cases we receive a message to alert
      if (e.error) {
        alert(e.error);
      }

      return;
    }

    // Get our current position
    Ti.Geolocation.getCurrentPosition(function(e) {

      // FIXME: https://jira.appcelerator.org/browse/TIMOB-19071
      if (!e.success || e.error) {
        return alert(e.error || 'Could not find your position.');
      }

      // Continue the same process as when the user longpresses on the map,
      // passing `true` to let it center the map
      reverseGeocode(e.coords, true);
    });

  });
}

/**
 * Receives a position, reverse geocodes it and then calls setAnnotation()
 * @param  {Object}  coords            Event or other object that has:
 * @param  {Float}   coords.latitude   Latitude
 * @param  {Float}   coords.longitude  Longitude
 * @param  {boolean} center            Set to true to center the map on the position
 */
function reverseGeocode(coords, center) {
  'use strict';

  // Don't re-use coords since reverseGeocode() is also a callback for two
  // events in the view, which has other properties as well that we don't need.
  var location = {
    latitude: coords.latitude,
    longitude: coords.longitude
  };

  // Reverse geocode the position
  Ti.Geolocation.reverseGeocoder(location.latitude, location.longitude, function(e) {

    if (!e.success || e.error) {
      return alert(e.error || 'Could not reverse geocode the position.');
    }

    // Use the address of the first place found for the title
    location.title = e.places[0].address;

    // Drop or move the annotation
    // setAnnotation(location);

    // center the map on the annotation
    if (center) {
      centerMap(location);
    }
  });
}

/**
 * Adds the location to the collection, triggering data-binding to update the map.
 * @param  {Object}  location            Data for the model:
 * @param  {Float}   location.latitude   Latitude
 * @param  {Float}   location.longitude  Longitude
 * @param  {string}  location.title      Title
 */
function setAnnotation(location) {
  'use strict';

  // create the annotation
  var annotation = map.createAnnotation({
    title: location.title,
    subtitle: location.latitude + ', ' + location.longitude,
    latitude: location.latitude,
    longitude: location.longitude,
    draggable: true
  });

  // replace previous annotation
  $.map.setAnnotations([annotation]);
}

/**
 * Callback bound to the SearchView and SearchBar in the view. Forward geocodes an address
 * and uses addLocation() to add it to the collection, triggering data-binding for the UI.
 * @param  {Object} event Event
 */
function geocodeLocation(e) {
  'use strict';

  // Reference to the SearchView or SearchBar
  var source = e.source;

  // On iOS we have e.value, but on Android we don't. This always works.
  var address = source.value;

  // Forward geocode the address
  Ti.Geolocation.forwardGeocoder(address, function(e) {

    if (!e.success || e.error) {
      return alert(e.error || 'Could not geocode the location.');
    }

    if (OS_ANDROID) {

      // Collapse the ActionView, which also clears the value and hides the keyboard
      $.searchMenu.collapseActionView();

    } else {

      // Clear the value
      source.value = '';

      // Hide keyboard
      source.blur();
    }

    // Let addLocation() add it to the collection and update the UI
    setAnnotation({
      title: address,
      latitude: e.latitude,
      longitude: e.longitude
    });

    // Center the map on the location
    centerMap(e);
  });
}

/**
 * Callback bound to the button overlay to switch map types.
 */
function changeMapType() {

  // Increment our mapType index or move back to 0 if we reached the end
  mapType = (mapType === mapTypes.length - 1) ? 0 : mapType + 1;

  // Set it
  $.map.mapType = mapTypes[mapType];
}

/**
 * Center the map on a location.
 */
function centerMap(location) {
  $.map.region = {
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 7,
    longitudeDelta: 7
  };
}


/***
 * 
 * Orlando's Code Starts :3
 * 
 * Company: Sismov
 * 
 * 
 *   
 */

var domMap = $.map

var matrixAni = Ti.UI.create2DMatrix();


function changeAnotationValue(co){
  // Ti.API.info('co: ' + co)

  matrixAni = matrixAni.translate(100, 0);

  var carAnimation = Ti.UI.createAnimation({
      transform: matrixAni,
      duration: 2000
  });


  $.map.setAnnotations([dinamicAnotation, dinamicAnotation2])
  // dinamicAnotation2.animate(carAnimation);
  
  // dinamicAnotation2.latitude = multiCoords[co].latitude;
  // dinamicAnotation2.longitude =  multiCoords[co].longitude;

  // var nextWindow = Alloy.createController('secondView').getView();

  // nextWindow.open();
  
}


// var matrix2dAnimation = Ti.UI.create2DMatrix();
// matrix2dAnimation = matrix2dAnimation.rotate(20);
// matrix2dAnimation = matrix2dAnimation.scale(1.1);
// matrix2dAnimation = matrix2dAnimation.tranlate(50, -50)


// var aniA = Ti.UI.createAnimation({
//   transform: matrix2dAnimation,
//   duration: 3000,
//   // autoreverse: true,
// })

var dinamicAnotation = map.createAnnotation({
  latitude: 25.703531,
  longitude: -100.315530,
  title: "Anno 1",
  subtitle: "Subtitle 1", 
  markerAnimatesWhenAdded: true
  // image: '//images/sisUberCarBeta2.png'

});



var multiCoords = [ 
  {latitude: 25.703531, longitude: -100.315530}, 
  {latitude: 62.40, longitude: 23.420}, 
  {latitude: 53.40, longitude: 24.420}, 
  {latitude: 54.40, longitude: 25.420}, 
  {latitude: 55.40, longitude: 26.420}, 
  {latitude: 56.40, longitude: 27.420}, 
  {latitude: 57.40, longitude: 28.420}, 
  {latitude: 58.40, longitude: 29.420}, 
  {latitude: 59.40, longitude: 30.420}, 
  {latitude: 60.40, longitude: 31.420}
];

var newAutoAnnoView = Ti.UI.createView({
  width: 55,
  height: Ti.UI.SIZE,
  backgroundImage: '//images/sisUberCarBeta2.png'
})


var dinamicAnotation2 = map.createAnnotation({
  customView: newAutoAnnoView,
  latitude: 52.42,
  longitude: 13.205,
  title: "Anno 2",
  subtitle: "Subtitle 2",
  animate: true
  // showAsMarker: true
});

// $.map.setAnnotations([dinamicAnotation, dinamicAnotation2])

var i = 0;
// setInterval(function(){
//   Ti.API.info('SetInterval Init: ');
//   changeAnotationValue(i)

//     if(i >= multiCoords.length){
//       i = 0
//     }else{
//       i++;
//     }
// }, 4000)





//var points = [];

//Example code

// data = [];

  // var mainBetaRoute = {
  //   name: 'Example sisRoute Beta',
  //   points: points,
  //   color: "#c60000",
  //   width: 4
  // }


    // var url = "http://maps.google.com/?saddr=" 
    //         + origin + "&daddr=" 
    //         + destination + "&doflg=ptk&hl=en&output=kml"
    // xhr = Titanium.Network.createHTTPClient();
    // xhr.open('GET',url);
    // Ti.API.info('>>> go get data for Rgeocode! ...URL: '+url);
    // xhr.onload = function(){
    //     // Now parse the XML 
    //     var xml = this.responseXML;
    //      var points = [];
    //     var coords = xml.documentElement.getElementsByTagName("LineString");
    //     for(var cc=0; cc < coords.length; cc++) {
    //         var line = coords.item(cc);
    //         var str = line.firstChild.text.split(" ");
    //         for(dd = 0; dd < str.length; dd++) {
    //             var loc = str[dd].split(',');
    //             if(loc[0] && loc[1]) {
    //                 points.push({latitude: loc[1], 
    //                      longitude: loc[0]});
    //             }
    //         }
    //     }
    //     var route = {
    //             name:"boston",
    //             points:points,
    //             color:"red",
    //             width:4
    //         };

    //     // add a route
    //     map.addRoute(route);
    // };    
    // xhr.send();
    
//Example code ends


// domMap.addRoute(mainBetaRoute)