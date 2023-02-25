var express = require('express');
var router = express.Router();
const fs = require('fs/promises');

function convertTimestamp(timestamp){
  const date = new Date(timestamp * 1000); // convert to milliseconds
  const dateString = date.toISOString().slice(0, 19).replace(/[-T:]/g, '');
  const formattedString = dateString.slice(0, -6) + 'T' + dateString.slice(8);
  return formattedString
}

// ICS file generate function
// Parameter : title, startDate, endDate
// Result : Generate ICS file
async function generateIcs(title, startDate, endDate, timestamp, receivedData) {
  try {
    console.log(title, startDate, endDate, timestamp)
    const content = "BEGIN:VCALENDAR\r\n"
                  + "VERSION:2.0\r\n"
                  + "CALSCALE:GREGORIAN\r\n"
                  + "BEGIN:VEVENT\r\n"
                  + "DTSTART:" + convertTimestamp(startDate) + "\r\n"
                  + "DTEND:" + convertTimestamp(endDate) + "\r\n"
                  + "SUMMARY:" + title + "\r\n"
                  + "END:VEVENT"
    const filename = "./generatedFiles/" + title + timestamp + ".ics"
    await fs.writeFile(filename, content);
    return filename;
  } catch (err) {
    console.log(err);
  }
}

/*
ICS Generate Router
input data = {
              startDate(yyyyMMdd'T'HHmmss) : String
              endDate(yyyyMMdd'T'HHmmss) : String
              title(ex. AWS Cloud Bootcamp) : String
            } : JSON format

ex. {
  "startDate" : "20230120T130000",
  "endDate" : "20230120T163000",
  "title" : "AWS CloudBootCamp OfflineSession"
}

outputdata : .ics file -> save to local storage
response : send the generated ics filename
*/

router.post('/ics_gen', async function(req, res, next) {
  // Define the data from request
  const receivedData = req.body;

  /*
  const title = receivedData.title;
  const startDate = receivedData.startDate;
  const endDate = receivedData.endDate;
  const timestamp = receivedData.timestamp;
  */
  var sitename = receivedData.sitename;
  var title = receivedData.companyname;
  var startDate = receivedData.startdate;
  var endDate = receivedData.enddate;
  var collectionDate = receivedData.collectiondate;

  if(sitename == "programmers"){
    console.log("programmers logic!")
    if(endDate == "상시 채용")
      res.send("./generatedFiles/noname.ics")
    else{
      timestamp = collectionDate;
      startDate = collectionDate;
      endDate = collectionDate;
      console.log(title, startDate, endDate, timestamp, receivedData)
      await generateIcs(title, startDate, endDate, timestamp, receivedData)
      .then(function(filename){
        console.log(filename + "is generated. \r\n")
        return filename
      })
      .then(function(filename){
        res.send(filename)
      });
    }
  }
  else if(startDate!='' || endDate!='' || endDate!='상시' || endDate!="상시 채용" || startDate!=null || endDate!=null ){
    timestamp = startDate;
    await generateIcs(title, startDate, endDate, timestamp, receivedData)
    .then(function(filename){
      console.log(filename + "is generated. \r\n")
      return filename
    })
    .then(function(filename){
      res.send(filename)
    });
  }
  else{
    res.send("no")
  }
});

module.exports = router;
