function settingsPageReady() {
    var grama = settings.values["grama"] || "gra";
    if (grama = 'gra') {
        document.zmanimSettings.grama[0].checked = true;
    }
}

(function () {
    WinJS.UI.Pages.define("/pages/settings.html", {
        ready: function () {
            settingsPageReady();
        }
    });
})();