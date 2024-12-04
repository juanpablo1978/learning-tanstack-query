import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../api/productsAPI";

//quede en min 27

const Products = () => {
  const {
    isLoading,
    data: products,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"], //traemos los datos a traves de la funcion getPorducts (linea de abajo)
    queryFn: getProducts,
    select: (products) => products.sort((a, b) => b.id - a.id), //ordenamos los datos , ver por que no funciona!!!!!
  });

  if (isLoading) return <p>Loading</p>;
  else if (isError) return <p>Error: {error.mesages}</p>;

  return products.map((product) => (
    <div key={product.id}>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>US$ {product.price}</p>

      <button>Delete</button>
      <input type="checkbox" />
      <label htmlFor="">In stock</label>
    </div>
  ));
};

export default Products;
