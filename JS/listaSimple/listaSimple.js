class nodols{
    constructor(id){
        this.id=id;
        this.siguiente=null;
    }//Fin constructor
}// fin clase nodols

class listaSimple{
    constructor(){
        this.inicio=null;
    }//Fin constructor

    insertar(id){
        var nuevoNodo = new nodols(id);
        if(this.inicio==null){
            this.inicio=nuevoNodo;
        }
        else{
            var auxiliar = this.inicio;
            while(auxiliar.siguiente!=null){
                auxiliar=auxiliar.siguiente;
            }
            auxiliar.siguiente=nuevoNodo
        }
    }//Fin insertar

    reiniciar(){this.inicio=null;} // Fin reiniciar 

    eliminar(id){
        var auxnodo=this.inicio;
        this.reiniciar()
        while(auxnodo!=null){
            if(auxnodo.id!=id){
                this.insertar(auxnodo.id);
            }
            auxnodo=auxnodo.siguiente
        }
    }// Fin de eliminar



    imprimir(){
        var auxNodo = this.inicio
        while(auxNodo!=null){
            print(auxNodo.id)
            auxNodo=auxNodo.siguiente;
        }
    }// Fin imprimir


    grafica(){
        var strGraficaUno="digraph G { \n rankdir=\"LR\";\n"
        var nodoaux=this.inicio;
        while(nodoaux!=null){
            strGraficaUno+="cliente"+nodoaux.id+"[label=\""+nodoaux.id+"\"];\n"
        nodoaux=nodoaux.siguiente
        }
        nodoaux=this.inicio
        while(nodoaux!=null){
            if(nodoaux.siguiente!=null){strGraficaUno+="cliente"+nodoaux.id+"->"+"cliente"+(nodoaux.id+1)+";\n"}
        nodoaux=nodoaux.siguiente
        }
        strGraficaUno+="}"
        return strGraficaUno
    } // graficauno



}//Fin lista simple


var prueba = new listaSimple()
prueba.insertar(1)
prueba.insertar(2)
prueba.insertar(3)
prueba.insertar(4)
prueba.insertar(5)
prueba.insertar(6)
var miau = prueba.grafica()

d3.select("#grafica").graphviz()
.width(2000)
.height(1050)
.renderDot(miau)