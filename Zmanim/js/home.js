var loc = Windows.Devices.Geolocation.Geolocator();

function errorHandler() {
    
}

function getLocation() {
    try {
        loc.getGeopositionAsync().then(getPositionHandler, errorHandler);
    } catch (e) {
        // Catch Errors
        dateDisplay.innerText = e
    }
}

function getPositionHandler(pos) {
    Hebcal.defaultLocation = [pos.coordinate.latitude, pos.coordinate.longitude];
    displayZmanim();
}

function homePageReady() {
    getLocation();
}

function displayZmanim() {
    var hebDate = new Hebcal.HDate();
    dateDisplay.innerText = hebDate.toString();
    var zmanim = hebDate.getZemanim();
    chatzotDisplay.innerText = "Chatzot: " + zmanim.chatzot.getHours() + ":" + zmanim.chatzot.getMinutes();

    var zman
    for (zman in zmanim) {
        zmanimDisplay.innerHTML += "<br>" + zman + zmanim[zman].getHours() + ":" + zmanim[zman].getMinutes();
    }


    Microsoft.Maps.loadModule('Microsoft.Maps.Map', { callback: initMap, culture: "en-us", homeRegion: "US" });
    function initMap() {
        var map;

        var mapOptions =
        {
            credentials: bingMapKey,
            center: new Microsoft.Maps.Location(Hebcal.defaultLocation[0], Hebcal.defaultLocation[1]),
            zoom: 15,
            showDashboard: false,
            disablePanning: true,
            enableSearchLogo: false
        };

        map = new Microsoft.Maps.Map(document.getElementById("mapDiv"), mapOptions);
    }


//    var msgBox = new Windows.UI.Popups.MessageDialog(Hebcal.defaultLocation);
//    msgBox.showAsync();
}

(function () {
    WinJS.UI.Pages.define("/pages/home.html", {
        ready: function () {
            homePageReady();
        }
    });
})();