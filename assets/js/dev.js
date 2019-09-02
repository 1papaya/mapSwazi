import overview_map from "./map/overview";
import project_map from "./map/project";

document.addEventListener("DOMContentLoaded", function() {

    window.overview_maps = [];
    window.project_maps = [];

    // Overview map
    //

    document.querySelectorAll(".overview-map").forEach(function(om) {
        var projs = JSON.parse(om.dataset.projects);
        var o_map = new overview_map(om, projs);

        o_map.addEventListener('projects_loaded', function() {
        });

        window.overview_maps.push(o_map);
    });

    // Projects maps
    //


    document.querySelectorAll(".project-map").forEach(function(pm) {
        var p_map = new project_map(pm, pm.dataset.project);

        window.project_maps.push(p_map);
    });

});
