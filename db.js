const mongoose = require('mongoose');
// require('dotenv').config();

const url = `mongodb+srv://<username>:<password>@cluster0-3csjl.mongodb.net/test_transaction?retryWrites=true&w=majority`;

mongoose.connect(url, {useNewUrlParser: true});

// mongoose.set('debug', function (coll, method, query, doc, options) {
//     console.log(coll);
//     console.log(method);
//     console.log(doc);
//     console.log(options);
//     console.log(query);
// });

module.exports = mongoose.connection;