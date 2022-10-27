class nodoAvl{
    constructor(id){
        this.id=id;
        ///// -- Apuntadores -- ////
        this.izquierda=null
        this.derecha=null
        this.posicion=0
    }
}// Nodo Avl

class arbolAvl{
    
    constructor(){ 
        this.raiz=null
        this.estrGrafica=""
        this.strGrafica=""
    }// constructor

    // ------------------------------- Metodos complementarios --------------------------------------------
    
    mayordedos(primero,segundo){
        if(primero<segundo){
            return segundo
        }
        else{
            return primero
        }
    }//mayor de dos

    posMetodo(rama){
        if (rama!=null){
            return rama.posicion
        }
        else{
            return -1
        }
    }// pos Metodo

    // -------------------------------- Rotaciones simples ----------------------------------------------------

    rotiz(rama){
        var auxRI = rama.izquierda
        rama.izquierda = auxRI.derecha
        auxRI.derecha = rama
        rama.posicion=this.mayordedos(this.mayordedos(rama.izquierda),this.mayordedos(rama.derecha))+1
        auxRI.posicion=this.mayordedos(this.posMetodo(auxRI.izquierda),this.posMetodo(auxRI.derecha))+1
        return auxRI
    }// rotacion izquierda

    rotder(rama){
        var auxRD = rama.derecha
        rama.derecha = auxRD.izquierda
        auxRD.izquierda = rama
        rama.posicion = this.mayordedos(this.posMetodo(rama.izquierda),this.posMetodo(rama.derecha))+1
        auxRD.posicion=this.mayordedos(this.posMetodo(auxRD.izquierda),this.posMetodo(auxRD.derecha))+1
        return auxRD
    } // rotacion derecha


    // ----------------------------- Rotaciones dobles ---------------------------------------------------

    rotdosiz(rama){
        rama.izquierda=this.rotder(rama.izquierda)
        return this.rotiz(rama)
    }// rotacion doble por la izquierda

    rotdosder(rama){
        rama.derecha=this.rotiz(rama.derecha)
        return this.rotder(rama)
    }// rotacion doble por la derecha

    // ---------------------------------- Introducción y ordenamiento -------------------------------------

    insertar(id){ this.raiz=this.ordenamiento(id,this.raiz)}

    ordenamiento(id,raiz){
        if(raiz==null){return new nodoAvl(id)}
        else{
            if(id<raiz.id){
                raiz.izquierda=this.ordenamiento(id,raiz.izquierda)
                var auxposicion = this.posMetodo(raiz.derecha)-this.posMetodo(raiz.izquierda)
                if(auxposicion==-2){
                    if(id<raiz.izquierda.id){
                        raiz = this.rotiz(raiz)
                    }
                    else{raiz=this.rotdosiz(raiz)}
                }
            } // primer if dentro del else
            else if(id>raiz.id){
                raiz.derecha=this.ordenamiento(id,raiz.derecha)
                var auxposdos = this.posMetodo(raiz.derecha) - this.posMetodo(raiz.izquierda)
                if(auxposdos==2){
                    if(id>raiz.derecha.id){
                        raiz=this.rotder(raiz)
                    }
                    else{
                        raiz=this.rotdosder(raiz)
                    }
                }
            }// else if
            else{ raiz.id=id}// else
        }// else
        var posmas=this.mayordedos(this.posMetodo(raiz.izquierda),this.posMetodo(raiz.derecha))+1
        raiz.posicion=posmas
        return raiz
    }// ordenamiento


    // ------------------------------------------------------- Grafica ---------------------------------------------
    
    primerGrafica(rama){
        if(rama==this.raiz){this.strGrafica=""}
        if(rama!=null){
            this.strGrafica+=rama.id+"[label=\""+rama.id+"\" fillcolor=\"gray38\"];"
            this.primerGrafica(rama.izquierda)
            this.primerGrafica(rama.derecha)
        }
    }// primer Grafica

    segundoGrafica(rama){
        if(rama!=null){
            if(rama.izquierda!=null){this.strGrafica+="\n"+rama.id+"->"+rama.izquierda.id+";"}
            this.segundoGrafica(rama.izquierda)
            if(rama.derecha!=null){this.strGrafica+="\n"+rama.id+"->"+rama.derecha.id+";"}
            this.segundoGrafica(rama.derecha)
        }
    }// segundo Grafica

    grafica(){
        this.estrGrafica="digraph G{ \n label=\"Arbol AVL \"; \n fontname=\"Times New Roman\" fontsize=\"20pt\""
        this.primerGrafica(this.raiz)
        this.segundoGrafica(this.raiz)
        this.estrGrafica+=this.strGrafica +" \n }"
        return this.estrGrafica
    }

}// arbol Avl


var avltre = new arbolAvl()

avltre.insertar(11)
avltre.insertar(23)
avltre.insertar(35)
avltre.insertar(46)
avltre.insertar(54)
avltre.insertar(26)
avltre.insertar(83)
avltre.insertar(20)
avltre.insertar(100)
avltre.insertar(53)
avltre.insertar(2)
avltre.insertar(1)
avltre.insertar(6)
avltre.insertar(8)

var miau = avltre.grafica()

d3.select("#grafica").graphviz()
.width(2000)
.height(2000)
.renderDot(miau)