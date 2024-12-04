import axios from "axios";

const productsApi = axios.create({
    baseURL: 'http://localhost:3000/products'
});

//Funcion para traer productos (método GET)
export const getProducts = async ()=> {
   const res =  await productsApi.get('/')
   return res.data;
}

//Funcion para crear productos (método post)
export const createProducts = (product)=> productsApi.post('/', product);

//Funcion para eliminar productos (método delete)
export const deleteProducts = id => productsApi.delete(`/${id}`);


