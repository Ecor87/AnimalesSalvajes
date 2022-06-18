//Importa clases desde clases.js
import {Leon,Lobo,Oso,Serpiente,Aguila} from "./clases.js";

//Hace petición async a la API
const request = async (url) => {
    const results = await fetch(url);
    const response = await results.json();
    return response;
}
//Se crean variables con objetos vacíos para cada clase de animal, para poder ser usadas globalmente.
let leon = new Leon();
let lobo = new Lobo();
let oso = new Oso();
let serpiente = new Serpiente();
let aguila = new Aguila();

// Constantes y variables de la ubicación de API y respuesta esperada
const baseUrl = 'animales.json'; //Url API
let respApi = request(baseUrl);
let jsonApi = [];
respApi.then((res) => {
    jsonApi = res
})
.catch((err) => {console.log(`Error API: ${err}`)});

//IDs desde el formulario en DOM
let formAnimal = document.getElementById('animal');
let formEdad = document.getElementById('edad');
let formComentarios = document.getElementById('comentarios');

//Función valida datos del formulario
let formVerificar = (fNombre,fEdad,fComentario) => {
    let patron=/[a-zA-Z0-9]/gim;
    let verifNombre = patron.test(fNombre);
    let verifEdad = patron.test(fEdad);
    let verifComentario = patron.test(fComentario);
    if(verifNombre && verifEdad && verifComentario){
        return true;
    }
    else{
        return false;
    }
}

//Función que muestra previsualización de la imágen del animal
let divPreview = document.getElementById('preview');
let mostrarPreview = () => {
    let imagenJson = '';
    switch(formAnimal.value){
        case 'Leon':
            imagenJson = jsonApi.animales[0].imagen;
            break;
        case 'Lobo':
            imagenJson = jsonApi.animales[1].imagen;
            break;
        case 'Oso':
            imagenJson = jsonApi.animales[2].imagen;
            break;
        case 'Serpiente':
            imagenJson = jsonApi.animales[3].imagen;
            break;
        case 'Aguila':
            imagenJson = jsonApi.animales[4].imagen;
            break;
        default:
            break;
    }
    let urlImagen = `assets/imgs/${imagenJson}`;
    divPreview.innerHTML = `<img src="${urlImagen}" class="img-fluid" style="max-height: 100%;">`
}



//Se crea array vacío, a este luego se le hará push por cada clase de animal creada
let listaAnimales = [];

//Función que crea objeto de clase según formulario
const agregar = () => {
    let resultadoVerificacion = formVerificar(formAnimal.value,formEdad.value,formComentarios.value)    //envía valores del formulario a ser validados, retorna boolean
    if(formAnimal.value == 'Leon' && resultadoVerificacion){
        leon = new Leon(formAnimal.value,formEdad.value,jsonApi.animales[0].imagen,formComentarios.value,jsonApi.animales[0].sonido);
        crearCard(0);
        listaAnimales.push(leon); //hace push del objeto creado al array para acceder a él luego
    }
    if(formAnimal.value == 'Lobo' && resultadoVerificacion){
        lobo = new Lobo(formAnimal.value,formEdad.value,jsonApi.animales[1].imagen,formComentarios.value,jsonApi.animales[1].sonido);
        crearCard(1);
        listaAnimales.push(lobo);
    }
    if(formAnimal.value == 'Oso' && resultadoVerificacion){
        oso = new Oso(formAnimal.value,formEdad.value,jsonApi.animales[2].imagen,formComentarios.value,jsonApi.animales[2].sonido);
        crearCard(2);
        listaAnimales.push(oso);
    }
    if(formAnimal.value == 'Serpiente' && resultadoVerificacion){
        serpiente = new Serpiente(formAnimal.value,formEdad.value,jsonApi.animales[3].imagen,formComentarios.value,jsonApi.animales[3].sonido);
        crearCard(3);
        listaAnimales.push(serpiente);
    }
    if(formAnimal.value == 'Aguila' && resultadoVerificacion){
        aguila = new Aguila(formAnimal.value,formEdad.value,jsonApi.animales[4].imagen,formComentarios.value,jsonApi.animales[4].sonido);
        crearCard(4);
        listaAnimales.push(aguila);
    }
    else if(!resultadoVerificacion){
        alert('Se requiere llenar todos los campos del formulario');
        return; //Evita que se vacíe el formulario si no crea la card por fallo en la validación
    }
    //Vacía formulario una vez se crea la card
    formAnimal.value = '';
    formEdad.value = '';
    formComentarios.value = '';
    divPreview.innerHTML = '';
}

//-- Funcion que crea tarjeta según el valor enviado por la función agregar
let crearCard = (valor) => {
    let imagen = jsonApi.animales[valor].imagen;
    let idCard = listaAnimales.length;      //la variable idCard pasa como id de la imagen de la tarjeta al DOM, luego se usa para devolver la posición en el array listaAnimales correspondiente a cada tarjeta
    document.getElementById('Animales').innerHTML += `
        <div class="card bg-dark"  style="width: 19%;">
            <img src="assets/imgs/${imagen}" class="card-img-top tarjetaAnimales" id="${idCard}" alt="...">  
            <div class="card-body p-2">
                <input type="image" width="15%" src="assets/imgs/audio.svg" class="play-${idCard}" id="buttonPlay">
            </div>
        </div>
    `
}
$(document).ready (function(){
    //-- Función que muestra modal del animal al hacer click sobre la imágen de la tarjeta
    //Registra evento de hacer click sobre alguna imágen de tarjeta y genera modal con la información correspondiente a ese animal
    $(document).on('click','.tarjetaAnimales',function(){
        var id = $(this).attr('id');
        console.log(listaAnimales[id]);
        $('.modal-content').addClass('text-light text-center')
        $('.modal-body').html(`
            <img src="assets/imgs/${listaAnimales[id].img}" width=100% alt="">
            <div class="pt-2">
                <h6>${listaAnimales[id].edad}</h6>
                <h6>Comentarios</h6>
                <p>${listaAnimales[id].comentarios}</p>
            </div>
        `);
        $('#exampleModal').modal('show');
    });

    //-- Función que reproduce el sonido del animal
    //Registra evento de hacer click sobre el boton de play y reproduce el sonido del animal correspondiente
    $(document).on('click','#buttonPlay',function(){
        var playClass = $(this).attr('class');      //Devuelve las clases del botón presionado y la guarda en variable
        var playSonido = playClass.split('-');      //Divide el string de clases en los lugares que contenga guión y lo guarda en array, el elemento en el index 1 es el que nos interesa, es el mismo que la id de la card y nos permite saber a que elemento del array listaAnimales corresponde esta card en particular
        $('#player').attr(
            "src",`assets/sounds/${listaAnimales[playSonido[1]].sonido}`    //Asigna al elemento del DOM con id "player" la ubicación del sonido según el array listaAnimales
        );
        let animalSonido = listaAnimales[playSonido[1]].nombre;
        switch (animalSonido){ //Switch busca el nombre del elemento correspondiente en el array listaAnimales y llama a método para reproducir el sonido de la clase de animal correspondiente  
            case 'Leon':
                leon.rugir();
                break;
            case 'Lobo':
                lobo.aullar();
                break;
            case 'Oso':
                oso.grunir();
                break;
            case 'Serpiente':
                serpiente.sisear();
                break;
            case 'Aguila':
                aguila.chillar();
                break;
            default:
                console.log('Switch default');
        }
    });
});

let botonAgregar = document.getElementById('btnRegistrar');
botonAgregar.addEventListener('click',agregar);
formAnimal.addEventListener('change',mostrarPreview);
