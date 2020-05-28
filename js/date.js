"use strict";

document.addEventListener("DOMContentLoaded", function(event) {
    main();
});

function vdateWeekColor(vdate) {
    return ["#FDD",  // fire
            "#FFD",  // earth
            "#DEF",  // water
            "#EFE",  // wind
            "#EFF",  // ice
            "#FDF",  // thuner
            "#FFF",  // light
            "#EDE",  // dark
           ] [vdate.Week];
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
    return year+"/"+month+"/"+day;
}

function edateDateTime(date) {
    const year  = date.getFullYear();
    let month = date.getMonth() + 1;
    let day   = date.getDate();
    let hours   = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    month   = (month<10)  ? "0"+month  : ""+month;
    day     = (day <10)   ? "0"+day    : ""+day;
    hours   = (hours<10)  ? "0"+hours  : ""+hours;
    minutes = (minutes<10)? "0"+minutes: ""+minutes;
    return year+"/"+month+"/"+day+" "+hours+":"+minutes+":"+seconds;
}

function main() {
    console.log("main");
    const container = document.getElementById("container");
    const template = document.getElementById("template");
    template.remove();
    //
    const current = new Date();
    let vdate = new VanaDate(current).alignDay();
    for (let i = 0 ; i < 8*5 ; i++) {
        let table = template.cloneNode(true);
        let tbody = table.children[0];
        let [tr0, tr1] = tbody.children;
        tbody.style.backgroundColor = vdateWeekColor(vdate);
        tr0.children[0].innerHTML = vdateWeek(vdate);
        tr0.children[1].innerHTML = vdateDateTime(vdate);
        tr1.children[0].innerHTML = edateDateTime(vdate.getEarthDate());
        if ((i%8) < 7) {
            table.style="float:left";
        }
        container.append(table)
        vdate.nextDay();
    }
}
