//importar el metodo format de timeago.js
const { format } = require('timeago.js');

//crear un objeto
const helpers = {};
//Definir un metodo timeago para el objeto helpers 
helpers.timeago = (timestamp) => {
    //utilizar el metodo format para formatear el timestamp que se recibe como parametro
    return format(timestamp);
};

module.exports = helpers;
