import {Map, View, inherits} from 'ol';
//import $ from 'jquery';

// layers
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

// controls
import {defaults as defaultsControl,
        FullScreen, OverviewMap} from 'ol/control';

// interactions
import {defaults as defaultsInteraction} from 'ol/interaction';
import Select from 'ol/interaction/Select';

// Swagger
import Swagger from 'swagger-client';
import taskmgr_api_spec from './taskmgr_spec_wicked_slim';

var p_map = function(opts) {

    this.opts = opts;
    this.num_projects = opts.projects.length;
    this.taskmgr_api = Swagger({spec: taskmgr_api_spec});

    // Initialize
    var call_opts = {
        layers: [
            new TileLayer({
                source: new OSM()
            })
        ],
        view: new View({
            center: [0, 0],
            zoom: 2
        }),
        interactions: defaultsInteraction(),
        controls: defaultsControl()
    };

    call_opts = Object.assign(call_opts, opts);

    Map.call(this, call_opts);

};

inherits(p_map, Map);
module.exports = p_map;
