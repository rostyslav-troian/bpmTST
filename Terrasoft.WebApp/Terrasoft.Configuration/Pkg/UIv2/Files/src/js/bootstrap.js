(function() {
    require.config({
        paths: {
            "VanillaboxMin" :Terrasoft.getFileContentUrl("UIv2", "src/js/jquery.vanillabox-0.1.7.min.js"),
            "VanillaboxCSS" :Terrasoft.getFileContentUrl("UIv2", "src/css/vanillabox.css")
        },
        shim: {
            "VanillaboxMin": {
                deps: ["jQuery"]
            }
        }
    });
})();