//W0443022
//Dylan Cunningham

// IIFE
(() => {



    //create map in leaflet and tie it to the div called 'theMap'
    let map = L.map('theMap').setView([44.650627, -63.597140], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

    //HFX bus system API
    const url = 'https://prog2700.onrender.com/hrmbuses'; 

    let markerLayer = L.layerGroup().addTo(map);



    // To display a window showing lat and long when user clicks on area of map 
    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(map);
    }
    map.on('click', onMapClick);


    var greenIcon = L.icon({
        iconUrl: 'leaf-green.png',
        shadowUrl: 'leaf-shadow.png',

        iconSize:   [38, 95], //icon size
        shadowSize: [50, 64],
        iconAnchor: [22,94],
        shadowAnchor: [4, 62],
        popupAnchor: [-3, -76]
    }); 

    //green leaf is my house
    L.marker([44.676625, -63.48263], {icon: greenIcon}).addTo(map);


    async function fetchBusData() {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            //for response object
            const json = await response.json();

            // We don't want all of the JSON info.. just the entity in question 
            let busJson = json.entity;

            //clear existing layer 
            markerLayer.clearLayers();

            //Num of buses currently in service
            console.log('There are currently ' + busJson.length + 'buses currently in service.');
            document.getElementById('busCount').innerHTML = "There are " + busJson.length + " buses currently in service."

            // Using map(), create new array containing only the data we wish to pull
            const markers = busJson.map(getPosID);

            function getPodID(eachBus) {
                //loop through array and pull the following info from
                let busId = eachBus.id;
                let busLat = eachBus.vehicle.position.latitude;
                let busLon = eachBus.vehicle.position.longitude;
                let bearing = eachBus.vehicle.position.bearing;
                let timestamp = eachBus.vehicle.position.bearing;

                //weird JS quirk -- multiply by 1 to convert to num
                let speed = Math.floor(eachBus.vehicle.position.speed * 1);

                //Define bus icon 
                var busIcon = L.icon({
                    iconUrl: './bus.png',
                    iconSize: [50, 51],
                    iconAnchor: [25, 26],
                    popupAnchor: [-3, -50]
                });

                //Create marker using Leaflet's built-in library. Feed it co-ordinates we got from API and bind popup to it. 
                //Bearing = vehicle property from API
                let marker = L.marker(
                    [busLat, busLon],
                    {icon: busIcon,
                    rotationAngle: bearing}).bindPopup("Bus ID: " + busId + "<br>Speed: " + speed + " km/h" + "<br>Bearing: " + bearing);
                    //adding markers to the layer instead of to the map individually
                    markerLayer.addLayer(marker);
            }
        } catch (error) {
            console.error('An unexpected error occurred:', error);
        }
    }


    //Refresh every _ seconds 

    window.addEventListener('load', function() {
        var fetchInterval = 9000;
        setInterval(fetchBusData, fetchInterval);
    });       
})();