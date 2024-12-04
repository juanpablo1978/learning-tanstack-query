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
    queryKey: ["products"],
    queryFn: getProducts,
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
