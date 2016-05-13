'use strict';

describe('Thermostat', function(){
  var thermostat;

beforeEach(function(){
    thermostat = new Thermostat();
  });

  describe('Defaults for thermostat', function() {
    it('has a starting temperature of 20 degrees', function(){
      expect(thermostat.getTemperature()).toEqual(20);
    });

    it('has a minimum temperature of 10 degrees', function(){
      for (var i = 0; i < 12; i++) {
        thermostat.decreaseTemp();
      }
      expect(thermostat.getTemperature()).toEqual(10);
    });
  });

  describe('Changes to thermostat', function() {
    it('can increase the temerature', function() {
      for (var i = 0; i < 3; i++) {
        thermostat.increaseTemp();
      }
      expect(thermostat.getTemperature()).toEqual(23);
    });

    it('can decrease the temerature', function() {
      for (var i = 0; i < 5; i++) {
        thermostat.decreaseTemp();
      }
      expect(thermostat.getTemperature()).toEqual(15);
    });

    it('can be reset', function() {
      for (var i = 0; i < 3; i++) {
        thermostat.increaseTemp();
      }
      expect(thermostat.resetTemperature()).toEqual(20);
    });
  });

  describe('Energy Usage', function() {
    it('Shows "Low Usage" when temperature is less than 18', function(){
      for (var i = 0; i < 3; i++) {
        thermostat.decreaseTemp();
      }
      expect(thermostat.energyUsage()).toEqual("Low Usage");
    });
    it('Shows "Medium Usage" when temperature is less than 25', function(){
      for (var i = 0; i < 4; i++) {
        thermostat.increaseTemp();
      }
      expect(thermostat.energyUsage()).toEqual("Medium Usage");
    });
    it('Shows "High Usage" when temperature is greater than 24', function(){
      for (var i = 0; i < 5; i++) {
        thermostat.increaseTemp();
      }
      expect(thermostat.energyUsage()).toEqual("High Usage");
    });
  });

  describe('Power Saving Mode', function() {
    it('has power saving mode on by default', function() {
      expect(thermostat.isPowerSavingModeOn()).toBe(true);
    });

    it('can switch PSM on and off', function() {
      thermostat.switchPowerSavingModeOff();
      expect(thermostat.isPowerSavingModeOn()).toBe(false);
      thermostat.switchPowerSavingModeOn();
      expect(thermostat.isPowerSavingModeOn()).toBe(true);
    });

    it('when on has a maximum temperature of 25 degrees', function() {
      for (var i = 0; i < 10; i++) {
        thermostat.increaseTemp();
      }
      expect(thermostat.getTemperature()).toEqual(25);
    });

    it('when off has a maximum temperature of 32 degrees', function() {
      thermostat.switchPowerSavingModeOff();
      for (var i = 0; i < 20; i++) {
        thermostat.increaseTemp();
      }
      expect(thermostat.getTemperature()).toEqual(32);
    });
  });
});