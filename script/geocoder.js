        // construcción del Geocoder 
        map.addOverlay(overlay);
        var geocoder = new Geocoder('nominatim', {
            provider: 'osm',
            lang: 'en',
            placeholder: 'Search for ...',
            limit: 5,
            debug: false,
            autoComplete: true,
            keepOpen: true
        });

        map.addControl(geocoder);

        geocoder.on('addresschosen', function (evt) {
            console.info(evt);
            window.setTimeout(function () {
                popup.show(evt.coordinate, evt.address.formatted);
            }, 3000);
        });

        map.on("click", function (evt) {
            var feature = map.forEachFeatureAtPixel(
                evt.pixel,
                function (feature, layer) {
                    var features = feature.get('features');
                    if (features) {
                        return features[0];
                    }
                    return feature;
                }
            );
            if (feature) {
                var geometry = feature.getGeometry();
                var coord = geometry.getCoordinates();
                var content = feature.get("name");
                content_element.innerHTML = content;
                overlay.setPosition(coord);
                console.info(feature.getProperties());
            }
        });