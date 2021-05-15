const mongoose = require('mongoose');

mongoURI = 
  process.env.NODE_ENV === 'production' ?
  process.env.DB_URL : 
  'mongodb://localhost/localtag';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
})
.then(instance => {
  console.log(`Connected to DB: ${instance.connections[0].name}`)
})
.catch( error => console.error('Connection failed', error))

module.exports = mongoose