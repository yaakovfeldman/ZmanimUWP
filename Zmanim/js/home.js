$(document).ready(function() {
    var hebDate = new Hebcal.HDate();
    dateDisplay.innerText = hebDate.toString();
    var zmanim = hebDate.getZemanim();
    chatzotDisplay.innerText = "Chatzot: " + zmanim.chatzot.getHours() + ":" + zmanim.chatzot.getMinutes();

    var zman
    for (zman in zmanim) {
        zmanimDisplay.innerHTML += "<br>" + zman + zmanim[zman].getHours() + ":" + zmanim[zman].getMinutes();
    }
})