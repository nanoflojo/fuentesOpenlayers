        // Configuración del popup
        var container = document.getElementById("popup"),
            content_element = document.getElementById("popup-content"),
            closer = document.getElementById("popup-closer");

        closer.onclick = function () {
            overlay.setPosition(undefined);
            closer.blur();
            return false;
        };
        var overlay = new ol.Overlay({
            element: container,
            autoPan: true,
            offset: [0, -10],
        });