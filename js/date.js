"use strict";

document.addEventListener("DOMContentLoaded", function(event) {
    main();
});

function vdateWeekColor(vdate) {
    return ["#FDD",  // fire
            "#FFD",  // earth
            "#DEF",  // water
            "#DFD",  // wind
            "#EFF",  // ice
            "#FDF",  // thuner
            "#FFF",  // light
            "#DDE",  // dark
           ] [vdate.Week];
}

function edateWeekColor(edate) {
    return ["#FED",  // sun
            "#FFD",  // mon
            "#FDD",  // tue
            "#DEF",  // wed
            "#DEE",  // thu
            "#FFD",  // fri
            "#EDD",  // sat
           ] [edate.getDay()];
}


function vdateWeek(vdate) {
    return vdate.WeekChar;
}

function vdateDateTime(vdate) {
    const year   = vdate.Year;
    let month  = vdate.Month;
    let day    = vdate.Day;
    month  = (month<10) ? "0"+month : ""+month;
    day    = (day <10)  ? "0"+day   : ""+day;
    return year+"/"+month+"/"+day + " " + vdateTime(vdate);
}
function vdateDateTime2(vdate) {
    let month  = vdate.Month;
    let day    = vdate.Day;
    month  = (month<10) ? "0"+month : ""+month;
    day    = (day <10)  ? "0"+day   : ""+day;
    return month+"/"+day + " " + vdateTime(vdate);
}


function vdateTime(vdate) {
    let hour   = vdate.Hour;
    let minute = vdate.Minute;
    hour   = (hour<10)  ? "0"+hour  : ""+hour;
    minute = (minute<10)? "0"+minute: ""+minute;
    return hour+":"+minute
}

function edateTime(date) {
    let hours   = date.getHours();
    let minutes = date.getMinutes();
    hours   = (hours<10)  ? "0"+hours  : ""+hours;
    minutes = (minutes<10)? "0"+minutes: ""+minutes;
    return hours+":"+minutes;
}

function edateDateTime(date) {
    const year  = date.getFullYear();
    let month = date.getMonth() + 1;
    let day   = date.getDate();
    let hours   = date.getHours();
    let minutes = date.getMinutes();
    let week = "日月火水木金土"[date.getDay()];
    month   = (month<10)  ? "0"+month  : ""+month;
    day     = (day <10)   ? "0"+day    : ""+day;
    hours   = (hours<10)  ? "0"+hours  : ""+hours;
    minutes = (minutes<10)? "0"+minutes: ""+minutes;
    return year+"/"+month+"/"+day+"("+week+") "+hours+":"+minutes;
}

function main() {
    console.log("main");
    const container = document.getElementById("container");
    const template = document.getElementById("template");
    template.remove();
    //
    const current = new Date();
    let vdate = new VanaDate(current).alignDay();
    let edate = vdate.getEarthDate();
    let edayGroupHead = true;
    let vNewYear = true;
    for (let i = 0 ; i < 8*5 ; i++) {
        let table = template.cloneNode(true);
        let tbody = table.children[0];
        let [tr0, tr1] = tbody.children;
        tr0.children[0].innerHTML = vdateWeek(vdate);
        tr0.children[1].innerHTML = vNewYear? vdateDateTime(vdate): (vdate.vMidNight? vdateDateTime2(vdate): vdateTime(vdate));
        tr1.children[0].innerHTML = edayGroupHead? edateDateTime(edate): edateTime(edate);
        tr0.style.backgroundColor = vdateWeekColor(vdate);
        tr1.style.backgroundColor = edateWeekColor(edate);

        tr1.children[0].style = "text-align:right";
        let vdate2 = new VanaDate(vdate);
        vdate2.incrHours(6);
        let edate2 = vdate2.getEarthDate();
        tr0.children[2].innerHTML = vdateTime(vdate2);
        tr1.children[1].innerHTML = edateTime(edate2);
        vdate2.incrHours(12);
        edate2 = vdate2.getEarthDate();
        tr0.children[3].innerHTML = vdateTime(vdate2);
        tr1.children[2].innerHTML = edateTime(edate2);
        //
        vdate.nextDay();
        edate = vdate.getEarthDate();
        container.append(table)
        if (vdate.eMidNight) {
            edayGroupHead = true;
            table.style = "clear:both";
            let hr = document.createElement("hr");
            //container.append(hr)
            container.append(hr)
        } else {
            edayGroupHead = false;
            table.style = "float:left";
        }
        vNewYear = vdate.vNewYear;
    }
}
