const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();



app.use(express.static(__dirname+'/public'));
//log handler
app.use((req,res,next) =>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url} \n`;
    console.log(log);
    fs.writeFileSync('server.log',log);
    next();
});

hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamit',(text) => {
    return text.toUpperCase();
})

app.set('view engine','hbs');
app.get('/',(req,resp)=>{
    resp.render('welcome.hbs',{
        pageTitle: 'Welcome',
        userName: 'Partho',
        sessionSequence: 'First',
       
    })
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle: 'Sample Page',
        userName: 'Partho',
    });
})

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage: 'Unable to Handle request'
    })
})

app.listen(3000);