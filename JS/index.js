let opcion, cantPublicaciones;
let ofertaCargadas=0, cantOfertas=0, oferta, nombreProveedor;
let nombre, origen, destino, fechaVto, Presupuesto;

const agreagarPublicacion = () => {
    cantPublicaciones+=1;
}
const agreagarOferta = () => {
    cantOfertas+=1;
}

do {
    opcion=parseInt(prompt("------Menu------\n1-/Cargar Publicación \n2-/Cargar Oferta \n0-/Salir \nOpcion: "));    

    switch (opcion) {
        case 1:            
            alert("Ingrese la siguiente informacion de la publicación");
            nombre = prompt("Nombre de la publicación:","Envío caja Rosario a La Plata");
            origen = prompt("Ciudad Origen", "Rosario, Santa Fe");
            destino = prompt("Ciudad Destino", "La Plata, Buenos Aires");
            fechaVto=prompt("Fecha Vto de la publicación", "31/12/2022");
            Presupuesto=parseFloat(prompt("Presupuesto límite"));

            agreagarPublicacion();
            break;
        case 2:
            if (cantPublicaciones == null || cantPublicaciones =="") {
                alert("Primero cargue una publicación"); 
            } else {
                nombreProveedor=prompt("Indique su nombre");
                oferta = parseFloat(prompt("Ingrese su oferta para la publicación <"+nombre+">"));
                agreagarOferta();
            }
            break;
        default:
            break;
    }
    if (cantOfertas != null && cantOfertas != "") {
        opcion=0;   
        ofertaCargadas=1;     
    }else{
        alert("Usted no completó la carga de datos.");        
    }    
} while (opcion>0);

if(ofertaCargadas){
    alert("------------------------------------\nPUBLACIÓN\n------------------------------------\nPublicación: "+nombre+
        "\nOrigen: "+origen+
        "\nDestino: "+destino+
        "\nPresupuesto: "+Presupuesto+
        "\n------------------------------------\nOFERTAS\n------------------------------------\nCantidad de Ofertas: "+cantOfertas+
        "\nProveedor <"+nombreProveedor+"> Oferta: "+oferta);
    
}

alert("Gracias, vuelva prontos!");
