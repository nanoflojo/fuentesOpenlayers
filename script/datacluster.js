        // Creamos el estilo del cluster agrupación fuentes
        var styleCache = {};
        function getStyle(feature, resolution) {
            var size = feature.get('features').length;
            var style = styleCache[size];
            if (!style) {
                var color = size > 50 ? "0, 174, 255" : size > 25 ? "27, 189, 255" : size > 16 ? "0, 200, 255" : size > 8 ? "0, 210, 255" : size > 1 ? "0, 220, 255" : "0, 90, 255";
                var radius = Math.max(6, Math.min(size * 0.75, 40));

                style = styleCache[size] = new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: radius,
                        stroke: new ol.style.Stroke({
                            color: "rgba(" + color + ",0.5)",
                            width: 5,

                        }),
                        fill: new ol.style.Fill({
                            color: "rgba(" + color + ",0.5)"
                        })
                    }),

                    text: new ol.style.Text({
                        text: size.toString(),
                        fill: new ol.style.Fill({
                            color: '#fff'
                        })
                    })
                });
            }
            return style;
        };

        // Configuramos un vector para leer los datos Geojson	
        var fuentes = new ol.source.Vector({
            url: "https://gist.githubusercontent.com/nanoflojo/e5b3991240d9e18c6d04b31fc9c3aad9/raw/9ceba2f19204a45e4fa49400af6830d34d39f305/FuentesTODO.json",
            format: new ol.format.GeoJSON(),
            style: (styleCache /*style_point*/)
        });
        // Se crea una capa Vector para visualizar los datos GeoJson.
        var vectorLayer = new ol.layer.Vector({
            source: fuentes,
        });

        // El Cluster source se configura con otro vector
        var clusterSource = new ol.source.Cluster({
            source: fuentes,
            distance: 80
        });

        // Creamos la capa Vector del Cluster con su estilo correspondiente
        var clusterLayer = new ol.layer.Vector({
            source: clusterSource,
            style: getStyle,
        });
