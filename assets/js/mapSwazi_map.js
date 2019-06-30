import {Map, View, inherits} from 'ol';

// layers
import VectorLayer from 'ol/layer/Vector';
import TileLayer from 'ol/layer/Tile';
import Image from 'ol/layer/Image';

// sources
import VectorSource from 'ol/source/Vector';
import taskMgrSource from './ol_source_taskMgr';
import XYZ from 'ol/source/XYZ';
import OSM from 'ol/source/OSM';

// formats
import GeoJSON from 'ol/format/GeoJSON';

// style
import Fill from 'ol/style/Fill';
import Style from 'ol/style/Style';

// controls & interactions
import {defaults as defaultsControl, FullScreen, OverviewMap} from 'ol/control';
import {defaults as defaultsInteraction} from 'ol/interaction';
import Select from 'ol/interaction/Select';

function mapSwazi_map(target, projects) {
    this.bounds = [3427637.922163467, -3163184.323967456,
                   3577228.0000320906, -2964196.586792509];

    this.projects = projects;

    // Layers
    var adm0 = new VectorSource({
            url: '/assets/data/adm0_eSwatini.geojson',
            format: new GeoJSON()
    });

    var lyrs = {
        hotosm: new TileLayer({
            source: new XYZ({
                url: "https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            })
        }),
        bounds_clip: new VectorLayer({
            source: adm0,
            renderMode: 'image',
            style: new Style({
                fill: new Fill({
                    color: 'white'
                })
            })
        }),
        swazi_bounds: new VectorLayer({
            source: adm0
        }),
        taskmgr: new VectorLayer({
            source: new taskMgrSource({
                projects: projects
            })
        })
    };

    // https://gis.stackexchange.com/questions/185881/clipping-tilelayer-with-georeferenced-polygon-clipping-mask/239136
    lyrs['bounds_clip'].on('precompose', function(e) {
        e.context.globalCompositeOperation = 'destination-in';
    });

    lyrs['bounds_clip'].on('postcompose', function(e) {
        e.context.globalCompositeOperation = 'source-over';
    });



    // event listeners
    var self = this;
    lyrs['taskmgr'].getSource().addEventListener('projects_loaded',
                                                 function(e) {
                                                     self.dispatchEvent({ type: 'projects_loaded' });
                                                 });

    // Initialize
    var call_opts = {
        target: target,
        layers: [
            lyrs.hotosm,
            lyrs.swazi_bounds,
            lyrs.taskmgr,
            lyrs.bounds_clip
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
