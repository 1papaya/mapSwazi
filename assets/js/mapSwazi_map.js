import {Map, View, inherits} from 'ol';

import lyrs from './mapSwazi_layers';

// controls
import {defaults as defaultsControl,
        FullScreen, OverviewMap} from 'ol/control';

// interactions
import {defaults as defaultsInteraction} from 'ol/interaction';
import Select from 'ol/interaction/Select';

// Swagger
import Swagger from 'swagger-client';
import taskmgr_api_spec from './taskmgr_spec_wicked_slim';

function mapSwazi_map(target, projects) {

    this.bounds = [3427637.922163467, -3163184.323967456,
                   3577228.0000320906, -2964196.586792509];
    this.taskmgr_api = Swagger({spec: taskmgr_api_spec});

    // Initialize
    var call_opts = {
        target: target,
        layers: [
            lyrs.osm,
            lyrs.swazi_bounds
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
