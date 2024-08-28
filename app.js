
const encriptadorImagen = document.querySelector(".imagen__muñeco");
const encriptadorSalidaTitulo = document.querySelector(".texto__salida");
const encriptadorSalidaSubtitulo = document.querySelector(".texto__salida__encriptador");
const textoEntrada = document.querySelector(".texto__ingresar");
const textoSalida = document.getElementById("texto__resultado");
const botonSalida = document.getElementById("contenido__boton__copiar");
let resultado ="";


const estadoOriginal = {
    encriptadorImagenClass: encriptadorImagen.className,
    encriptadorSalidaTituloClass: encriptadorSalidaTitulo.className,
    encriptadorSalidaSubtituloClass: encriptadorSalidaSubtitulo.className,
    textoSalidaClass: textoSalida.className,
    botonSalidaClass: botonSalida.className,
    botonSalidaText: botonSalida.innerText,
}


function encriptarTexto() {
    
    const texto = textoEntrada.value;
    
    if (comprobarTextoEntrada(texto)) {
        return; 
    }
    
    const encriptacion = {
        "e": "enter",
        "i": "imes",
        "a": "ai",
        "o": "ober",
        "u": "ufat",
    }

    
    let textoEncriptado = "";
    
    for (const char of texto) {
        if (encriptacion[char]) {
            textoEncriptado += encriptacion[char];
        } else {
            textoEncriptado += char;
        }
    }

    
    prepararSalida();
    textoSalida.innerHTML = textoEncriptado;
    resultado = textoEncriptado; 

    
    textoEntrada.value = "";
    textoEntrada.setAttribute("placeholder", "Ingrese el texto aquí");
}


function desencriptarTexto() {
    
    const texto = textoEntrada.value;

    
    if (comprobarTextoEntrada(texto)) {
        return; 
    }

    
    const desencriptacion = {
        "enter": "e",
        "imes": "i",
        "ai": "a",
        "ober": "o",
        "ufat": "u",
    }

    
    let textoDesencriptado = texto;

    for (const [clave, valor] of Object.entries(desencriptacion)) {
        
        textoDesencriptado = textoDesencriptado.replaceAll(clave, valor);
    }

   
    prepararSalida();
    textoSalida.innerHTML = textoDesencriptado;
    resultado = textoDesencriptado;

    textoEntrada.value = "";
    textoEntrada.setAttribute("placeholder", "Ingrese el texto aquí");
}



function comprobarTextoEntrada(texto) {
    
    texto = texto.trim();

    
    const regex = /[A-ZÁÉÍÓÚÜÑáéíóúüñ!@#$%^&*(),.?":{}|<>0123456789]/;

    
    if (texto === "" || regex.test(texto)) {
        revertirCambios();
        
        textoEntrada.value = "";
        
        textoEntrada.setAttribute("placeholder", texto === "" 
            ? "El campo no puede estar vacío." 
            : "Intenta nuevamente sin mayúsculas ni carácteres especiales.");
        return true; 
    }

    
    return false;
}


function copiar(texto) {
   
    navigator.clipboard.writeText(texto);
    
    botonSalida.innerText= "Copiado";
}


function prepararSalida() {
 
    encriptadorImagen.className = "negativo";
    encriptadorSalidaTitulo.className = "negativo";
    encriptadorSalidaSubtitulo.className = "negativo";
   
    textoSalida.className = "texto__resultado";
    botonSalida.className = "contenido__boton__copiar";
    botonSalida.innerText = "Copiar";
    return;
}


function revertirCambios() {
    encriptadorImagen.className = estadoOriginal.encriptadorImagenClass;
    encriptadorSalidaTitulo.className = estadoOriginal.encriptadorSalidaTituloClass;
    encriptadorSalidaSubtitulo.className = estadoOriginal.encriptadorSalidaSubtituloClass;
    textoSalida.className = estadoOriginal.textoSalidaClass;
    botonSalida.className = estadoOriginal.botonSalidaClass;
    botonSalida.innerText = estadoOriginal.botonSalidaText;
    return;
}



