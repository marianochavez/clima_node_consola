require("dotenv").config();

const {
  leerInput,
  insquirerMenu,
  pausa,
  listarLugares,
} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async () => {
  const busquedas = new Busquedas();
  let opt;

  do {
    opt = await insquirerMenu();

    switch (opt) {
      case 1:
        // Mostrar mensaje
        const terminoBusqueda = await leerInput("Ciudad: ");

        // Buscar los lugares
        const lugares = await busquedas.ciudad(terminoBusqueda);

        // Seleccionar el lugar
        const id = await listarLugares(lugares);
        const lugarSel = lugares.find((l) => l.id === id);
        // Clima
        const clima = await busquedas.climaLugar(lugarSel.latitud, lugarSel.longitud);
        
        // Mostrar resultados
        console.log("\nInformación de la ciudad\n".green);
        console.log("Ciudad:", lugarSel.nombre.green);
        console.log("Latitud:", lugarSel.latitud);
        console.log("Longitud:", lugarSel.longitud);
        console.log("Temp. Actual:", clima.temp_actual);
        console.log("Temp. Máxima:", clima.temp_max);
        console.log("Temp. Mínima:", clima.temp_min);
        console.log('Descripción:', clima.descripcion.toUpperCase().yellow);
        console.log('Humedad:', clima.humedad);
        console.log('Velocidad del viento:', clima.vel_viento, 'Km/h');
        break;
    }

    if (opt !== 0) await pausa();
  } while (opt !== 0);
};

main();
