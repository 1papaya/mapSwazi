import p_map from "./projects_map";

document.addEventListener("DOMContentLoaded", function() {

    //
    // Projects map
    //

    document.querySelectorAll("#projects-map").forEach(function(pm) {
        new p_map({
            target: pm,
            projects: []
        });
    });

    var swazi_bounds = [[-27.317410, 30.790995], [-25.718006, 32.134785]];

});
