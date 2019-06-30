import {Map, View, inherits} from 'ol';

// views
import {SwaziView} from '../views';

// layers
import lyrs from '../layers';
import VectorLayer from 'ol/layer/Vector';
import TaskMgrSource from '../source/TaskMgr';

// controls & interactions
import {defaults as defaultsControl, FullScreen, OverviewMap} from 'ol/control';
import {defaults as defaultsInteraction} from 'ol/interaction';
import Select from 'ol/interaction/Select';

function project_map(target, project) {

    console.log([target, project]);
    // Layers
    var taskMgr = new VectorLayer({
        source: new TaskMgrSource({
            projects: [project]
        })
    });

    var self = this;
    taskMgr.getSource().addEventListener('projects_loaded',
                                         function(e) {
                                             //self.dispatchEvent({ type: 'projects_loaded' });
                                         });

    // Initialize
    var call_opts = {
        target: target,
        layers: [
            lyrs.hotosm,
            taskMgr,
            lyrs.bounds_clip
        ],
        view: new SwaziView(target),
        interactions: defaultsInteraction(),
        controls: defaultsControl()
    };

    Map.call(this, call_opts);
};

inherits(project_map, Map);

module.exports = project_map;
