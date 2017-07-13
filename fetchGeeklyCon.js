const Path = require('path');

const phantomjs = require('phantomjs-prebuilt');
const webdriverio = require('webdriverio');

const wdOpts = { desiredCapabilities: { browserName: 'phantomjs' } }

function fetchGeeklyConEvents(email) {
  return new Promise((resolve, reject) => {
    phantomjs.run('--webdriver=4444').then(program => {
      var browser = webdriverio.remote(wdOpts).init();
      browser.url(`file://${Path.join(__dirname, "./post.html")}`)
        .setValue("#filter", email)
        .submitForm("#theform")
        .waitForExist("#eventHolder")
        .execute(function () {
          return jQuery("#calendarEvents, #calendarGames")
            .map(function () { return jQuery(this).fullCalendar("clientEvents") })
            .get()
            .map(function (e) {
              return {
                "id": e.id,
                "title": e.title,
                "start": moment(e.start).unix(),
                "stop": moment(e.end).unix()
              }
            });
        })
        .then(result => {
          program.kill();
          resolve(result.value);
        })
        .catch(e => {
          program.kill();
          reject(e);
        });
    });
  });
}

module.exports = fetchGeeklyConEvents;