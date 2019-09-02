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

    // Bulma Hamburger
    //


    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach( el => {
            el.addEventListener('click', () => {

                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');

            });
        });
    }
});
