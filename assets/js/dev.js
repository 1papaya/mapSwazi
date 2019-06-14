import Plyr from 'plyr';
import L from 'leaflet';

document.addEventListener("DOMContentLoaded", function() {
    //
    // Plyr
    //

    document.querySelectorAll('.youtube').forEach(function(yt) {
        new Plyr(yt, {});
    });

    //
    // Leaflet
    //

    var swazi_bounds = [[-27.317410, 30.790995], [-25.718006, 32.134785]];

    // Layers
    var lyrs = {
        osm: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }),
    };

    document.querySelectorAll('#tasks-map').forEach(function(map) {
        var map = L.map(map, {
            center: [-26.542227, 31.475928],
            zoom: 7,
            zoomSnap: 0,
            layers: [
                lyrs['osm']
            ]
        });

        map.fitBounds(swazi_bounds, {padding: [20, 20]});
    });

});

