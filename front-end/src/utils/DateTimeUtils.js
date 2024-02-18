export const getMinMaxDateTime = (offset) => {
    var d = new Date();

    var year = d.getUTCFullYear();

    var month = d.getUTCMonth();

    month = parseInt(month) + 1;

    var day = d.getDate();

    if (parseInt(month) < 10)
        month = "0" + month;

    if (offset === -1)
        day = parseInt(day) - 1;

    if (offset === 1)
        day = parseInt(day) + 1;

    if (parseInt(day) < 10)
        day = "0" + day;


    var ts = year + "-" + month + "-" + day + "T00:00"

    // console.log(ts);

    return(ts);
}

export const convertDateTimetoEpochSeconds = (dt) => {

    // console.log("convertDateTimetoEpochSeconds");

    //formato: YYYY-MM-DDTHH:MM
    // console.log(dt);

    var year = dt.split("-")[0];

    // console.log(year);

    var month = dt.split("-")[1];

    month = parseInt(month) - 1;

    // console.log(month);

    var day = (dt.split("-")[2]).split("T")[0];

    // console.log(day);

    var hours = (dt.split("T")[1]).split(":")[0];

    // console.log(hours);

    var minutes = (dt.split("T")[1]).split(":")[1];

    // console.log(minutes);

    var d = new Date(year,month,day,hours,minutes);

    var epoch = d.getTime() / 1000;

    // console.log(epoch);

    return epoch;

}