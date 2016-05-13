'use strict';

$(document).ready(function() {

  var thermostat = new Thermostat();
  updateTemperature();

  function updateDisplays(){
    updateTemperature()
    updateDisplayColour()
  }


  $('#temperature-up').click(function() {
    thermostat.up();
    updateDisplays();
    updateServer();
  });

  $('#temperature-down').click(function() {
    thermostat.down();
    updateDisplays();
    updateServer();
  });

  $('#temperature-reset').click(function() {
    thermostat.resetTemperature();
    updateDisplays();
    updateServer();
  });

  $('#powersaving').click(function() {
    thermostat.togglePowerSavingMode();
    if (thermostat.powerSavingMode) { $('#power-saving-status').text('ON') }
    else { $('#power-saving-status').text('OFF') }
    updateTemperature();
  });

  function updateDisplayColour () {
    var color = getColor();
    $("body").css("background-color", color)
  }

  function getColor() {
    var usage = thermostat.energyUsage();
    if (usage === "low-usage") return "#9fdf9f"
    if (usage === "medium-usage") return "#ffb366"
    if (usage === "high-usage") return "#ff9980"
  };

  function updateTemperature() {
    $('#temperature').text(thermostat.temperature);
  };

  $('#current-city').change(function() {
    var city = $('#current-city').val();
    displayWeather(city);
    updateServer();
  });

  function displayWeather(city) {
    var url = 'http://api.openweathermap.org/data/2.5/weather?id=' + city;
    var token = '&appid=36ccffbe684dd94e673ae12bc33e796b';
    var units = '&units=metric';
    $.get(url + token + units, function(data) {
      $('#current-temperature').text(data.main.temp);
    });
  };

  function getServerData() {
    var url = 'http://localhost:4567/temperature';
    $.ajax({
      type: "GET",
      url: url,
      dataType: "html",
      success: function(data){
        thermostat = new Thermostat(data);
        displayWeather();
        updateDisplays();

      },
      error: function(){
        thermostat = new Thermostat();
        displayWeather();
        updateDisplays();
      }
    });
  }

  function updateServer() {
    var url = "http://localhost:4567/temperature?"
    var tempparam = "temp="
    var temp = thermostat.getCurrentTemperature();
    var cityparam = "&city="
    var city = $('#current-city').val();
    var url = url + tempparam + temp + cityparam + city;
    $.post(url);
  }

  getServerData();



});
