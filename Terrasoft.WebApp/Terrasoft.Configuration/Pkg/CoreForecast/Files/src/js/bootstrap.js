(function() {
    require.config({
        paths: {
            "ForecastApp": Terrasoft.getFileContentUrl("CoreForecast", "src/js/forecast.js"),
        },
        shim: {
            "ForecastApp": {
                deps: [""]
            }
        }
    });
})();
