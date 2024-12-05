import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProducts,
  deleteProducts,
  upDateProducts,
} from "../../api/productsAPI";

//quede en min 48
const Products = () => {
  const queryClient = useQueryClient();

  const {
    isLoading,
    data: products,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"], //traigo los datos a traves de la funcion getPorducts (linea de abajo)
    queryFn: getProducts,
  });

  const deleteProductsMutation = useMutation({
    mutationFn: deleteProducts,
    onSuccess: () => {
      queryClient.invalidateQueries("products");
    },
  });

  const upDateProductsMutation = useMutation({
    mutationFn: upDateProducts,
    onSuccess: () => {
      queryClient.invalidateQueries("products");
    },
  });

  if (isLoading) return <p>Loading</p>;
  else if (isError) return <p>Error: {error.mesages}</p>;

  return products.map((product) => (
    <div key={product.id}>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>US$ {product.price}</p>

      <button
        onClick={() => {
          deleteProductsMutation.mutate(product.id);
        }}
      >
        Delete
      </button>
      <input
        type="checkbox"
        checked={product.inStock}
        id={product.id}
        onChange={(e) => {
          upDateProductsMutation.mutate({
            ...product,
            inStock: e.target.checked,
          });
        }}
      />
      <label htmlFor={product.id}>In stock</label>
    </div>
  ));
};

export default Products;
