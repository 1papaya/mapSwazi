import {View, inherits} from 'ol';

function SwaziView(target, padding=10) {

    const bounds = [3427637.922163467, -3163184.323967456,
                   3577228.0000320906, -2964196.586792509];

    View.call(this, {
        extent: bounds
    });

    this.fit(bounds, {
        size: [target.offsetHeight, target.offsetWidth],
        padding: [padding, padding, padding, padding],
        constrainResolution: false
    });

    this.setMinZoom(this.getZoom() - 1);
}

inherits(SwaziView, View);

module.exports = {
    SwaziView: SwaziView
};
