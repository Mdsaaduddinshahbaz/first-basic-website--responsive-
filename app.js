const express=require("express")
const path=require("path")
const fs = require("fs")
const app = express();
const mongoose=require("mongoose")
const bodyparser=require("body-parser")
app.use(bodyparser.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/contacts', {useNewUrlParser: true,useUnifiedTopology: true});
const port = 80;
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
const contactschema = new mongoose.Schema({
    name: String,
    email: String,
    phone : String,
    age : String,
    gender: String,
  });
const contact = mongoose.model('contact', contactschema);
app.get('/',(req,res)=>{
    res.render("backbone.pug")
})
app.get('/home',(req,res)=>{
    res.render("backbone.pug")
})
app.set('views', path.join(__dirname, 'views'))

app.get('/contact', (req,res)=>{
    res.render("contact.pug")
})
app.post('/contact', (req,res)=>{
    console.log(req.body);
    var info= new contact(req.body);
    info.save().then(()=>{
        res.send("you can get response from our side in 2-3 days")
    }).catch(()=>{
        res.send("there something technical error,your info havent been proccessed successfully plz try again")
    });
    
})
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
}); 