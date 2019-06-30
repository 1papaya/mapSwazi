import overview_map from "./map/overview";

document.addEventListener("DOMContentLoaded", function() {

    //
    // Projects map
    //

    document.querySelectorAll("#projects-map").forEach(function(pm) {

        window.overview_map = new overview_map(pm, []);

        window.overview_map.addEventListener('projects_loaded', function() {
            console.log("PROJECTS ALL LOADED SKO BUFFS");
        });
    });

});
