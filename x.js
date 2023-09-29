var express = require('express')  
var app = express()

app.use(express.static('public'));

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore} = require('firebase-admin/firestore');
var serviceAccount = require("./key.json");
 
initializeApp({
    credential: cert(serviceAccount)
  });
  
const db = getFirestore();
  
app.get('/signup', function (req, res) {  
res.sendFile( __dirname + "/public/" + "signup.html" );

  
})  

  
app.get('/signupSubmit', function (req, res) {  
    db.collection('12345').add({
        username:req.query.username,
        email:req.query.email,
        password:req.query.password,
    }).then(()=>{
      res.send("signup sucessfull, please login ")
    });
});
  
app.get("/loginSubmit", function (req,res) {  
 db.collection('12345')
   .where("username","==",req.query.username)
   .where("password","==",req.query.password)
   .get()
   .then((docs)=>{
    if(docs.size>0){
        res.redirect('/dash4.html');

    }
    else{
        res.send("Login failed");
        }
   })
   .catch((error) => {
     console.error("Error",error);
     res.send("An error occured during signup");
   });
});
app.get("/login", function (req,res) {  
    res.sendFile( __dirname + "/public/" + "login.html" );
});
app.listen(5000);
