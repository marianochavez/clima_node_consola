const axios = require("axios");

class Busquedas {
  constructor() {
    // TODO: leer db si existe
  }

  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: "es",
    };
  }

  async ciudad(lugar = "") {
    try {
      // Peticion http
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMapbox,
      });

      const resp = await instance.get();

      return resp.data.features.map((lugar) => ({
        id: lugar.id,
        nombre: lugar.place_name,
        longitud: lugar.center[0],
        latitud: lugar.center[1],
      }));
    } catch (error) {
      console.log(error);
    }
  }

  get paramsOpenweather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: "metric",
      lang: "es",
    };
  }

  async climaLugar(lat, lon) {
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: {...this.paramsOpenweather,lat,lon}
      });

      const resp = await instance.get();
      const {weather,main,wind} = resp.data
 
      return {
        descripcion: weather[0].description,
        temp_actual: main.temp,
        temp_min: main.temp_min,
        temp_max: main.temp_max,
        humedad: main.humidity,
        vel_viento: wind.speed,
      };
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Busquedas;
 