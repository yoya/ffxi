"use strict";

document.addEventListener("DOMContentLoaded", function(event) {
    main();
});

// Vana'diel Time Week Color
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

// Earth Time Week Color
function edateWeekColor(edate) {
    return ["#FED",  // sun
            "#FFD",  // mon
            "#FDD",  // tue
            "#DEF",  // wed
            "#DEE",  // thu
            "#FFD",  // fri
            "#FEE",  // sat 
           ] [edate.getDay()];
}

function digit0pad(v, n) {
    v = "" + v;
    let p = n - v.length;
    if (p <= 0) {
        return v;
    }
    return "0".repeat(p) + v;
}

function vdateWeek(vdate) {
    return vdate.WeekChar;
}

function vdateID(vdate) {
    const year = vdate.Year;
    let month  = vdate.Month;
    let day    = vdate.Day;
    let hour   = vdate.Hour;
    let minute = vdate.Minute;
    month  = digit0pad(month, 2);
    day    = digit0pad(day, 2);
    hour   = digit0pad(hour, 2);
    minute = digit0pad(minute, 2);
    return "d"+year+month+day+hour+minute;
}

function edateID(date) {
    const year  = date.getFullYear();
    let month   = date.getMonth() + 1;
    let day     = date.getDate();
    let hours   = date.getHours();
    let minutes = date.getMinutes();
    month   = digit0pad(month, 2);
    day     = digit0pad(day, 2);
    hours   = digit0pad(hours, 2);
    minutes = digit0pad(minutes, 2);
    hours   = digit0pad(hours, 2);
    minutes = digit0pad(minutes, 2);
    return "d"+year+month+day+hours+minutes;
}

function vdateDate(vdate) {
    const year   = vdate.Year;
    let month  = vdate.Month;
    let day    = vdate.Day;
    let week   = vdateWeek(vdate);
    month = digit0pad(month, 2);
    day  =  digit0pad(day, 2);
    return "("+week+")"+year+"/"+month+"/"+day;
}

function vdateDate2(vdate) {
    let month  = vdate.Month;
    let day    = vdate.Day;
    let week   = vdateWeek(vdate);
    month = digit0pad(month, 2);
    day  =  digit0pad(day, 2);
    return "("+week+")"+month+"/"+day;
}

function vdateTime(vdate) {
    let hour   = vdate.Hour;
    let minute = vdate.Minute;
    hour   = digit0pad(hour, 2);
    minute = digit0pad(minute, 2);
    return hour+":"+minute
}

function edateTime(date) {
    let hours   = date.getHours();
    let minutes = date.getMinutes();
    hours   = digit0pad(hours, 2);
    minutes = digit0pad(minutes, 2);
    return hours+":"+minutes;
}

function edateDate(date) {
    const year  = date.getFullYear();
    let month = date.getMonth() + 1;
    let day   = date.getDate();
    let week = "日月火水木金土"[date.getDay()];
    month = digit0pad(month, 2);
    day  =  digit0pad(day, 2);
    return year+"/"+month+"/"+day+"("+week+")";
}

function main() {
    const container = document.getElementById("container");
    const template = document.getElementById("template");
    template.remove();
    //
    const current = new Date();
    let vdate = new VanaDate(current).alignDay();
    let edate = vdate.getEarthDate();
    let edayGroupHead = true;
    let vNewYear = true;
    //
    for (let i = 0 ; i < 8*5 ; i++) {
        let table = template.cloneNode(true);
        let tbody = table.children[0];
        let [tr0, tr1] = tbody.children;
        let [td0, td1] = [tr0.children, tr1.children];
        tr0.style.backgroundColor = vdateWeekColor(vdate);
        tr1.style.backgroundColor = edateWeekColor(edate);
        //
        if (vNewYear) {
            tr0.children[0].innerHTML = vdateDate(vdate);
        } else {
            tr0.children[0].innerHTML = vdateDate2(vdate);
        }
        if (edayGroupHead) {
            tr1.children[0].innerHTML = edateDate(edate);
        }
        td0[1].innerHTML = vdateTime(vdate);
        td1[1].innerHTML = edateTime(edate);
        td0[1].setAttribute('id', vdateID(vdate));
        td1[1].setAttribute('id', edateID(edate));
        //
        let vdate2 = new VanaDate(vdate);
        //
        vdate2.incrHours(4);
        let edate2 = vdate2.getEarthDate();
        td0[2].innerHTML = vdateTime(vdate2);
        td1[2].innerHTML = edateTime(edate2);
        td0[2].setAttribute('id', vdateID(vdate2));
        td1[2].setAttribute('id', edateID(edate2));
        //
        vdate2.incrHours(2);
        td0[3].innerHTML = vdateTime(vdate2);
        td1[3].innerHTML = edateTime(edate2);
        td0[3].setAttribute('id', vdateID(vdate2));
        td1[3].setAttribute('id', edateID(edate2));
        //
        vdate2.incrHours(12);
        edate2 = vdate2.getEarthDate();
        td0[4].innerHTML = vdateTime(vdate2);
        td1[4].innerHTML = edateTime(edate2);
        td0[4].setAttribute('id', vdateID(vdate2));
        td1[4].setAttribute('id', edateID(edate2));
        //
        vdate2.incrHours(2);
        edate2 = vdate2.getEarthDate();
        td0[5].innerHTML = vdateTime(vdate2);
        td1[5].innerHTML = edateTime(edate2);
        td0[5].setAttribute('id', vdateID(vdate2));
        td1[5].setAttribute('id', edateID(edate2));
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
    tickTime();
    setInterval(tickTime, 1000*25 / 60);
}

function tickTime() {
    const vanaTime = document.getElementById("vanaTime");
    const earthTime = document.getElementById("earthTime");
    const edate = new Date();
    const vdate = new VanaDate(edate);
    vanaTime.innerHTML = vdateDate(vdate) + " " + vdateTime(vdate);
    earthTime.innerHTML = edateDate(edate) + " " + edateTime(edate);
    vanaTime.parentNode.style.backgroundColor = vdateWeekColor(vdate);
    earthTime.parentNode.style.backgroundColor = edateWeekColor(edate);
    const vdate2 = new VanaDate(vdate).alignZoneTime();
    const edate2 = vdate2.getEarthDate();
    const vid = vdateID(vdate2);
    const eid = edateID(edate2);
    const td0 = document.getElementById(vid);
    const td1 = document.getElementById(eid)
    if (td0 !== null) {
        td0.style = "color:red";
    }
    if (td1 !== null) {
        td1.style = "color:red";
    }
}

function onClickMidnight(e) {
    displayMidnight(e.checked);
}
displayMidnight(midnightCheckbox.checked);

function displayMidnight(checked) {
    const selectors = ".midnight";
    const midnightAll = document.querySelectorAll(selectors);
    midnightAll.forEach((midnight) => {
        if (checked) {
            midnight.style.display = "";
        } else {
            midnight.style.display = "none";
        }
    });
}
