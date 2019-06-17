import mapSwazi_map from "./mapSwazi_map";

document.addEventListener("DOMContentLoaded", function() {

    //
    // Projects map
    //

    document.querySelectorAll("#projects-map").forEach(function(pm) {

        window.mapSwazi_map = new mapSwazi_map(pm, []);
    });

});
