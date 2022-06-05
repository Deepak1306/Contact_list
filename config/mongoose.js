// require the library
const mongoose=require('mongoose');

// connect the database
mongoose.connect('mongodb://localhost/contact_list_db');

// acquire to check the connnection established or not
const db=mongoose.connection;

// error
db.on('error',console.error.bind(console,'error Connecting DB'));

// up and running
db.once('open',function(){
    console.log('Successfully Connected To Database');
});


