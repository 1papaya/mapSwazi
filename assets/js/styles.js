import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';

//
// Taskmgr styles

var statuses = {
    "READY": [255,0,0,0],
    "MAPPED": [255, 198, 12, 0.4],
    "LOCKED": [18, 89, 240, 0.4],
    "VALIDATED": [0, 128, 0, 0.4]
};

var taskmgr_sty = new Style({
    fill: new Fill({
        color: [255,255,255,0.5]
    }),
    stroke: new Stroke({
        color: [100,100,100,0.6],
        width: 1
    })
});

var taskmgr_fn = function(feature, resolution) {
    var status = feature.get("taskStatus");
    console.log(feature);

    if (status in statuses) {
        taskmgr_sty.setFill(new Fill({
            color: statuses[status]
        }));
    }

    return [taskmgr_sty];
};

module.exports = {
    taskmgr: taskmgr_fn
};
