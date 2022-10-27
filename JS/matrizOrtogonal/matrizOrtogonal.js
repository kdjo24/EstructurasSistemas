
// ---------------------- Composicion de los encabezados ------------------------------------------------------------------

class nodoTitulosOrtogonal{
    constructor(posfc){
        // posiciondel titulo - vertical u horizontal
        this.posfc=posfc;
        // apuntadores
        this.siguiente=null;
        this.anterior=null;
        this.interno=null;
    }
}// noto Titulos

class listaTitulosOrtogonal{
    constructor(foc){
        this.foc=foc;
        this.tamaño=0;
        // apuntadores
        this.primero=null;
        this.ultimo=null;
    }// constructor

    insertarTitulo(newTitulo){
        this.tamaño=this.tamaño+1
        /// --- Aca si esta vacio todo --- //
        if(this.primero==null){this.ultimo=newTitulo; this.primero=newTitulo;}
        else{
            // ---------------------------- Aca ire viendo si el nuevo tiene posicionamiento antes o despues del primero
            // se verificara por medio de la posicion 
            if(newTitulo.posfc<this.primero.posfc){
                newTitulo.siguiente = this.primero;
                this.primero.anterior = newTitulo;
                this.primero=newTitulo;
            }// posicion menor
            /// ---------------Si no cumple o el nuevo es mayor que el primero entonces se verificara si es mayor que el ultimo
            else if(newTitulo.posfc>this.ultimo.posfc){
                this.ultimo.siguiente=newTitulo;
                newTitulo.anterior=this.ultimo;
                this.ultimo=newTitulo;
            }// segunda condicion
            // --- Si en cambio se ecuentra en medio, es decir antes que el ultimo y despues del primero lo aplicara aca
            // con un auxiliar recorriendo todos los existentes hasta que encuentre un lugar vacio :3 soy la mera verga
            else{
                var auxiliar = this.primero;
                while(auxiliar!=null){
                    if(newTitulo.posfc<auxiliar.posfc){
                        newTitulo.siguiente=auxiliar;
                        newTitulo.anterior=auxiliar.anterior;
                        auxiliar.anterior.siguiente=newTitulo;
                        auxiliar.anterior = newTitulo;
                        break;
                    }//primer if
                    else if(newTitulo.posfc>auxiliar.posfc){auxiliar=auxiliar.siguiente;}
                    else{break;}
                }// while
            }// tercera condicion
        }// fin else luego de VER SI ESTA VACIO
    }//Insertar Titulo

    // -- Metodo para ver si existe ya el titulo o nel, por posicion -- // 
    existenciaporposicion(posfc){
        var aux = this.primero;
        while (aux!=null){
            if(posfc==aux.posfc){
                return aux
            }
            aux=aux.siguiente;
        }
        return null
    }// fin existencia por posicion

}//fin listaTitulos


// ----------------------------------   Composicion de la matriz dispersa -------------------------------------

// -- Nodos del contenido
class nodoContenidoOrtogonal{
    constructor(x,y,contenido){
        this.contenido=contenido;
        //-- Posicion
        this.x=x;
        this.y=y;
        // apuntadores
        this.izquierda=null;
        this.derecha=null;
        this.arriba=null;
        this.abajo=null;
    }// finconstructor
}// fin nodo contenido

//------------------------------------------------ MATRIZ COMPLETA ---------------------------------------------------

class matrizOrtogonal{
    constructor(tamaño){
        this.columnas = new listaTitulosOrtogonal("columnas");
        this.filas = new listaTitulosOrtogonal("filas");
        this.tamaño=tamaño;
        for(var a=1;a<tamaño+1;a++){
            for(var b=1;b<tamaño+1;b++){
                this.insertar(b,a," ");
            }
        }
    }//fin constructor

    //------------------------------------------------- Insertar --------------------------------------------------

    insertar(x,y,contenido){
        if(x>this.tamaño || y>this.tamaño){
            alert("Error el dato con x: "+x+" y y: "+y+" y contenido: "+contenido+" Es mayor al tamaño permitido")
        }
        else{
        // -- nodo con contenido nuevo
        var contenidoNuevo = new nodoContenidoOrtogonal(x,y,contenido)
        // --- Se verificara si existen los titulos en las posiciones correspondientes al nuevo contenido
        var auxx = this.columnas.existenciaporposicion(x);
        var auxy = this.filas.existenciaporposicion(y);
        // ------   Para las columnas
        if (auxy==null){
            auxy= new nodoTitulosOrtogonal(y)
            this.filas.insertarTitulo(auxy)
        }
        // -- para las filas
        if(auxx==null){
            auxx= new nodoTitulosOrtogonal(x)
            this.columnas.insertarTitulo(auxx)
        }
        // -------------------------------------- Agregar contenido por fila y columna ---------------------
        // Por filas :3 
        // Si el apuntador interno de y esta vacio
        if(auxy.interno==null){auxy.interno=contenidoNuevo;}
        // Si el apuntador interno del contenido de y no esta vacio
        else{
            if(contenidoNuevo.x<auxy.interno.x){
                contenidoNuevo.derecha = auxy.interno;
                auxy.interno.izquierda = contenidoNuevo;
                auxy.interno=contenidoNuevo;
            }// if primero
            else{
                var auxiliarNodoy = auxy.interno;
                while(auxiliarNodoy!=null){
                    if(contenidoNuevo.x < auxiliarNodoy.x){
                        contenidoNuevo.derecha = auxiliarNodoy;
                        contenidoNuevo.izquierda=auxiliarNodoy.izquierda;
                        auxiliarNodoy.izquierda.derecha=contenidoNuevo;
                        auxiliarNodoy.izquierda=contenidoNuevo;
                        break;
                    }// primer if del while
                    else if (contenidoNuevo.y == auxiliarNodoy.y && contenidoNuevo.x == auxiliarNodoy.x){
                        auxiliarNodoy.contenido=contenido
                        break;}// segundo if del while
                    else{
                        if(auxiliarNodoy.derecha==null){
                            auxiliarNodoy.derecha = contenidoNuevo;
                            contenidoNuevo.izquierda=auxiliarNodoy;
                            break;
                        }// fin del primer if del else
                        else{ auxiliarNodoy = auxiliarNodoy.derecha;}
                    }// else del while
                }// fin while
            }// else del primer if
        }// else de apuntador interno no vacio
        // por columnas -- ya toy cansadito viera :,v
        if (auxx.interno==null){auxx.interno=contenidoNuevo;}
        // si no esta apuntando ya 
        else{
            if(contenidoNuevo.y<auxx.interno.y){
                contenidoNuevo.abajo=auxx.interno;
                auxx.interno.arriba=contenidoNuevo;
                auxx.interno=contenidoNuevo;
            }// primer if del else
            else{
                var nodoauxx=auxx.interno;
                while(nodoauxx!=null){
                    if(contenidoNuevo.y < nodoauxx.y){
                        contenidoNuevo.abajo=nodoauxx;
                        contenidoNuevo.arriba=nodoauxx.arriba;
                        nodoauxx.arriba.abajo=contenidoNuevo;
                        nodoauxx.arriba=contenidoNuevo;
                        break;
                    }//if del while
                    else if(contenidoNuevo.y==nodoauxx.y && contenidoNuevo.x == nodoauxx.x){
                        break;}
                    else{
                        if(nodoauxx.abajo ==null){
                            nodoauxx.abajo=contenidoNuevo;
                            contenidoNuevo.arriba=nodoauxx;
                            break;
                        }
                        else{nodoauxx=nodoauxx.abajo}
                    }//else interno del while
                }//while
            }// else interno del else
        }//else de las columnas
    }
    }// fin insertar

    //////////////////////////// ---------------- Graficar //////////////////////////////// -------------------------     

    graficar(){
        // ------------------------------- Nodo inicial y configuraciones -----------------------
        var strGrafica="digraph G{ \n"
        strGrafica+="node[shape=box, width=0.5, height=0.5, fontname=\"Times New Roman\", fillcolor=\"white\", style=filled];\n"
        strGrafica+="edge[style = \"bold\"];\n";
        strGrafica+="node[label = \"0,0\" fillcolor=\"gray38\" pos = \"-1,1!\"]raiz;\n"
        strGrafica += "label = \"- Fantasia -\" \nfontname=\"Times New Roman\" \nfontsize=\"20pt\" \n \n"
        /// ----------------------------- Titulos ------------------------------------------
        // -- Se crean los nodos de los titulos de las filas -- 
        var auxfilas=this.filas.primero;
        var idy=0;
        while(auxfilas!=null){
            strGrafica+="\n\tnode[label = \""+auxfilas.posfc+"\" fillcolor=\"gray38\" pos=\"-1,-"+idy+"!\" shape=box]x"+auxfilas.posfc+";"
            auxfilas=auxfilas.siguiente;
            idy=idy+1;
        }// fin del while
        /// ----------  -- Se unen los nodos de los titulos de las filas
        auxfilas=this.filas.primero;
        while(auxfilas.siguiente!=null){
            strGrafica+= "\n\tx"+auxfilas.posfc+"->x"+auxfilas.siguiente.posfc+";"
            strGrafica+= "\n\tx"+auxfilas.posfc+"->x"+auxfilas.siguiente.posfc+"[dir=back];"
            auxfilas = auxfilas.siguiente
        }// fin while
        strGrafica += "\n\traiz->x"+this.filas.primero.posfc +";";
        ///-------------------------------------------------------------------------
        // --- Se crean los nodos de los titulos de las columnas -- 
        var auxcolumnas = this.columnas.primero;
        var idx=0;
        while(auxcolumnas!=null){
            strGrafica+="\n\tnode[label = \""+auxcolumnas.posfc+"\" fillcolor=\"gray38\" pos = \""+idx+",1!\" shape=box]y"+auxcolumnas.posfc+";";
            auxcolumnas=auxcolumnas.siguiente;
            idx=idx+1;
        }//while
        // ------ Se unen los nodos de los titulos de las columnas
        auxcolumnas = this.columnas.primero;
        while(auxcolumnas.siguiente!=null){
            strGrafica += "\n\ty"+auxcolumnas.posfc+"->y"+auxcolumnas.siguiente.posfc+";"
            strGrafica += "\n\ty"+auxcolumnas.posfc+"->y"+auxcolumnas.siguiente.posfc+"[dir=back];"
            auxcolumnas = auxcolumnas.siguiente
        }//while
        strGrafica += "\n\traiz->y"+this.columnas.primero.posfc+";"
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        /// --- Creando los nodos de contenidos desde las filas
        var auxfilass = this.filas.primero;
        var idyy =0;
        while(auxfilass!=null){
            var auxB = auxfilass.interno;
            while(auxB!=null){
                var auxye = this.columnas.primero;
                var idB=0;
                while(auxye!=null){
                    if(auxye.posfc==auxB.x){break;}
                    idB=idB+1;
                    auxye=auxye.siguiente;
                }//tercer while
                if(auxB.contenido!=""){
                    strGrafica += "\n\tnode[label=\""+auxB.contenido+"\" fillcolor=\"white\" pos=\""+idB+",-"+idyy+"!\" shape=box]i"+auxB.y+"_"+auxB.x+";" 
                }
                auxB=auxB.derecha;
            }// segundo while
            // ----------------------- Union de celdas con titulos de filas
            auxB=auxfilass.interno;
            while(auxB!=null){
                if(auxB.derecha!=null){
                    strGrafica += "\n\ti"+auxB.y+"_"+auxB.x+"->i"+auxB.derecha.y+"_"+auxB.derecha.x+";"
                    strGrafica += "\n\ti"+auxB.y+"_"+auxB.x+"->i"+auxB.derecha.y+"_"+auxB.derecha.x+"[dir=back];"
                }
                auxB=auxB.derecha;
            }// while
            strGrafica += "\n\tx"+auxfilass.posfc+"->i"+auxfilass.interno.y+"_"+auxfilass.interno.x+";"
            strGrafica += "\n\tx"+auxfilass.posfc+"->i"+auxfilass.interno.y+"_"+auxfilass.interno.x+"[dir=back];"
            auxfilass = auxfilass.siguiente
            idyy = idyy+1
        }//while auxfilass
        /// ----------------- Se unen las columnas de los titulos con los contenidos anteriormente creados
        var auxColumn = this.columnas.primero;
        while(auxColumn!=null){
            var auxC = auxColumn.interno;
            while(auxC!=null){
                if(auxC.abajo!=null){
                    strGrafica += "\n\ti"+auxC.y+"_"+auxC.x+"->i"+auxC.abajo.y+"_"+auxC.abajo.x+";"
                    strGrafica += "\n\ti"+auxC.y+"_"+auxC.x+"->i"+auxC.abajo.y+"_"+auxC.abajo.x+"[dir=back];"
                }
                auxC=auxC.abajo;
            }//auxC!=null
            strGrafica += "\n\ty"+auxColumn.posfc+"->i"+auxColumn.interno.y+"_"+auxColumn.interno.x+";"
            strGrafica += "\n\ty"+auxColumn.posfc+"->i"+auxColumn.interno.y+"_"+auxColumn.interno.x+"[dir=back];"
            auxColumn=auxColumn.siguiente;
        }//auxcolumn != null
        strGrafica+="\n\n}" 
        return strGrafica;       
    }// Fin graficar


}// fin matriz dispersa


var prueba = new matrizOrtogonal(25)
prueba.insertar(10,10,"miau")
prueba.insertar(1,1,"miau 1,1")
prueba.insertar(1,2,"miau 1,2")
prueba.insertar(1,3,"miau 1,3")
prueba.insertar(1,4,"miau 1,4")
prueba.insertar(4,4,"miau 4,4")
prueba.insertar(8,9,"miau 8,9")
prueba.insertar(9,9,"miau 9,9")
prueba.insertar(9,2,"miau 9,2")
var miau = prueba.graficar()

d3.select("#grafica")
.graphviz()
.engine("neato")
.width(2000)
.height(3000)
.dot(miau)
.render()
