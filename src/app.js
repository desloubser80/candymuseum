const hbs = require('hbs');
const path = require('path');
const express = require('express');

// setup express
const app = express();
const port = process.env.PORT || 3000;

//define paths for express configs
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//setup handle bars engine and views location
app.set('view engine','hbs'); 
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to server
app.use(express.static(publicDirectoryPath));

app.get('/weather',(req,res)=>
{
    if(!req.query.address)
    {
        return res.send({"error":"Please enter an address"});
    }
    
    geocode(req.query.address, (err,coordinates)=>
    {   
        if(err)
        {
            res.send({"error": err});
        }
        else
        {
            weather(coordinates,(err,weather)=>
            {
                if(err)
                {
                    res.send({"error": err});
                }
                else
                {
                    var response = {"temp":weather.temp, "summary":weather.summary, "location" : coordinates.place}
                    console.log(response)
                    res.send(response)
                }
            });
        }
    });
});

app.get('',(req,res)=>
{
    res.render('candy',
    {
        title : "candy"
        ,name : "Des"
    });
})



app.listen(port, ()=>
{
    console.log("Server is running");
});

