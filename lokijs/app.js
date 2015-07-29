var lokijs = require('lokijs', { env: 'NODEJS'});
var fs = require('fs');
var Q = require('q');
var DB_FILE = 'demo.json';

var dfd = Q.defer();

var db = new lokijs(DB_FILE, {
    env: 'NODEJS',
    autoload: true,
    autoloadCallback: function() {
      // console.log('autoloadCallback - inicio');
      var contacts = db.getCollection('contacts');

      // if the database did not exist we will initialize empty database here
      if (contacts === null) {
        contacts = db.addCollection('contacts');
        contacts.insert({name: 'joe', age: 39, firstLanguage: 'italian'});
        contacts.insert({name: 'dave', age: 30, firstLanguage: 'english'});
        contacts.insert({name: 'tim', age: 30, firstLanguage: 'english'});
        contacts.insert({name: 'jonas', age: 30, firstLanguage: 'swedish'});
        contacts.insert({name: 'pedro', age: 30, firstLanguage: 'spanish'});
      }

      //console.log(contacts);
      //console.log(db);
      // console.log('autoloadCallback - fim');
      dfd.resolve();
    },
    autosave : true,
    autosaveInterval : 5000
  }
);

dfd.promise.then(function(){
  var contacts = db.getCollection('contacts');
  contacts.insert({ name : 'draupnir', owner: 'odin', maker: 'elves' });
  // console.log(contacts);
  console.log(contacts.get(1));
  console.log(
    contacts.find({
      name: 'pedro'
    })
  );

}).then(function(){
  db.close();
});


// console.log('teste');


// var idbAdapter = new lokiIndexedAdapter('loki');
// var db = new loki('test',
//   {
//     autoload: true,
//     autoloadCallback : loadHandler,
//     autosave: true,
//     autosaveInterval: 10000,
//     adapter: idbAdapter
//   });

// function loadHandler() {
//   // if database did not exist it will be empty so I will intitialize here
//   var coll = db.getCollection('entries');
//   if (coll === null) {
//     db.addCollection('entries');
//   }
// }
