"use strict";

// 2002/01/01 00:00:00 JST
const vanaEpocTime = Date.UTC(2002, 0, 1, -9, 0, 0);
const weekCharTable = ["火","土","水","風","氷","雷","光","闇"];

class VanaDate {
    constructor(date) {
        if (date instanceof VanaDate) {
            this.vtime = date.vtime;
        } else {
            const earthDate = date;
            const time  = earthDate.getTime();
            const vtime = Math.floor((time - vanaEpocTime) / 1000 * 25);
            this.vtime = vtime;
        }
        this.vTimeToDate();
    }
    vTimeToDate() {
        let t = this.vtime;
        this.second = t % 60;       t = Math.floor(t / 60);
        this.minute = t % 60;       t = Math.floor(t / 60);
        this.hour   = t % 24;       t = Math.floor(t / 24);
        this.week = t % 8;
        this.day    = (t % 30) + 1; t = Math.floor(t / 30);
        this.month  = t % 12;       t = Math.floor(t / 12);
        this.year = 886 + t;
    }
    get Year()   { return this.year;      }
    get Month()  { return this.month + 1; }
    get Day()    { return this.day;       }
    get Week()   { return this.week;      }
    get Hour()   { return this.hour;      }
    get Minute() { return this.minute;    }
    get Second() { return this.second;    }
    get WeekChar() { return weekCharTable[this.week]; }
    toString() {
        return this.year+"/"+(this.month+1)+"/"+(this.day+1)+
            "("+weekCharTable[this.week]+") "+
            this.hour+":"+this.minute+":"+this.second;
    }
    getEarthDate() {
        return new Date(this.EarthTime());
    }
    EarthTime() {
        return Math.floor((this.vtime / 25) * 1000 + vanaEpocTime);
    }
    alignDay() {
        let t = this.vtime;
        this.vtime -= t % (24*60*60);
        this.vTimeToDate();
        return this;
    }
    nextDay() {
        let t = this.vtime;
        this.vtime += 24*60*60;
        this.vTimeToDate();
        return this;
    }
}
