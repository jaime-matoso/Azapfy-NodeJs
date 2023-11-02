
function formatDate(date: any) : Date {
    let newDate = date;
    if(date != undefined || date != null){
        var dateParser = /(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})/;    
        var match = date.match(dateParser);
        newDate = new Date(match[3], match[2]-1, match[1]);
    }
    return newDate;
}
  
export {formatDate}
    