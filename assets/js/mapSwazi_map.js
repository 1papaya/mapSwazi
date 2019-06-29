import {Map, View, inherits} from 'ol';

// layers
import VectorLayer from 'ol/layer/Vector';
import TileLayer from 'ol/layer/Tile';

// sources
import VectorSource from 'ol/source/Vector';
import taskMgrSource from './ol_source_taskMgr';
import OSM from 'ol/source/OSM';

// formats
import GeoJSON from 'ol/format/GeoJSON';

// controls & interactions
import {defaults as defaultsControl, FullScreen, OverviewMap} from 'ol/control';
import {defaults as defaultsInteraction} from 'ol/interaction';
import Select from 'ol/interaction/Select';

function mapSwazi_map(target, projects) {

    this.bounds = [3427637.922163467, -3163184.323967456,
                   3577228.0000320906, -2964196.586792509];

    this.projects = projects;

    // Layers
    var lyrs = {
        osm: new TileLayer({
            source: new OSM()
        }),
        swazi_bounds: new VectorLayer({
            source: new VectorSource({
                url: '/assets/data/adm0_eSwatini.geojson',
                format: new GeoJSON()
            })
        }),
        taskmgr: new VectorLayer({
            source: new taskMgrSource({
                projects: projects
            })
        })
    };

    // event listeners
    lyrs['taskmgr'].getSource().addEventListener('project_loaded', function(e) {console.log(["LOADED", e])});
    lyrs['taskmgr'].getSource().addEventListener('projects_loaded', function(e) {console.log(["ALL LOADED", e])});

    // Initialize
    var call_opts = {
        target: target,
        layers: [
            lyrs.osm,
            lyrs.swazi_bounds,
            lyrs.taskmgr
        ],
        view: this.get_fitted_view(target, this.bounds),
        interactions: defaultsInteraction(),
        controls: defaultsControl()
    };

    Map.call(this, call_opts);
};

inherits(mapSwazi_map, Map);

mapSwazi_map.prototype.get_fitted_view = function(target, bounds, padding=10) {
    var view = new View({
        extent: bounds
    });

    view.fit(bounds, {
        size: [target.offsetHeight, target.offsetWidth],
        padding: [padding, padding, padding, padding],
        constrainResolution: false
    });

    view.setMinZoom(view.getZoom());

    return view;
};


module.exports = mapSwazi_map;
