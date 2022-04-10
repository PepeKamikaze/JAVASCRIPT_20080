let opcion, cantPublicaciones, nuevaPublicacion;
let nombre, origen, destino, fechaVto, Presupuesto;
let ofertaCargadas=0, cantOfertas=0, oferta, nombreProveedor, nuevaOferta;
let maxIdPublicacion=0;
//----------Variables para trabajar con DOM-------------------------------
let divPasos = document.getElementById('divpasos');

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

/*

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
            
            //DOM            
            let ulPasos = document.createElement('ul');
            ulPasos.className=`pasos`;
            ulPasos.innerHTML = `<li class="paso1"><strong>Paso 1: Cargar Publicación </strong></li>
                                <li class="oculto"><strong>Paso 2: Cargar Oferta </strong></li>
                                    `;
            divPasos.append(ulPasos);
            console.log(divPasos);
            
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
                    
                    document.getElementsByClassName("oculto").className = "visible";
                    
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
console.log(divPasos);

let sectionNewService = document.getElementById("sectionNewService");
let btnNewService = document.getElementById("btnNewService");

btnNewService.onclick = (e) =>{
    let newService = document.createElement("p");
    let sectionNewService = document.getElementById("sectionNewService");
    newService.textContent="Nuevo Servicio";
    sectionNewService.appendChild(newService);
}
*/
let btnLogin = document.getElementById("btnLogin");

btnLogin.onclick = (e) =>{
    let chkRememberUser = document.getElementById("chkRememberUser");    
    let user=document.getElementById("loginUser").value;
    if(user === "null")
    {
        alert("Ingrese un usuario");        
    }
    else
    {
        console.log(user);
        if(chkRememberUser.checked===true)
        {
            localStorage.setItem("usuario",user);
        }
        else
        {
            sessionStorage.setItem("usuario",user);
        }          
    }    
}


let filters = document.getElementById("filters");
let btnClearFilters = document.getElementById("btnClearFilters");
/*
btnClearFilters.onclick = (e) =>{
   let filterOrigin = getElementById("filterOrigin");
   filterOrigin.innerText="";
   filters.append(filterOrigin);
   
   let destination = getElementById("filterdestination");
   destination.innerText="";
   let dateEnd = getElementById("filterDateEnd");
   dateEnd.innerText="";
   let myServices = getElementById("filterMyServices");
   myServices.setSelected(false);
}
*/


let btnAddServiceBlank = document.getElementById("btnAddServiceBlank");
let jsonNewPublish;

btnAddServiceBlank.onclick = (e) =>{
    
    let listaServicios = document.getElementById("sectionListServices");

    let lblNameService= document.createElement("label");
    lblNameService.innerText="Nombre ";
    let nameService = document.createElement("input");
    lblNameService.appendChild(nameService);

    let lblorigin = document.createElement("label");
    lblorigin.innerText="Origen ";
    let origin = document.createElement("input");
    lblorigin.appendChild(origin);

    let lblDestination = document.createElement("label");
    lblDestination.innerText="Destino ";
    let destination = document.createElement("input");
    lblDestination.appendChild(destination);

    let lblDateEnd = document.createElement("label");
    lblDateEnd.innerText="Fecha Fin";
    let dateEnd = document.createElement("input");
    lblDateEnd.appendChild(dateEnd);

    let lblBadget = document.createElement("label");
    lblBadget.innerText="Presupuesto";
    let badget = document.createElement("input");
    lblBadget.appendChild(badget);

    let btnPublishService = document.createElement("button");
    btnPublishService.innerText="Publicar";

    //Agrego un salto
    let jumpNewServiceIni = document.createElement("br");
    listaServicios.appendChild(jumpNewServiceIni);

    listaServicios.appendChild(lblNameService);
    listaServicios.appendChild(lblorigin);
    listaServicios.appendChild(lblDestination);
    listaServicios.appendChild(lblDateEnd);
    listaServicios.appendChild(lblBadget);
    listaServicios.appendChild(btnPublishService);
    let jumpNewServiceEnd = document.createElement("br");
    listaServicios.appendChild(jumpNewServiceEnd);

    nameService.value="nombre";
    origin.value="rosario";
    destination.value="CABA";
    dateEnd="01/01/2022";
    badget="123.00";
    let nuevaPublicacion=new Publicacion(nameService, origin, destination, dateEnd, badget);
    jsonNewPublish = JSON.stringify(nuevaPublicacion);
    console.log(nuevaPublicacion);
    console.log(jsonNewPublish);

    //Muestro elJavaScript como objeto JSon
    let parrafoJSON = document.createElement("p");
    parrafoJSON.innerText=jsonNewPublish;
    listaServicios.appendChild(parrafoJSON);

    let jump = document.createElement("br");
    listaServicios.appendChild(jump);
    
    //Muestro el JSon como objeto JavaScript
    let jsonToJS = JSON.parse(jsonNewPublish);    
    let parrafoJS = document.createElement("p");
    parrafoJS.innerText=jsonToJS;
    listaServicios.appendChild(parrafoJS);
 };

 
