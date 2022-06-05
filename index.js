const express= require('express');
const { redirect } = require('express/lib/response');
const path=require('path');
const port=8000;

const db=require('./config/mongoose');
const Contact=require('./models/contact');
const app= express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'))

var contactList=[
  {
    name:'Deepak',
    phone:'9845677345'
  },
  {
    name:'Rahul',
    phone:'9928323456'
  },
  {
    name:'Ritik',
    phone:'9089672909'
  }
]

app.get('/',function(req,res){
  
  Contact.find({},function(err,contact){
         if(err){
           console.log('err in finding contact');
           return ;
         }
       
         return res.render('home',{
          title:'Contact_list' ,
          contacts_list:contact
      });

  });
  
 
});

app.post('/create_contact',function(req,res){
  Contact.create({
    name:req.body.name,
    phone:req.body.phone
  },function(err,newcontact){
     if(err){
       console.log('error in creating contact');
       return ;
      }
      
      console.log('created-Contact',newcontact);
      return res.redirect('/');
  });

});

app.get('/delete-contact/',function(req,res){
  let id=req.query.id;
   
  Contact.findByIdAndDelete(id,function(err){
        if(err){
          console.log('err in deleting contact');
          return ;
        }
       return res.redirect('/');

  });
});

app.listen(port,function(err){
    if(err){
      console.log('Error in Running Server');
      return ;
    }

    console.log('Yup!My express server is running');
});
