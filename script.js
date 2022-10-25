let weather={
    "apiKey":"18e52d2e81ce20dec90e464e2d3c186f",
    fetchWeather:function(city){
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city +"&appid="+this.apiKey)
    .then((response)=>response.json())
    .then((data)=>this.displayWeather(data));
},
displayWeather:function(data){
    const{name}=data;
    const{description}=data.weather[0];
    const{temp,humidity}=data.main;
    const{speed}=data.wind;
  
    console.log(name,description,temp,humidity,speed)
    document.querySelector(".city").innerText = "Weather in " + name;
  
    document.querySelector(".description").innerText = description;
    const temp1=parseInt(temp-273,10);
    document.querySelector(".temp").innerText =temp1+ "°C";
    
    document.querySelector(".humidity").innerText="Humidity"+humidity+"%";
    document.querySelector(".wind").innerText="Wind Speed:"+speed+"km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + description + "')";
    
 },
 search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
 }


};
document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  
  weather.fetchWeather("Denver");