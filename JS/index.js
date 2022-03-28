let opcion, cantPublicaciones, nuevaPublicacion;
let nombre, origen, destino, fechaVto, Presupuesto;
let ofertaCargadas=0, cantOfertas=0, oferta, nombreProveedor, nuevaOferta;
let maxIdPublicacion=0;

const publicaciones = [];
const ofertas = [];

class Publicacion {
    constructor(nombre, origen, destion, fechaVto, presupuesto){
        this.id = maxIdPublicacion+1;
        this.nombre = nombre;
        this.origen = origen;
        this.destino = destino;
        this.fechaVto = fechaVto;
        this.presupuesto = presupuesto;
    }
    agregarPublicacion(){
        cantPublicaciones+=1;
        maxIdPublicacion+=1;
    }
}
class Oferta{
    constructor(idPublicacion,nombreProveedor,oferta){
        this.idPublicacion=idPublicacion
        this.nombreProveedor=nombreProveedor
        this.oferta=oferta
    }
    agregarOferta(){
        cantOfertas+=1;
    }
}
let  strMensaje="";publicConOferta=0;
const mostarPublicacionesYOfertas = (actualizaString=0, mostarOfertas=0) => {
    let strTemp="";//=strMensaje;    
    if(publicaciones.length<1){
        strTemp="No se cargaron publicaciones aun.";
    }
    for(const p of publicaciones){
        strTemp=strTemp+"------------------------------------\nPUBLICACION\n------------------------------------\n";
        strTemp=strTemp+"["+p.id+"]\n'"+p.nombre+"'\nOrigen: "+p.origen+"\nDestino: "+p.destino+"\nFechaVto: "+p.fechaVto+"\nPresupuesto: "+p.presupuesto+"\n";
        
        if(mostarOfertas==1){
            strTemp=strTemp+"------------------------------------\nOFERTAS\n------------------------------------\n";
            //ordeno por la mejor oferta antes de recorrer y armar el string.
            ofertas.sort((a,b) => a.oferta - b.oferta);
            for(const o of ofertas){
                if(p.id==o.idPublicacion){
                    publicConOferta=1;
                    strTemp=strTemp+"Proveedor: '"+o.nombreProveedor+"'\nOferta: "+o.oferta+"\n";
                }
            }
            if(publicConOferta==0)
            {
                strTemp=strTemp+"--SIN OFERTAS--\n";
            }
            strTemp=strTemp+"------------------------------------\n\n";
        }        
    }
    if(actualizaString==1){
        //strTemp.sort((a,b) => b.Oferta.Oferta-a);
        strMensaje=strTemp;
    }
    alert(strTemp); 
    console.clear();
    console.log(strTemp);
}

do {
    opcion=parseInt(prompt("------------------------------------\nMENU\n------------------------------------\n1-/Cargar Publicación\n2-/Ver Publicaciones\n3-/Cargar Oferta \n0-/Salir \nOpcion: "));    

    switch (opcion) {
        case 1:   
            let titulo="Ingrese la siguiente informacion de la publicación\n\n";
            nombre = prompt(titulo+"Nombre de la publicación:","Envío caja Rosario a La Plata");
            origen = prompt(titulo+"Ciudad Origen", "Rosario, Santa Fe");
            destino = prompt(titulo+"Ciudad Destino", "La Plata, Buenos Aires");
            fechaVto=prompt(titulo+"Fecha Vto de la publicación", "31/12/2022");
            presupuesto=parseFloat(prompt(titulo+"Presupuesto límite"));
            //Reemplazo la entrega anterior por instancias de clases, sus metodos y los agrego a un Array
            nuevaPublicacion=new Publicacion(nombre, origen, destino, fechaVto, presupuesto);
            publicaciones.push(nuevaPublicacion);
            nuevaPublicacion.agregarPublicacion(); 
            mostarPublicacionesYOfertas(1,1);           
            break;
        case 2:
            mostarPublicacionesYOfertas(0,1);            
            break;
        case 3:
            if (cantPublicaciones == null || cantPublicaciones =="") {
                alert("No existen publicaciones a ofertar."); 
            } else {
                let idPublic=0, idPublicaValido=0, busquedaPublic;
                do {
                    //Muestro todas las publicaciones al proveedor
                    mostarPublicacionesYOfertas(0,1);     
                                        
                    idPublic=prompt("Indique la publicacion a ofertas:");
                
                    if(parseInt(idPublic)==0)
                    {
                        alert("Ingrese un N° de Publicacion válido");
                        mostarPublicacionesYOfertas(0,1);     
                    }
                    else
                    {
                        //Busco en el array de publicaciones la opción ingresada
                        if(publicaciones.find((el)=>el.id==idPublic)){
                            idPublicaValido=1;                           
                            //Le doy la posibilidad de cambiar de Publicación antes de realizar una oferta
                            busquedaPublic=publicaciones.filter((el)=>el.id==idPublic);
                            let opcion=parseInt(
                                                prompt("Usted seleccionó la publicacion '"+busquedaPublic.nombre+
                                                "'\n\n¿Desea cambiar su selección? [0-No/1-Si]")
                                                );
                            if(opcion==1)
                            {
                                idPublicaValido=0;
                            }
                        }                        
                        else
                        {//Controlo si terminó de recorrer el array y no encontró el ID
                            alert("La opción ingresada no estaba entre las posibles");
                        }
                    }
                } while (idPublicaValido==0); 
                if(idPublic!=null && idPublic>0)
                {
                    nombreProveedor=prompt("Indique su Nombre/Razon Social");
                    oferta = parseFloat(prompt("Ingrese su oferta para la publicación"));
                    //Reemplazo la entrega anterior por instancias de clases, sus metodos y los agrego a un Array
                    nuevaOferta=new Oferta(idPublic, nombreProveedor, oferta);
                    ofertas.push(nuevaOferta);
                    nuevaOferta.agregarOferta();
                    mostarPublicacionesYOfertas(1,1);
                }
                else{
                    alert("No se encontró el idPublic")
                };
            }
            break;
        default:
            break;
    }
    if (cantOfertas != null && cantOfertas != "") {          
        ofertaCargadas=1;     
    }
} while (opcion>0);

if(ofertaCargadas){    
    mostarPublicacionesYOfertas(0,1);       
}

alert("Gracias, vuelva pronto!");
