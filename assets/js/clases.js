class Animal{
    constructor(nombre,edad,img,comentarios,sonido){
        this.nombre = nombre;
        this.edad = edad;
        this.img = img;
        this.comentarios = comentarios;
        this.sonido = sonido;
    }
    get getNombre(){
        return this.nombre;
    }
    get getEdad(){
        return this.edad;
    }
    get getImg(){
        return this.img;
    }
    set setComentarios(comentarios){
        this.comentarios = comentarios;
    }
    get getSonido(){
        return this.sonido;
    }
}

class Leon extends Animal{
    constructor(nombre,edad,img,comentarios,sonido){
        super(nombre,edad,img,comentarios,sonido);
    }
    rugir(){
        let reproductor = document.getElementById('player');
        console.log('El león ruge... RAARRRR!!');
        reproductor.play();
    }
}

class Lobo extends Animal{
    constructor(nombre,edad,img,comentarios,sonido){
        super(nombre,edad,img,comentarios,sonido);
    }
    aullar(){
        let reproductor = document.getElementById('player');
        console.log('El lobo aulla... AUUUUUU!!');
        reproductor.play();
    }
}

class Oso extends Animal{
    constructor(nombre,edad,img,comentarios,sonido){
        super(nombre,edad,img,comentarios,sonido);
    }
    grunir(){
        let reproductor = document.getElementById('player');
        console.log('El oso gruñe... GRRRRRR!!');
        reproductor.play();
    }
}
class Serpiente extends Animal{
    constructor(nombre,edad,img,comentarios,sonido){
        super(nombre,edad,img,comentarios,sonido);
    }
    sisear(){
        let reproductor = document.getElementById('player'); 
        console.log('La serpiente sisea... SSSSSSS!!');
        reproductor.play();
    }
}
class Aguila extends Animal{
    constructor(nombre,edad,img,comentarios,sonido){
        super(nombre,edad,img,comentarios,sonido);
    }
    chillar(){
        let reproductor = document.getElementById('player');
        console.log('El águila chilla... CHIIIEE!!');
        reproductor.play();
    }
}

export {Leon,Lobo,Oso,Serpiente,Aguila};

