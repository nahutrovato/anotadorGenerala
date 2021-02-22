  
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'Anotador de Generala',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
        {path: '/anotador/',        url: 'anotador.html',},
        {path: '/index/',        url: 'index.html',},
    ]
    // declare rutas fundamental
  });
// se inicializa la app
var mainView = app.views.create('.view-main');
// declare variables globales a usar mas abajo
var nomPlayer1 = "";
var nomPlayer2 = "";
var arrayPuntos = new Array(2);// array de dos casilleros, en el cual le meti 11 divisiones a cada casillero ambos array
arrayPuntos[0] = new Array(11);// array columna puntaje jdor 1
arrayPuntos[1] = new Array(11);// columna puntaje jugador 2
var puntajePlayer1 = 0;
var puntajePlayer2 = 0;
// vuelve a valor cero el puntaje, el nom jugador, y los totales de fondo es decir las variables las vuelve a cero
function inicializarVariables(){
    console.log("inicializarVariables");
    for(i=0;i<11;i++){
        arrayPuntos[0][i]=0;
        arrayPuntos[1][i]=0;
    };
    puntajePlayer1=0;
    puntajePlayer2=0;
    nomPlayer1="";
    nomPlayer2="";
};
// inicializa variables ni bien arrancas la app
// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
    inicializarVariables();
});
// cuando se carga la página index EL EVENTO PAGE INIT ejecuta sentecias de ABAJO, CAJAS DE TEXTO INPUTS
$$(document).on('page:init', '.page[data-name="index"]', function (e) {
    console.log(e);
    console.log('page init index');
    $$("#inJugar").on('click', function() {
        console.log('click en jugar');
        if($$("#inomP1").val() != "" && $$("#inomP2").val() != ""){
            nomPlayer1 = $$("#inomP1").val();
            nomPlayer2 = $$("#inomP2").val();
            mainView.router.navigate('/anotador/');
        }else{
            app.dialog.alert("Completa todo los campos","Atención");
        };        
    });
});
// página anotador EL EVENTO PAGE INIT ejecuta  las sentecias de ABAJO, se cargan los botones, 
//y los nombres de los jugadores, provenientes del index
$$(document).on('page:init', '.page[data-name="anotador"]', function (e) {
    console.log(e);
    console.log('page init anotador');

    $$("#anomP1").text(nomPlayer1);
    $$("#anomP2").text(nomPlayer2);

// funcion para calcular el puntaje de cada jugador sumando los valores del array
//que representa los puntos de la jugadas de cada jugador
    function calcularPuntaje(){
        console.log('calcularPuntaje');
        puntajePlayer1=0;//variable local que representa el total del pje jugador 1
        puntajePlayer2=0;//variable local que representa el total del pje jugador 2
        for(var i=0; i<11; i++){
            puntajePlayer1+=arrayPuntos[0][i];

            console.log('array   ' + arrayPuntos[0][i]);

            puntajePlayer2+=arrayPuntos[1][i]; 
        };
//entre corchetes se ubicaran las coordenadas primera cordenada jugador, segunda coordenasa jugada
//recorre el puntaje de ambos jugadores y los sume mediante un array individual para c/u
        console.log('puntajePlayer1   ' + puntajePlayer1);
    };
//inicializa los valores de la pantalla anotador incluido el array, cuando hago click en LIMPIAR, le coloca un guion a os botones y un 0 al total
    function limpiarAnotador(){
        console.log('limpiarAnotador');
        for(i=0;i<11;i++){
            $$("#anJ" + (i + 1) + "P" + 1).text("-");
            $$("#anJ" + (i + 1) + "P" + 2).text("-");
            arrayPuntos[0][i] = 0;
            arrayPuntos[1][i] = 0; 
        }
        $$("#anTotP1").text("-");
        $$("#anTotP2").text("-");
    };
//declaro variables locales, en esta funcion calculo los puntos con una operacion aritmetica
//factores a tener en cuenta, el tipo de juego y el resultado (seleccion) de ambos jugadores
    function asignarPuntos(juego, player, seleccion){
        console.log('asignarPuntos');
        var operador1 = 0;
        var puntos = 0;
//otorgo un valor al operador 1, segun el tipo de juego, 
//del 1 al 6 los ptjes son multiplos del dado que sale, puntaje sera igual a la cantidad de dados con mismo nro por el dado que sale
//los otros tipos de juego ej escalera u otros son multiplos de 5, a cada juego le otrogo un numero de operador lo * 5 en caso de servido, 
//si fuera no servido a esa resultado de servido se le resta 5
        switch(juego){
            case 1: operador1 = 1; break;
            case 2: operador1 = 2; break;
            case 3: operador1 = 3; break;
            case 4: operador1 = 4; break;
            case 5: operador1 = 5; break;
            case 6: operador1 = 6; break;
            case 7: operador1 = 5; break;
            case 8: operador1 = 7; break;
            case 9: operador1 = 9; break;
            case 10: operador1 = 11; break;
            case 11: operador1 = 13; break;
        };

        switch(seleccion){
            case "Servido": puntos = operador1 * 5; break;
            case "No Servido": puntos = operador1 * 5 - 5; break;
            case "Tachar": puntos = 0; break;
            case "Uno": puntos = operador1 * 1; break;
            case "Dos": puntos = operador1 * 2; break;
            case "Tres": puntos = operador1 * 3; break;
            case "Cuatro": puntos = operador1 * 4; break;
            case "Cinco": puntos = operador1 * 5; break;
            case "Seis": puntos = operador1 * 6; break;
        };
//los puntos que calcule recien, los asigno a una posicion en el array determinada por jugador y por juego ej: jugador 1 posee posicion 0

        arrayPuntos[player-1][juego-1] = puntos;

        var texto = "";//esto es para el caso en el que los puntos sean 0 se asigna"x" a la variable texto y sino se asiga los puntos
        if(seleccion=="Tachar"){texto = "x"}else{texto = puntos};
        $$("#anJ" + juego + "P" + player).text(texto);
//pone el puntaje del jdor 1 y 2 en los botones respectivos de cada columna
        calcularPuntaje();
        $$("#anTotP1").text(puntajePlayer1);
        $$("#anTotP2").text(puntajePlayer2);
    };
    // DAS CLICK EN TERMINAR, e inicializa las variables puntajes y me retorna al index con el main view router navigate
    $$("#anTerminar").on('click', function() {
        console.log('click en terminar');
        calcularPuntaje();
        app.dialog.confirm(nomPlayer1 + " : " + puntajePlayer1 + "<br/>" + nomPlayer2 + " : " + puntajePlayer2,"Puntuaciones",function(){
            inicializarVariables();
            mainView.router.navigate('/index/');
        });
    });
// CUANDO DOY CLICK EN FLECHA HACIA ATRAS, ME LIMPIA EL ANOTADOR Y ME LLEVA A INDEX, en el medio aparece el dialog confirm c/un mensaje
    $$("#anFlechaBack").on('click', function() {
        console.log('click en flecha back');
        app.dialog.confirm("","¿Volver? Se borrarán los puntos",function(){
            limpiarAnotador();
            mainView.router.navigate('/index/');
        });
    });
//doy click en btn limpiar y llama a esta funcion limpiando el anotador
    $$("#anLimpiar").on('click', function() {
        console.log('click en limpiar');
        app.dialog.confirm(" ","¿Limpiar anotador?",function(){
            console.log('LIMPIAR ANOTADOR');
            limpiarAnotador();
        });
    });
//IMPORTANTE action sheet, tengo dos, la primera para los dados y la segunda para las jugadas
//todos los botones con clase ac-1 poseen este evento on click (todos los botones donde se cargan los ptjes de los dados)
    $$(".ac-1").on("click",function(){
        console.log('click en botones ac-1');

//rescato los datos de data-juego y data-player (saber juego y jugador) y los meto en dos variables locales juego y player
//el parseInt convierte el texto a un num entero

        var juego = parseInt($$(this).data("juego"));
        var player = parseInt($$(this).data("player"));
//creo el action sheet una hoja que emerge de abajo, posee un titulo y botones, f7 los crea a traves de una accion (action create)
//ademas de tener un nombre cada boton tiene un parametro que se llama onclick el cual le indica al boton que hacer cuando se clickea en el mismo
//cada boton en este caso tiene una proposito que es llamar a la funcion asignar puntos declarada linea 108 teniendo en cuenta(juego, jugador y seleccion)
//recurro al switch seleccion, el cual calcula los puntajes para cada caso de seleccion, numero de dados (linea 130)
var ac1 = app.actions.create({
    buttons: [
        {
            text: 'Dado ' + juego,
            label: true 
        },
        {
            text: this,
            onClick: function(){
                console.log('selecciona el juego Uno');
                asignarPuntos(juego, player, this);
            }
        },
]
});


/* var ac1 = app.actions.create({
            buttons: [
                {
                    text: 'Dado ' + juego,
                    label: true 
                },
                {
                    text: 'Uno',
                    onClick: function(){
                        console.log('selecciona el juego Uno');
                        asignarPuntos(juego, player, 'Uno');
                    }
                },
                {
                    text: 'Dos',
                    onClick: function(){
                        console.log('selecciona el juego Dos');
                        asignarPuntos(juego, player, 'Dos');
                    }
                },
                {
                    text: 'Tres',
                    onClick: function(){
                        console.log('selecciona el juego Tres');
                        asignarPuntos(juego, player, 'Tres');
                    }
                },
                {
                    text: 'Cuatro',
                    onClick: function(){
                        console.log('selecciona el juego Cuatro');
                        asignarPuntos(juego, player, 'Cuatro');
                    }
                },
                {
                    text: 'Cinco',
                    onClick: function(){
                        console.log('selecciona el juego Cinco');
                        asignarPuntos(juego, player, 'Cinco');
                    }
                },
                {
                    text: 'Tachar',
                    onClick: function(){
                        console.log('selecciona el juego Tachar');
                        asignarPuntos(juego, player, 'Tachar');
                    }
                },
            ]
        }); */

//abre el action sheet de dados
        ac1.open();
    });
//todos los botones con clase ac-2 poseen este evento on click (todos los botones donde se cargan los ptjes de las jugadas)
    $$(".ac-2").on("click",function(){
        console.log('click en botones ac-2');
//rescato los datos de data-juego y data-player (saber juego y jugador) y los meto en dos variables locales juego y player
//el parseInt convierte el texto a un num entero

        var juego = parseInt($$(this).data("juego"));
        var player = parseInt($$(this).data("player"));
        var juegoText = "";
//variable local texto del tipo de jugada
//a cada caso le otorgo un valor de texto al juegotext con el switch

        switch(juego){
            case 7:
                juegoText = "Escalera";
                break;
            case 8:
                juegoText = "Full";
                break;
            case 9:
                juegoText = "Poker";
                break;
            case 10:
                juegoText = "Generala";
                break;
            case 11:
                juegoText = "D. Generala";
                break;
        };
//creo el action sheet una hoja que emerge de abajo, posee un titulo y botones, f7 los crea a traves de una accion (action create)
//ademas de tener un nombre cada boton tiene un parametro que se llama onclick el cual le indica al boton que hacer cuando se clickea en el mismo
//cada boton en este caso tiene una proposito que es llamar a la funcion asignar puntos declarada linea 108 teniendo en cuenta(juego, jugador y seleccion)
//recurro al switch seleccion, el cual calcula los puntajes para cada caso de seleccion, servido, no servido y tachar (linea 130)
        var ac2 = app.actions.create({
                buttons: [
                    {
                        text: 'Juego ' + juegoText,
                        label: true
                    },
                    {
                        text: 'Servido',
                        onClick: function(){
                            console.log('selecciona el juego Servido');
                            asignarPuntos(juego, player, 'Servido');
                        }
                    },
                    {
                        text: 'No Servido',
                        onClick: function(){
                            console.log('selecciona el juego No Servido');
                            asignarPuntos(juego, player, 'No Servido');
                        }
                    },
                    {
                        text: 'Tachar',
                        onClick: function(){
                            console.log('selecciona el juego Tachar');
                            asignarPuntos(juego, player, 'Tachar');
                        }
                    },
                ],
                
            });
//abre el action sheet de tipo de jugada
        ac2.open();
    });
});



