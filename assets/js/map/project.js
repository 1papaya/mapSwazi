import {Map, View, inherits} from 'ol';

// views
import {SwaziView, LayerView} from '../views';

// layers
import lyrs from '../layers';
import VectorLayer from 'ol/layer/Vector';
import TaskMgrSource from '../source/TaskMgr';

// styles
import stys from '../styles';

// controls & interactions
import {defaults as defaultsControl, FullScreen, OverviewMap} from 'ol/control';
import {defaults as defaultsInteraction} from 'ol/interaction';
import Select from 'ol/interaction/Select';
import {click, pointerMove} from 'ol/events/condition';

function project_map(target, project) {

    // Layers
    var taskMgr = new VectorLayer({
        name: "project",
        source: new TaskMgrSource({
            projects: [project]
        }),
        style: stys.taskmgr
    });

    // Interactions
    var select_task = new Select({
        condition: click,
        layers: [taskMgr]
    });

    select_task.on('select', function(e) {
        console.log(e);
        var p_id = e.target.getMap().get('project_id');
        var t_id = e.selected[0].get('taskId');

        var url = "https://tasks.hotosm.org/project/" + p_id + "?task=" + t_id;

        window.open(url, "_blank");
    });

    var hover_task = new Select({
        condition: pointerMove,
        layers: [taskMgr]
    });

    // Zoom to tasking layer on load
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
        project_id: project,
        target: target,
        layers: [
            lyrs.hotosm,
            taskMgr,
            lyrs.bounds_clip
        ],
        view: new SwaziView(target),
        interactions: defaultsInteraction().extend([select_task, hover_task]),
        controls: defaultsControl()
    };

    Map.call(this, call_opts);
    this.set("project_id", project);
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
