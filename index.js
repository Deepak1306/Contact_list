const express= require('express');
const { redirect } = require('express/lib/response');
const path=require('path');
const port=8000;

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
    return res.render('home',{
        title:'Contact_list' ,
        contacts_list:contactList

    });
});

app.post('/create_contact',function(req,res){
  contactList.push({
    name:req.body.name,
    phone:req.body.phone
  });

  return res.redirect('/');


});

app.get('/delete-contact/',function(req,res){
  let phone=req.query.phone;

  let contact_index=contactList.findIndex(contact => contact.phone==phone);
  if(contact_index!=-1){
    contactList.splice(contact_index,1);
  }
  return res.redirect('/');
});

app.listen(port,function(err){
    if(err){
      console.log('Error in Running Server');
      return ;
    }

    console.log('Yup!My express server is running');
});
