function calendarPageReady() {
    $('#calendar').fullCalendar({
        // put your options and callbacks here
        height: "auto"
    })
}

(function () {
    WinJS.UI.Pages.define("/pages/calendar.html", {
        ready: function () {
            calendarPageReady();
        }
    });
})();