const fs = require('fs');
const path = require('path');

const fetchGeeklyCon = require('./fetchGeeklyCon');
const event2ical = require('./event2ical');


exports.local = () => {
  fetchGeeklyCon("andrewcarreiro@gmail.com")
  .then( event2ical )
  .then( icalString => {
    fs.writeFileSync(path.join(__dirname, "./test.ics"), icalString);
  })
  .catch ( e => {
    console.error('fail',e);
  });
}

exports.http = ( req, res ) => {
  if( ! req.query.email ){
    return res.status(404).send("Add your email in the url with `email=cool@geeklyinc.com`");
  }

  if( req.query.email == "youremailhere@gmail.com" ){
    return res.status(404).send("Put your real email up there!");
  }

  fetchGeeklyCon("andrewcarreiro@gmail.com")
  .then( event2ical )
  .then( icalString => {
    res.set('Content-disposition', 'attachment; filename=geeklycon-calendar.ics');
    res.set('Content-type','text/calendar');
    res.status(200).send(icalString)
  })
  .catch( e => {
    res.status(500).send("oh shit something went wrong. Message @andrew on slack with this: "+e);
  });
}