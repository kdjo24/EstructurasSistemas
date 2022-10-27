class nodols{
    constructor(id){
        this.id=id;
        this.siguiente=null;
    }//Fin constructor
}//Fin nodo cola

class listaSimple{
    constructor(){
        this.primero=null;
        this.ultimo=null;
    }//Fin constructor

    insertar(id){
        var nuevo = new nodols(id)
        if(this.primero==null && this.ultimo==null){
            this.primero=nuevo;
            this.ultimo=nuevo;    
        }
        else{
            this.ultimo.siguiente=nuevo
            this.ultimo=this.ultimo.siguiente
        }
    }// fin insertar

    imprimir(){
        var aux = this.primero;
        if(aux==null){alert("No existen aun elementos en la pila")}
        while(aux!=null){
            alert(aux.id)
            aux=aux.siguiente
        }
    }// fin imprimir

    grafica(inicio,alternador){
        var nodoaux=this.primero;
        var strGraficaUno="\n\n"+inicio+"->"+(nodoaux.id+alternador)+";\n"
        while(nodoaux!=null){
        strGraficaUno+=(nodoaux.id+alternador)+"[label=\""+nodoaux.id+"\"];\n"
        if(nodoaux.siguiente!=null){strGraficaUno+=(nodoaux.id+alternador)+"->"+(nodoaux.siguiente.id+alternador)+";\n"
        }
        nodoaux=nodoaux.siguiente;}
        return strGraficaUno
    } // graficauno




}//fin clase cola

class nodoDobleCircular{

    constructor(id){
        this.id=id;
        this.siguiente=null;
        this.anterior=null;
        this.lista=new listaSimple()
    }//Fin constructor

}// Nodo doble circular

class listaDobleCircular{

    constructor(id){
        this.primero=null;
        this.ultimo=null;
    }// fin constructor

    insertar(id){
        var nuevoNodo = new nodoDobleCircular(id);
        if(this.primero==null && this.ultimo==null){
            this.primero=nuevoNodo; this.ultimo=this.primero;
            this.primero.siguiente=this.primero; this.primero.anterior=this.ultimo;
        }// fin del if
        else{
            var auxNodo = this.primero;
            while(this.primero.siguiente!=auxNodo){this.primero=this.primero.siguiente;}
            this.ultimo=nuevoNodo;
            this.primero.siguiente=this.ultimo;
            this.ultimo.anterior=this.primero;
            this.primero=auxNodo;
            this.ultimo.siguiente=this.primero;
            this.primero.anterior=this.ultimo;
        }// else
    }// fin insertar

    retornoId(id){
        var aux = this.primero;
        var contador=0;
        if(aux.id==id){return aux}
        aux=aux.siguiente;
        while(aux!=null & aux!=this.primero){
            if(aux.id==id){return aux}
            aux=aux.siguiente
        }
        return null;
    }// retorno Id

    insertarInterno(id,datoInterno){
        this.retornoId(id).lista.insertar(datoInterno)
    }// insertar interno


    grafica(){
        var strGraficaUno="digraph G { \n rankdir=\"LR\";\n"
        var nodoaux=this.primero;
        var contador=0;
        var alternador=101010
        if(contador==0){ 
            strGraficaUno+=contador+"[label=\""+nodoaux.id+"\"];\n"
            //console.log(nodoaux.lista.grafica(contador,alternador))
            if(nodoaux.lista.primero!=null){
            strGraficaUno+=nodoaux.lista.grafica(contador,alternador)
            alternador=alternador+114324+Math.floor(Math.random()*9999)
         }
            nodoaux=nodoaux.siguiente;
        contador=contador+1;}
        while(nodoaux!=this.primero && contador!=0){
        strGraficaUno+=contador+"[label=\""+nodoaux.id+"\"];\n"
        var miau=contador-1
        strGraficaUno+=miau+"->"+contador+";\n"
        strGraficaUno+=contador+"->"+miau+";\n"
        if(nodoaux.lista.primero!=null){
        strGraficaUno+=nodoaux.lista.grafica(contador,alternador)
        alternador=alternador+12342+Math.floor(Math.random()*9999)
        }
        contador=contador+1;
        nodoaux=nodoaux.siguiente;}
        strGraficaUno+="0->"+(miau+1)+";\n"
        strGraficaUno+=(miau+1)+"->0;\n"
        strGraficaUno+="}"
        return strGraficaUno
    } // graficauno


}// Fin lista doble circular


var prueba = new listaDobleCircular()
prueba.insertar(1)
//-----------------
prueba.insertarInterno(1,24)
prueba.insertarInterno(1,25)
prueba.insertarInterno(1,26)
//-----------------
prueba.insertar(2)
prueba.insertar(3)
prueba.insertar(4)
////////////////////
prueba.insertarInterno(4,30)
prueba.insertarInterno(4,35)
prueba.insertarInterno(4,37)
//////////////////////
prueba.insertar(5)
//-------------------
prueba.insertarInterno(5,6)
prueba.insertarInterno(5,100)
prueba.insertarInterno(5,101)
prueba.insertarInterno(5,111)
//---------------------
prueba.insertar(6)
prueba.insertar(8)
//------------------
prueba.insertarInterno(8,55)
prueba.insertarInterno(8,56)
prueba.insertarInterno(8,5)
//-----------------
prueba.insertar(12)
prueba.insertar(24)
//-------------------
prueba.insertarInterno(24,"Ander")
//-------------------
var miau = prueba.grafica()

d3.select("#grafica").graphviz()
.width(2000)
.height(2000)
.renderDot(miau)