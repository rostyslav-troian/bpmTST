(function() {
    require.config({
        paths: {
            "MjmlCore": Terrasoft.getFileContentUrl("ContentBuilder", "src/js/mjml.min.js")
        },
        shim: {
            "MjmlCore": {
                deps: [""]
            }
        }
    });
})();