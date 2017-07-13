const icalendar = require('icalendar');
const uuidv5 = require('uuid/v5');
const UUID_NAMESPACE = 'ee465990-6772-11e7-af7f-b588a48424c6';


function event2ical(eventData) {
  // console.log('working with event data',eventData);
  const ical = new icalendar.iCalendar();

  eventData.forEach(event => {
    console.log('converting event data',event);
    const iCalEvent = new icalendar.VEvent(uuidv5(event.id, UUID_NAMESPACE))
    iCalEvent.setSummary(event.title);
    iCalEvent.setDate(new Date(event.start * 1000), event.stop - event.start);

    ical.addComponent(iCalEvent);
  });

  return ical.toString();
}

module.exports = event2ical;