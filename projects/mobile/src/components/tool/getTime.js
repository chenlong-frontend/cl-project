export default function () {
    let myDate = new Date(), time;
    let o = {
        "y": myDate.getFullYear(),
        "M": myDate.getMonth() + 1,
        "d": myDate.getDate(),
        "h": myDate.getHours(),
        "m": myDate.getMinutes()
    };
    if (o.h < 10) o.h = "0" + o.h
    if (o.m < 10) o.m = "0" + o.m
    if (o.M < 10) o.M = "0" + o.M
    time = o.y + "-" + o.M + "-" + o.d + " " + o.h + ":" + o.m;
    return time;
}