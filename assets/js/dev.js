import mapSwazi_map from "./mapSwazi_map";

document.addEventListener("DOMContentLoaded", function() {

    //
    // Projects map
    //

    document.querySelectorAll("#projects-map").forEach(function(pm) {

        window.mapSwazi_map = new mapSwazi_map(pm, [6209]);

        window.mapSwazi_map.addEventListener('projects_loaded', function() {
            console.log("PROJECTS ALL LOADED SKO BUFFS");
        });
    });

});
