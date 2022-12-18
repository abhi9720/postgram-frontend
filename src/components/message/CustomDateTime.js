const date = require('date-and-time');
import moment from "moment";
function displayTimeStamp(messageDate) {

    const formattedDate = new Date(messageDate);
    let pattern
    if (isSameWeek(formattedDate)) {
        pattern = 'ddd, HH:mm'
    }
    else {
        pattern = date.compile('YYYY/MM/DD HH:mm');
    }


    return date.format(formattedDate, pattern)



}


function isSameWeek(giveDate) {
    var now = moment();
    var input = moment(giveDate);
    return (now.isoWeek() == input.isoWeek())
}

export default displayTimeStamp;