// const request = require('request-promise');

// request(
//   "http://geeklyinc.com/GeeklyCon-Calendar.php",
//   {
//     method: "POST",
//     formData: {
//       Filter: "andrewcarreiro@gmail.com",
//       FilterBtn: "Set Filter"
//     }
//   }
// ).then( result => {
//   console.log(result);
// })
// .catch( e => {
//   console.error(e);
// });

const Path = require('path');

const phantomjs = require('phantomjs-prebuilt');
const webdriverio = require('webdriverio');

var wdOpts = { desiredCapabilities: { browserName: 'phantomjs' } }
 
phantomjs.run('--webdriver=4444').then(program => {
  var browser = webdriverio.remote(wdOpts).init();
  browser.url(`file://${Path.join(__dirname,"./post.html")}`)
    // .then( () => { console.log("1"); return browser.setValue("#filter", "andrewcarreiro@gmail.com"); } )
    // .then( () => { console.log("2"); return browser.submitForm("#theform"); } )
    // .then( () => { console.log("3"); return browser.getTitle(); } )
    .then( () => { 
      var val = browser.setValue("#filter", "andrewcarreiro@gmail.com");
      console.log("val",val );
      
      var sub = browser.submitForm("#theform");
      console.log("sub",sub)
      return browser.getUrl();
    } )
    .then( title => {
      console.log(title);
      program.kill();
    });
    
    // .submitForm("#theform")
    // .then( args => {
    //   console.log('done worked');
    // .getTitle().then(title => {
    //   console.log(title) // 'Mozilla Developer Network' 
    //   program.kill() // quits PhantomJS 
    // })
})