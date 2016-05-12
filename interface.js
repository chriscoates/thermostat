'use strict';

$(document).ready(function() {

  var thermostat = new Thermostat();
  updateTemperature();

  $('#temperature-up').click(function() {
    thermostat.up();
    updateTemperature();
    updateDisplayColour();
  });

  $('#temperature-down').click(function() {
    thermostat.down();
    updateTemperature();
    updateDisplayColour();
  });

  $('#temperature-reset').click(function() {
    thermostat.resetTemperature();
    updateTemperature();
    updateDisplayColour();
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
  });

  function displayWeather(city) {
    var url = 'http://api.openweathermap.org/data/2.5/weather?id=' + city;
    var token = '&appid=36ccffbe684dd94e673ae12bc33e796b';
    var units = '&units=metric';
    $.get(url + token + units, function(data) {
      $('#current-temperature').text(data.main.temp);
    });
  };
});