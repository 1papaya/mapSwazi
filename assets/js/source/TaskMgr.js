// ol
import {inherits} from 'ol';
import ol_format_GeoJSON from 'ol/format/GeoJSON';
import ol_source_Vector from 'ol/source/Vector';

// Swagger
import Swagger from 'swagger-client';
import taskMgr_api_spec from '../../../_data/taskmgr_spec_slim';

var ol_source_taskMgr = function(opts) {
    this.projects = opts.projects || [];

    opts.loader = this._loader;

    this.api = Swagger({
        spec: taskMgr_api_spec
    }).client;

    ol_source_Vector.call(this, opts);
};

inherits(ol_source_taskMgr, ol_source_Vector);

ol_source_taskMgr.prototype._loader = function(extent, resolution, projection) {

    this._projects_loaded = 0;
    var p_data = [];

    for (const proj of this.projects) {
        var self = this;

        this.api.apis.mapping.get_api_v1_project__project_id_({
            "as_file": false,
            "abbreviated": true,
            "project_id": proj,
            "Accept-Language": "en"
        }).then((p_data) => {
            self._project_loaded(p_data, projection);
        });
    }
};

ol_source_taskMgr.prototype._project_loaded = function(p_data, projection) {
    this._projects_loaded = this._projects_loaded + 1;

    var p_geojson = this._project_to_feature(p_data.body);
    var p_feat = new ol_format_GeoJSON().readFeature(p_geojson,
                                                     {featureProjection: projection});

    this.addFeatures([p_feat]);

    this.dispatchEvent({ type: 'project_loaded', project: p_feat });

    if (this._projects_loaded == this.projects.length)
        this.dispatchEvent({ type: 'projects_loaded' });
};

ol_source_taskMgr.prototype._project_to_feature = function(p) {
    var p_copy = Object.assign({}, p);
    delete p_copy['areaOfInterest'];
    delete p_copy['tasks'];

    var feature = {
        "type": "Feature",
        "geometry": p['areaOfInterest'],
        "properties": p_copy
    };

    return feature;
};

export default ol_source_taskMgr;
