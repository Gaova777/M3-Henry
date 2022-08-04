let productos=[];

function addProduct(producto){
    //productos.push(producto)
    if(!productos.includes(producto)){//includes me pregunta si lo que hay en los parentesis esta en mi arreglo
        productos.push(producto)
        return "Producto agregado correctamente"
    }else{
        throw new Error('el producto ya existe')
    }
}

function listProduct(){
    return productos;
}

module.exports ={addProduct, listProduct} //acá vemos como en un archivo que esta dentro de la carpeta Models, el archivo llamado productModels, podemos hacer funciones como queramos, y exportarlos