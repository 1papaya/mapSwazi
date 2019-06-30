import {Map, View, inherits} from 'ol';

// views
import {SwaziView, LayerView} from '../views';

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
        name: "project",
        source: new TaskMgrSource({
            projects: [project]
        })
    });

    var self = this;
    taskMgr.getSource().addEventListener('projects_loaded',
                                         function(e) {
                                             var p_lyr = self.getLayerByName("project");
                                             var p_el = self.getTargetElement();

                                             var p_view = new LayerView(p_lyr, p_el);
                                             self.getView().animate({
                                                 center: p_view.getCenter(),
                                                 zoom: p_view.getZoom(),
                                                 duration: 2000
                                             });
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

project_map.prototype.getLayerByName = function(name) {
    var lyr = false;

    this.getLayers().forEach(function(l) {
        if (l.get("name") == name)
            lyr = l;
    });

    return lyr;
}

module.exports = project_map;
