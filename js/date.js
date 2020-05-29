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
        tr0.children[1].innerHTML = vdateTime(vdate);
        tr1.children[1].innerHTML = edateTime(edate);
        let vdate2 = new VanaDate(vdate);
        vdate2.incrHours(6);
        let edate2 = vdate2.getEarthDate();
        tr0.children[2].innerHTML = vdateTime(vdate2);
        tr1.children[2].innerHTML = edateTime(edate2);
        vdate2.incrHours(12);
        edate2 = vdate2.getEarthDate();
        tr0.children[3].innerHTML = vdateTime(vdate2);
        tr1.children[3].innerHTML = edateTime(edate2);
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
