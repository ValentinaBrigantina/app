const date = require('date-and-time')

exports.parsingDate = (string) => {
    const newDate = new Date(string)
    return date.format(newDate, 'D MMMM, hh:mm')
}