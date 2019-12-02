 
 //var activo = 0;
var Actual;
 // Initialize Firebase
 
 var config = {
    apiKey: "AIzaSyC5Fz7x6mupIKZ8IsyyKS7WRN6Hr_rVcK8",
    authDomain: "plaf-3cf84.firebaseapp.com",
    databaseURL: "https://plaf-3cf84.firebaseio.com",
    projectId: "plaf-3cf84",
    storageBucket: "plaf-3cf84.appspot.com",
    messagingSenderId: "709281942479"
  };
  firebase.initializeApp(config);
  var db = firebase.database();
//#####################################################################################################################################################################
  //--------------------------------------------------AGREGAR REGISTROS!!!!---------------------------------------------------------------------------------
  //root toma el nombre de la tabla donde se escribira y titulo toma un array de los campos que esta tenga
  function nuevo(root,titulo,loc,sel=0){//****************************************************FUNCION PARA GUARDAR
    var data = firebase.database().ref(root);
    var obj = new Object();
    var objax = new Object();
    var nomax;
    if(root!="Usuarios"){
    var n;var n1;
    
    titulo.forEach(function(i){
         console.log(i);
         if(sel!=0){
            obj[i.substring(0,i.length-1)]=document.getElementById(i).value;
         }else{
            obj[i]=document.getElementById(i).value;
         }
         if(root=="Vendedores"){
            if(sel!=0){
                if(i.substring(0,i.length-1)=="Usuario"){
                    nomax=document.getElementById(i).value;
                    
                }
                if(i.substring(0,i.length-1)=="Contraseña"){
                    objax["Contraseña"]=document.getElementById(i).value;
                }
             }else{
                if(i=="Usuario"){
                    nomax=document.getElementById(i).value;
                    
                    
                }
                if(i=="Contraseña"){
                    objax["contraseña"]=document.getElementById(i).value;
                }

             }
             
             objax["Tipo"]="limitado";
         }
        
    });
    
    data.once("value", function(snap) {
            
        var aux = snap.val();
        for(var documento in aux){
            //print(datosArray[documento].Nombre);
            console.log(documento);
            n=documento;
            n1= parseInt(n.substring(2))+1;
        }
      //  console.log(n);
        console.log(n1);
        id="id"+n1;
        console.log(id);
       
        //console.log("hola");
        var add;
        if(sel!=0){
            add = data.child(sel);
        }else{
            add = data.child(id);
        }
         
        
        if(root=="Vendedores"){
            
                var dot = firebase.database().ref("Usuarios");
                    dot.once("value", function(snap2) {
                        var j = true;
                        var aux2 = snap2.val();
                        for(var documento2 in aux2){
                            console.log("1");
                            if(documento2 == nomax){
                                md.showNotification('top','center',2,'<h3>ESE USUARIO YA EXISTE!</h3>',10);
                               // alert("ESE USUARIO YA EXISTE!");
                                j= false;
                                setTimeout(function(){location.reload(true)},1500);
                                
                            }
                        }
                        if(j){
                            console.log("2");
                        add.set(obj);
                        dot.child(nomax).set(objax);
                        (sel==0) ? ( md.showNotification('top','center',3,'<h3>GUARDADO!</h3>',10) /*alert("GUARDADO!")*/, setTimeout(function(){location.reload(true)},1500))  : ( /*alert("Actualizado")*/md.showNotification('top','center',1,'<h3>Actualizado</h3>',10),setTimeout(function(){location.reload(true)},1500)) ;
                        }
                        
                    });
            
            
        }else{
            add.set(obj);
            (sel==0) ? (md.showNotification('top','center',3,'<h3>GUARDADO!</h3>',10) /*alert("GUARDADO!")*/,setTimeout(function(){location.reload(true)},1500)) : (/*alert("Actualizado")*/md.showNotification('top','center',1,'<h3>Actualizado</h3>',10),setTimeout(function(){location.reload(true)},1500)) ;
        }
        
    });       
    }else{
        
        if(sel==0){
            var norep = document.getElementById("Nombre").value;

        }else{
            var norep = document.getElementById("Nombre1").value;
        }
        
        data.once("value", function(snap) {
            var aux = snap.val();
            for(var documento in aux){
                if(documento == norep){
                   md.showNotification('top','center',2,'<h3>ESE USUARIO YA EXISTE!</h3>',10)
                    //alert("ESE USUARIO YA EXISTE!");
                    setTimeout(function(){location.reload(true)},1500);
                }
            }
            if(sel==0){
                obj["Tipo"]="admin";
                obj["contraseña"]=document.getElementById("contraseña").value;
                data.child(norep).set(obj);
            }else{
                if(aux[sel].Tipo=="limitado"){
                    obj["Tipo"]="limitado";
                    obj["contraseña"]=document.getElementById("contraseña1").value;
                    var dot = firebase.database().ref("Vendedores");
                    dot.once("value",function(snap2){
                        var aux2 = snap2.val();
                        for(var doc in aux2){
                            if(aux2[doc].Usuario==sel){
                                dot.child(doc).child("Usuario").set(norep);
                                dot.child(doc).child("Contraseña").set(obj["contraseña"]);
                                data.child(sel).remove();
                                data.child(norep).set(obj);
                            }
                        }
                    });
                }else{
                    obj["Tipo"]="admin";
                    data.child(sel).remove();
                    obj["contraseña"]=document.getElementById("contraseña1").value;
                    data.child(norep).set(obj);
                }
                
            }
            (sel==0) ? (/*alert("GUARDADO!")*/md.showNotification('top','center',3,'<h3>GUARDADO!</h3>',10),setTimeout(function(){location.reload(true)},1500)) : (/*alert("Actualizado")*/md.showNotification('top','center',1,'<h3>Actualizado</h3>',10),setTimeout(function(){location.reload(true)},1500)) ;
        });       
       
    }
    
    //window.location=loc+".html";
  }
  //#####################################################################################################################################################################
  ////****************************************************FUNCION PARA ELIMINAR----------------------------------------------------------------------------------------
  function borrar(root,id){
     // console.log(root);
     // console.log(id);
      var data = firebase.database().ref(root);
      var item = document.getElementById(id).value;
     // console.log(item);
     if(root=="Vendedores"){
        data.once("value", function(snap) {
            var aux = snap.val();
            var item2 = aux[item].Usuario;
            var dot = firebase.database().ref("Usuarios");
            dot.child(item2).remove();
            data.child(item).remove();
            //alert("borrado");
            md.showNotification('top','center',2,'<h3>Borrado</h3>',10);
            setTimeout(function(){location.reload(true)},1500);
        });

     }else if(root=="Usuarios"){
        data.once("value",function(snap1){
            var aux1 = snap1.val();
            if(aux1[item].Tipo=="limitado"){
                var dot = firebase.database().ref("Vendedores");
                dot.once("value",function(snap2){
                    var aux2 = snap2.val();
                    for(var doc in aux2){
                        if(aux2[doc].Usuario==item){
                            
                            dot.child(doc).remove();
                            data.child(item).remove();
                            //alert("borrado");
                            md.showNotification('top','center',2,'<h3>Borrado</h3>',10);
                            setTimeout(function(){location.reload(true)},1500);
                        }
                    }
                });

            }else{
                data.child(item).remove();
                //alert("borrado");
                md.showNotification('top','center',2,'<h3>Borrado</h3>',10);
                setTimeout(function(){location.reload(true)},1500);
            }
        });
     }else{
        data.child(item).remove();
        //alert("borrado");
        md.showNotification('top','center',2,'<h3>Borrado</h3>',10);
        setTimeout(function(){location.reload(true)},1500);
     }
      
    }


    function emptymodal(){
        var x = document.getElementById("foredit");
        x.innerHTML = "";
    }
//#####################################################################################################################################################################
//****************************************************FUNCION AUXILIAR PARA EDITAR---------------------------------------------------------------------------------------------
function edt(root,titulo,loc,sel=0,title=[0,0]){
    var data = firebase.database().ref(root);
    var obj = new Object();
    console.log(titulo);

    titulo.forEach(function(i){
         console.log(i);
            obj[i] = document.getElementById(i).value;
        //console.log("-"+obj[i]); 
    });
    var add;
    add = data.child(sel);
    add.set(obj);
       //alert("Actualizado");
       md.showNotification('top','center',1,'<h3>Actualizado</h3>',10);
    setTimeout(function(){location.reload(true)},1500);
    //window.location=loc+".html";
  }
//#####################################################################################################################################################################
//---------------------------------------------------------------FUNCION EDITAR (CREADOR DE MODAL)
function editar(root,id,n1=[0,0],n2=[0,0]){
        var item = document.getElementById(id).value;
        console.log(item);
        console.log(n1);
        var comp;
        var y = Array();
        
        //if(root != "Usuarios"){
        n1.forEach(function(i){
            i.id = i.id+"1";
            y.push("\'"+i.id+"\'");
            comp = i;
        });
        //}
        console.log(comp);
        console.log(comp.length);
       // console.log(comp.length);
        if(comp.length == undefined){
        var x = document.getElementById("foredit");
        var code = id+"modal";
        var modal = "<div class='modal fade' id='"+code+"' tabindex='-1' role='dialog' aria-labelledby='"+code+"' aria-hidden='true'>"+
        "<div class='modal-dialog' role='document'>"+
          "<div style='background-color: #1a2035;color : #8b92a9;' class='modal-content'>"+
            "<div style='border-bottom: 1px solid #8b92a975;' class='modal-header'>"+
              "<h5 class='modal-title' id='"+code+"'>"+root+" modal "+id+"</h5>"+
              "<button onclick='emptymodal();' style='color: white;' type='button' class='close' data-dismiss='modal' aria-label='Close'>"+
                "<span aria-hidden='true'>&times;</span>"+
              "</button>"+
            "</div> <form id = 'formedt' action=\"JavaScript:nuevo('"+root+"',["+y+"],'"+root+"','"+item+"');\">"+
            "<div class='modal-body'><div class='formImputs'>";
            
            var a = new Array();
            n1.forEach(function(i){
               var elemento = i; 
               
               a.push(elemento.id);
               modal += "<div class='form-group'><label>"+i.id.substring(0,i.id.length-1)+"</label>";
               modal += elemento.outerHTML;
                console.log(i.outerHTML);
                modal +="</div>";
                i.id = i.id.substring(0,i.id.length-1);
            });
            modal+=
            "</div></div>"+
            "<div style='border-top: 1px solid #8b92a975;' class='modal-footer'>"+
              "<button onclick='emptymodal();'  type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button>"+
              "<button type='submit' class='btn btn-primary'>Actualizar</button>"+
            "</div></form>"+
          "</div>"+
        "</div>"+
      "</div>";
      var options ;
      x.innerHTML = modal;
        var contador = 0;
        n2.forEach(function(i){
            document.getElementById(a[contador]).value=i;
            contador=contador+1;
        });
        console.log(modal);
        console.log(code);
      $("#"+code).modal(options);
        }
        
        //alert("modificado"); 
    }
//#####################################################################################################################################################################
//**************************************************** FUNCION PARA MOSTRAR EN TABLA!!!!---------------------------------------------------------------------
  function mostrar(root,table,n=[0,0]){
      var data = firebase.database().ref(root);
      var tbl = document.getElementById(table);
      var obj = new Object();
      var tot="";
      var i=1;
      if(root=="Usuarios"){
          console.log("user");
            data.once("value", function(snap) {
                var aux = snap.val();
                for(var documento in aux){
                    var xy = aux[documento]
                   // console.log("a");
                    var color = "";
                    if(aux[documento].Tipo=="limitado"){
                        color = " class='text-primary' ";
                    }
                    var x;
                    var arx = new Array();
                    arx.push(documento);
                    arx.push(aux[documento].contraseña);
                    x= "<tr> <td "+color+">"+documento+" </td>"+
                          "<td "+color+">"+aux[documento].contraseña+" </td>"+
                          "<td class='no' "+color+"> ";
                    if(localStorage.getItem("Actual")!=documento){

                        var comp = localStorage.getItem("Type");
                        if(comp=="admin"){
                            x+="<button onclick="+"borrar('"+root+"','delete"+i+"');"+" id='delete"+i+"' value='"+documento+"' class='btn btn-danger' type='button' name='add'><i class='material-icons'>delete</i> </button> ";
                        }
                        x+="<button onclick="+"editar('"+root+"','edit"+i+"',[Nombre,contraseña],"+JSON.stringify(arx)+");"+" id='edit"+i+"' id='edit"+i+"' value='"+documento+"' class='btn btn-info' type='button' name='add'><i class='material-icons'>create</i> </button> "+
                        +"</td> </tr>";
                        var acum = x.substring(0,x.length-4);
                    }else{
                        x+="USUARIO ACTUAL</td></tr>";
                        var acum = x.substring(0,x.length-5);
                    } 
                    
                    tot+=acum;
                    //console.log(tot);
                    i=i+1;
                }
                tbl.innerHTML = tot;
          }); 
      }else{
        console.log("not user");
        data.once("value", function(snap) {
            var aux = snap.val();
            for(var documento in aux){
                var xy = aux[documento]
                var x;
                var arx = new Array();
                x= "<tr>";
                n.forEach(function(i){
                    
                    
                    x+="<td>"+xy[i]+"</td>"
                    console.log(xy[i]);
                    arx.push(xy[i].replace(/ /g, "&nbsp;"));
                    
                });
                x+="<td class='no' >";
                var comp = localStorage.getItem("Type");
                    if(comp=="admin"){
                        x+="<button onclick="+"borrar('"+root+"','delete"+i+"');"+" id='delete"+i+"' value='"+documento+"' class='btn btn-danger' type='button' name='add'><i class='material-icons'>delete</i> </button> ";
                    }
                    console.log(arx);
                    console.log(JSON.stringify(arx));
                   // alert(JSON.stringify(arx));
                x+="<button onclick="+"editar('"+root+"','edit"+i+"',["+n+"],"+JSON.stringify(arx)+");"+" id='edit"+i+"' value='"+documento+"' class='btn btn-info' type='button' name='add'><i class='material-icons'>create</i> </button>"+
                    "</td> </tr>";
                var acum = x.substring(0,x.length-5);
                tot+=acum;
                console.log(tot);
                i=i+1;
            }
            tbl.innerHTML = tot;
        }); 
      }  
  }
//#####################################################################################################################################################################
//------------------------------------------AUXLIAR PARA CATALOGO------------------------------------------
function pasar(arr){
   // alert(arr);
    var objp = new Array();
    var objs = new Array();
    console.log(arr);
    var npro=0;
    var nser=0;
    arr.forEach(function(i){
        var x = document.getElementById(i);
        if(x.checked){
           
           if(i.substring(0,3)=="ser"){
            nser+=1;
            objs.push(x.value)   
           }else{
               npro+=1;
               objp.push(x.value)
           }
            //console.log(x.value);
        }
    });
    localStorage.setItem("pro","");
    localStorage.setItem("ser","");
    console.log("p: "+npro+" s: "+nser);
    if(npro>0){
        localStorage.setItem("pro",JSON.stringify(objp));
    }
    if(nser>0){
        localStorage.setItem("ser",JSON.stringify(objs));
    }
    localStorage.setItem("n1",npro);
    localStorage.setItem("n2",nser);
    console.log("P");
    console.log(localStorage.getItem("pro"));
    console.log("S");
    console.log(localStorage.getItem("ser"));
    window.location="datosTable.html";
    //localStorage.setItem("Cot",obj);
}
//#####################################################################################################################################################################
//--------------------------------------FUNCION PARA CALCULAR TOTALES Y SUBTOTALES EN TABLA DE COTIZACIONES
function subtotal(from,to){
    var o1 = document.getElementById(from).value;
    var sub = document.getElementById(to);
    var o2 = sub.name;
    var tot = document.getElementById("Total");
    var tdata = parseFloat(tot.value);
    
   // console.log("1: "+o1+" 2:"+o2);
    var o = parseFloat(o2);
    var op = parseFloat(o1);
    var total = parseFloat(tdata-sub.value)+parseFloat(o*op);
    //console.log("a: "+o+" b: "+op);
    sub.value = parseFloat(o*op);
    tot.value = parseFloat(total);
    //console.log( o*op);
}
//#####################################################################################################################################################################
//--------------------------------------FUNCION QUE GUARDA EN BD COTIZACIONES(NO UTILIZADO)
function cotizar(v,c,f,p,t){
    var data = firebase.database().ref("Cotizaciones");
    var vendedor = document.getElementById(v).value;
    var cliente = document.getElementById(c).value;
    var fecha = document.getElementById(f).title;
    var total = "$"+document.getElementById(t).value;  
    var obj2 = document.getElementById(p).value;
    var obj = new Object();
    obj["IDC"]=cliente.substring(1);
    obj["IDV"]=vendedor;
    obj["precio"]=total;
    obj["Fecha_cot"]=fecha;
    obj["codigo"]=obj2;
    data.once("value", function(snap) {
        var aux = snap.val();
        for(var documento in aux){
            //print(datosArray[documento].Nombre);
            console.log(documento);
            n=documento;
            n1= parseInt(n.substring(2))+1;
        }
      //  console.log(n);
        console.log(n1);
        id="id"+n1;
        console.log(id);
        var add
        add = data.child(id);
        add.set(obj);
        //alert("cotizacion guardada!");
        md.showNotification('top','center',3,'<h3>cotizacion guardada!</h3>',10);
    });
    //console.log(obj);
    //console.log(fecha);
    //console.log(total);
    

}
//#####################################################################################################################################################################
//------------------------------FUNCION AUXLIAR BUSCAR EN COTIZACIONES
function traspaso(n1,n2){
    var p = firebase.database().ref("Producto");
    var s = firebase.database().ref("Servicio");
    var table = document.getElementById("tablac");
    var add=""; var acum=0;var sum=0;
    
    if(n2>0){
        var servicios = JSON.parse(localStorage.getItem("ser"));
        s.once("value", function(snap) {
            var aux = snap.val();
            for(var documento in aux){
                
                servicios.forEach(function(i){
                    acum+=1;    
                    console.log(acum);
                    if(documento==i){
                        sum+=parseFloat(aux[documento].Precio);
                        add+="<tr><td><input style='background-color: #202940;' min='1' onchange=\"subtotal('cant"+acum+"','sub"+acum+"')\" type='number' class='form-control' id='cant"+acum+"' name='canti' value='1'> </td>"+
                        "<td id='S"+documento+"'>";
                        add+= aux[documento].Nombre + " : "+aux[documento].Descripcion+" (duracion: "+aux[documento].Duracion+" dias)</td>"+
                        "<td> <input style='background-color: #202940;' class='form-control' disabled Value='"+aux[documento].Precio+"' type='number' name='"+aux[documento].Precio+"'  id='sub"+acum+"' > </td></tr>";
                        table.innerHTML += add;
                        console.log(add);
                        add="";
                    }
                });
            }
            if(true){
                add="<tr><td></td> <td>TOTAL:</td><td><input class='form-control' disabled Value='"+sum+"' type='text' name='total'  id='Total' ></td></tr>";
                table.innerHTML+=add;
                sum=0;
            }
        });
    }
    if(n1>0){
        var productos = JSON.parse(localStorage.getItem("pro"));
        p.once("value", function(snap) {
            var aux = snap.val();
            for(var documento in aux){
                
                productos.forEach(function(i){
                    acum+=1;    
                    console.log(acum);
                    if(documento==i){
                        sum+=parseFloat(aux[documento].Precio);
                        add+="<tr><td><input min='1' onchange=\"subtotal('cant"+acum+"','sub"+acum+"')\" type='number' class='form-control' id='cant"+acum+"' name='canti' value='1'> </td>"+
                        "<td id='P"+documento+"'>";
                        add+= aux[documento].Nombre +" "+aux[documento].Marca+ " : "+aux[documento].Descripcion+" </td>"+
                        "<td><input class='form-control' disabled Value='"+aux[documento].Precio+"' type='number' name='"+aux[documento].Precio+"'  id='sub"+acum+"' > </td></tr>";
                        table.innerHTML += add;
                        console.log(add);
                        add="";
                    }
                });
            }
            if(n2==0){
            add="<tr><td></td> <td>TOTAL:</td><td><input class='form-control' disabled Value='"+sum+"' type='text' name='total'  id='Total' ></td></tr>";
            //add+="<input class='form-control' disabled Value='"+sum2+"' type='number' name='productos'  id='Total' >";
            table.innerHTML+=add;
            sum=0;
            }
            
        });
    }
    if(n1==0 && n2==0){
       // alert("debe seleccionar almenos 1 servicio y/o Producto");
       md.showNotification('top','center',4,'<h3>debe seleccionar almenos 1 servicio y/o Producto</h3>',10);
        window.location="Catalogo.html";
    }
    
}
//#####################################################################################################################################################################
//------------------------------------FUNCION QUE CARGA EL CATALOGO
function Catalogo(){
      var data = firebase.database();
      var pro = data.ref("Producto");
      var ser = data.ref("Servicio");
      var add="";
      var content = document.getElementById("items");
      var n = 0;
      var arr = new Array();
      ser.once("value", function(snap) {
        var aux = snap.val();
       // content.innerHTML += "<div class='row'>";
        for(var documento in aux){
            n+=1;
            arr.push("\'ser"+n+"\'");
            add="<div class='col md-4'>"+            
            "<div style='width: max-content;' class='card card-nav-tabs'>"+
              "<h4 class='card-header card-header-info'>"+aux[documento].Nombre+"</h4>"+
              "<div class='card-body'>"+
                "<div id='S"+documento+"' class='carousel slide' data-ride='carousel'>"+
                  "<ol class='carousel-indicators'>"+
                    "<li data-target='#S"+documento+"' data-slide-to='0' class='active'></li>"+
                    "<li data-target='#S"+documento+"' data-slide-to='1'></li>"+
                    "<li data-target='#S"+documento+"' data-slide-to='2'></li>"+
                  "</ol>"+
                  "<div class='carousel-inner'>"+
                    "<div class='carousel-item active'>"+
                      "<img class='d-block w-10' src='img/pro2.jpg' alt='First slide'>"+
                    "</div>"+
                    "<div class='carousel-item'>"+
                      "<img class='d-block w-100' src='img/pro2b.jpg' alt='Second slide'>"+
                    "</div>"+
                    "<div class='carousel-item'>"+
                      "<img class='d-block w-100' src='img/pro2c.jpg' alt='Third slide'>"+
                    "</div>"+
                  "</div>"+
                  "<a class='carousel-control-prev' href='#S"+documento+"' role='button' data-slide='prev'>"+
                    "<span class='carousel-control-prev-icon' aria-hidden='true'></span>"+
                    "<span class='sr-only'>Previous</span>"+
                  "</a>"+
                  "<a class='carousel-control-next' href='#S"+documento+"' role='button' data-slide='next'>"+
                    "<span class='carousel-control-next-icon' aria-hidden='true'></span>"+
                    "<span class='sr-only'>Next</span>"+
                  "</a>"+
          "</div>"+
                "<p class='card-text'>esta es una descripcion del producto.</p>"+
              "</div>"+
              "<div class='card-footer'>"+
                  "<div class='stats'>"+
                      "<div class='form-check'>"+
                          "<label class='form-check-label'>"+
                            "<input id='ser"+n+"' class='form-check-input' type='checkbox' value='"+documento+"'>"+
                             "AGREGAR A LA BOLSA"+
                            "<span class='form-check-sign'>"+
                              "<span class='check'></span>"+
                            "</span>"+
                          "</label>"+
                        "</div>"+
                  "</div>"+
              "</div>"+
            "</div>"+ 
          "</div>";
          content.innerHTML += add;
        }
      });
      pro.once("value", function(snap) {
        var aux = snap.val();
       // content.innerHTML += "<div class='row'>";
        for(var documento in aux){
            n+=1;
            arr.push("\'pro"+n+"\'");
            add="<div class='col md-4'>"+            
            "<div style='width: max-content;' class='card card-nav-tabs'>"+
              "<h4 class='card-header card-header-info'>"+aux[documento].Nombre+"</h4>"+
              "<div class='card-body'>"+
                "<div id='P"+documento+"' class='carousel slide' data-ride='carousel'>"+
                  "<ol class='carousel-indicators'>"+
                    "<li data-target='#P"+documento+"' data-slide-to='0' class='active'></li>"+
                    "<li data-target='#P"+documento+"' data-slide-to='1'></li>"+
                    "<li data-target='#P"+documento+"' data-slide-to='2'></li>"+
                  "</ol>"+
                  "<div class='carousel-inner'>"+
                    "<div class='carousel-item active'>"+
                      "<img class='d-block w-10' src='img/te11.jpg' alt='First slide'>"+
                    "</div>"+
                    "<div class='carousel-item'>"+
                      "<img class='d-block w-100' src='img/te2.jpg' alt='Second slide'>"+
                    "</div>"+
                    "<div class='carousel-item'>"+
                      "<img class='d-block w-100' src='img/te3.jpg' alt='Third slide'>"+
                    "</div>"+
                  "</div>"+
                  "<a class='carousel-control-prev' href='#P"+documento+"' role='button' data-slide='prev'>"+
                    "<span class='carousel-control-prev-icon' aria-hidden='true'></span>"+
                    "<span class='sr-only'>Previous</span>"+
                  "</a>"+
                  "<a class='carousel-control-next' href='#P"+documento+"' role='button' data-slide='next'>"+
                    "<span class='carousel-control-next-icon' aria-hidden='true'></span>"+
                    "<span class='sr-only'>Next</span>"+
                  "</a>"+
          "</div>"+
                "<p class='card-text'>esta es una descripcion del producto.</p>"+
              "</div>"+
              "<div class='card-footer'>"+
                  "<div class='stats'>"+
                      "<div class='form-check'>"+
                          "<label class='form-check-label'>"+
                            "<input id='pro"+n+"'  class='form-check-input' type='checkbox' value='"+documento+"'>"+
                             "AGREGAR A LA BOLSA"+
                            "<span class='form-check-sign'>"+
                              "<span class='check'></span>"+
                            "</span>"+
                          "</label>"+
                        "</div>"+
                  "</div>"+
              "</div>"+
            "</div>"+ 
          "</div>";
          content.innerHTML += add;
        }
        var s = document.getElementById("sub");
        s.innerHTML = "<input onclick=\"pasar(["+arr+"])\" style='margin-left: 90%' class='btn btn-primary' type='submit' name='btncot' id='btnCot' value='Cotizar!!'></input>"
  
      });
      
}
//#####################################################################################################################################################################
//--------------------------------FUNCION QUE CONTROLA LAS SESIONES Y LIMITACIONES DE USUARIO ESTANDAR
  function SESSION(type=0){
    var db = firebase.database().ref("Estado");
        var db = firebase.database().ref("Usuarios");
        var act = localStorage.getItem("Actual");
        console.log(act);
    db.once("value", function(snap) {
        var aux = snap.val();
         console.log(aux["Actual"]);
         if(aux[act].Estado == 0){
            window.location="index.html";
         }else if(aux[act].Tipo== "limitado" && type !=0){
            window.location="Principal.html";
         }
       if(aux["Actual"]==0){
            window.location="index.html";
        }
    });
  }
//#####################################################################################################################################################################
//-------------------------------------------MOSTRAR EL USUARIO ACTUAL
  function getvend(id){
    var db = firebase.database().ref("Usuarios");
    var db2 = firebase.database().ref("Vendedores");
    var act = localStorage.getItem("Actual");
    var set = document.getElementById(id);
    console.log(act);
    db.once("value", function(snap) {
    var aux = snap.val();
        if(aux[act].Tipo == "admin"){
            console.log("admin");
           set.value=act;
        }else{
            db2.once("value",function(snap2){
                var aux2 = snap2.val();
                for(var documento in aux2){
                    console.log(documento);
                    if(aux2[documento].Usuario == act){
                       set.value= aux2[documento].Nombre;
                    }
                }
            });
        }
    });

  }
  //#####################################################################################################################################################################
  //------------------------------CARGAR DATOS EN BOTON BUSCAR de cotizaciones
  function combox(root,fields=[0,0],target,){
    var db = firebase.database().ref(root);
    var targ = document.getElementById(target);
    var add="";
    db.once("value", function(snap) {
        var aux = snap.val();
        for(var documento in aux){
            var xy = aux[documento];
            
            add+="<option name='"+aux[documento].Nombre+"' style='color: #202940;' value='"+root.substring(0,1)+documento+"'>";
            fields.forEach(function(i){
                add+=xy[i]+" ";
            });
            add+="</option>";
            
            targ.innerHTML += add;
            add="";
        }

    });    

  }
  //#####################################################################################################################################################################
  //----------------------------ACTUALIZAR TABLA AL BUSCAR EN COTIZACIONES
  function addcot(idc=0){
    if(idc==0){
        //alert("debe seleccionar un producto/servicio");
        md.showNotification('top','center',4,'<h3>debe seleccionar un producto/servicio</h3>',10);
    }else{
    var idn = document.getElementById(idc).value;
    var n = idn.substring(0,1);
    var id = idn.substring(1);
    if(n=="P"){
        if(parseInt(localStorage.getItem("n1"))>0){
            var producto = JSON.parse(localStorage.getItem("pro"));
        }else{
            var producto = Array();
            
        }
        
        var nk1 = parseInt(localStorage.getItem("n1"))+1;
        localStorage.setItem("n1",nk1);
        producto.push(id);
       
        localStorage.setItem("pro",JSON.stringify(producto));
        
    }
    else if(n=="S"){
        if(parseInt(localStorage.getItem("n2"))>0){
            var servicio = JSON.parse(localStorage.getItem("ser"));
        }else{
            var servicio = new Array();
        }
        
        var nk2 = parseInt(localStorage.getItem("n2"))+1;
        localStorage.setItem("n2",nk2);
        servicio.push(id);
        localStorage.setItem("ser",JSON.stringify(servicio));
        console.log("SERVICIO");
    }
    setTimeout(function(){location.reload(true)},1500);
    }
    

  }
  //#####################################################################################################################################################################
  //-------------------------------------------------CERRAR SESION
  /*function lol(x=0){
    alert("algo");
  }*/
  function cerrar(){
     // alert("cerrndo");
      console.log("cerrar sesion");
      var act = localStorage.getItem("Actual");
      var db = firebase.database().ref("Usuarios").child(act);
      db.child("Estado").set(0);
      db = firebase.database().ref("Estado");
      db.child("Actual").set(0);
      db.child("user").set("0");                                            
      //alert("Cerrando sesion..");
      
     // window.location.setTimeout(window.location="index.html",1500);
     
     md.showNotification('top','center',4,'<h1>Cerrando sesion..</h1>',10);
     setTimeout(function(){window.location="index.html"},1000);
     
  }
//#####################################################################################################################################################################
//----------------------------------------------LOGUEO
  function login(){
    var db = firebase.database().ref("Estado");
    var data = firebase.database().ref("Usuarios");
    var bandera = true;
    var name = document.getElementById("user").value;
    var pass = document.getElementById("contra").value;
    console.log(name+" "+pass);
    data.once("value", function(snap) {
        var aux = snap.val();
        for(var documento in aux){
            console.log(documento);
            if(documento == name){
                bandera=false;
                if(pass == aux[documento].contraseña){
                   // alert("Correcto");
                   md.showNotification('top','center',3,'<h1>CORRECTO!</h1>',10);
                    data.child(name).child("Estado").set(1);
                    this.Actual = name;
                    localStorage.setItem("Actual",name);
                    localStorage.setItem("Type",aux[documento].Tipo);
                    db.child("Actual").set(1);
                    db.child("user").set(name);
                    setTimeout(function(){window.location="Principal.html"},1500);
                    
                }else{
                    
                    //alert("usuario y/o contraseña Incorrectos");
                    md.showNotification('top','center',2,'<h1>usuario y/o contraseña Incorrectos</h1>',10);
                }
            }
       }
       if(bandera){
           //alert("usuario y/o contraseña Incorrectos");
           md.showNotification('top','center',2,'<h1>usuario y/o contraseña Incorrectos</h1>',10);
       }
       
    });  

  }
//#####################################################################################################################################################################
//-------------------------FUNCION AUXILIAR PARA GUARDAR COTIZACIONES
  function getname(nam,root){
      console.log("LOL");
    var db = firebase.database().ref(root);
    console.log(nam.substring(1));
    db.once("value", function(snap) {
        var aux = snap.val();
        for(var documento in aux){
            console.log(documento);
            if(documento==nam.substring(1)){
                console.log(aux[documento].Nombre);
                document.getElementById("datos2").value = aux[documento].Nombre;
                localStorage.removeItem("pro");localStorage.removeItem("ser");
                genPdf('clientes');
            }
        }
    });  
  }
  //#####################################################################################################################################################################
  //------------------------------FUNCION PARA GUARDAR EL PDF DE COTIZACIONES
  function genPdf(div){
    
    /*var pd = new jsPDF();
    pd.fromHTML( $('#'+div).get(0), 20,20,{
        'width':500});
    pd.save('prueba.pdf');*/
    var x = document.getElementById(div);
    var v= document.getElementById("vend").value;
    
    var c =document.getElementById("datos2").value;
    var f=document.getElementById("date").title;
    x.style="width:fit-content;background-color: #202940;";
    var t = document.getElementById("Total");
    t.value = "$"+t.value;
    html2canvas(x, {
        onrendered: function (canvas) {
            var img = canvas.toDataURL("image/png");
            var doc = new jsPDF();
            doc.setFontSize(15)
            doc.text(20,20,"Cliente: "+c);
            doc.text(80,20,"Vendedor: "+v);
            doc.text(180,20,f);
            doc.addImage(img, 'JPEG',20,30);
            doc.save('cotizacion.pdf');
            x.style="";
            t.value=t.value.substring(1);
        }
    });
  
}
//#####################################################################################################################################################################
//----------------------------------FUNCION PARA GUARDAR PDF EN LAS DEMAS TABLAS
function genPdf2All(div,f){
    var x = document.getElementById(div);
    x.style="width:fit-content;background-color: #202940;";
    var y = document.getElementsByClassName("no");
    for(var i=0;i<y.length;i++){
        y[i].style.display = "none";
    }
    var dt = new Date();
    var month = dt.getMonth()+1;
    var day = dt.getDate();
    var year = dt.getFullYear();
    var fecha = day + '-' + month + '-' + year;
    html2canvas(x, {
        onrendered: function (canvas) {
            var img = canvas.toDataURL("image/png");
            var doc = new jsPDF();
            doc.setFontSize(20)
            doc.text(50,20,"Reporte de "+f);
            doc.text(150,20,fecha);
            doc.addImage(img, 'JPEG',20,30);
            doc.save('tabla.pdf');
            x.style="";
            for(var i=0;i<y.length;i++){
                y[i].style= "";
            }
        }
    });
  
}
