import {Map, View, inherits} from 'ol';

// layers
import lyrs from '../layers';
import VectorLayer from 'ol/layer/Vector';
import TaskMgrSource from '../source/TaskMgr';

// controls & interactions
import {defaults as defaultsControl, FullScreen, OverviewMap} from 'ol/control';
import {defaults as defaultsInteraction} from 'ol/interaction';
import Select from 'ol/interaction/Select';

function overview_map(target, projects) {
    this.bounds = [3427637.922163467, -3163184.323967456,
                   3577228.0000320906, -2964196.586792509];

    this.projects = projects;

    // build taskmgr
    var taskMgr = new VectorLayer({
        source: new TaskMgrSource({
            projects: projects
        })
    });

    var self = this;
    taskMgr.getSource().addEventListener('projects_loaded',
                                         function(e) {
                                             self.dispatchEvent({ type: 'projects_loaded' });
                                         });

    // Initialize
    var call_opts = {
        target: target,
        layers: [
            lyrs.hotosm,
            lyrs.swazi_bounds,
            taskMgr,
            lyrs.bounds_clip
        ],
        view: this.get_fitted_view(target, this.bounds),
        interactions: defaultsInteraction(),
        controls: defaultsControl()
    };

    Map.call(this, call_opts);
};

inherits(overview_map, Map);

overview_map.prototype.get_fitted_view = function(target, bounds, padding=10) {
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


module.exports = overview_map;
