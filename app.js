const express=require("express");
const app=express();
const https=require("https");
const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");

});
app.post("/",function(req,res){
  const query=req.body.cityName;
  const units="metric";
  const apiId="18e52d2e81ce20dec90e464e2d3c186f";


  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+units+"&appid="+apiId;
  https.get(url,function(response){
  console.log(response.statusCode);
  response.on("data",function(data){
    const weatherData=JSON.parse(data);
    const temp=weatherData.main.temp;
    const weatherDescription=weatherData.weather[0].description;
    const icon=weatherData.weather[0].icon;
    const imageUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
    res.write("<p><b>the weather is currently"+  weatherDescription + "<b><p>");
    res.write("<h1>The temperature in " +query+ " is "+ temp + " degree Celsius.</h1>");
    res.write("<img src="+ imageUrl +">");
    res.send();


})

  })

})


app.listen(3000,function(){
  console.log("Server is running on port 3000");
});
