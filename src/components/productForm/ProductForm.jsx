import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProducts } from "../../api/productsAPI";

const ProductForm = () => {
  const queryClient = useQueryClient();

  const addProductMutation = useMutation({
    mutationFn: createProducts,
    onSuccess: () => {
      queryClient.invalidateQueries("products");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target); //lee los datos
    const product = Object.fromEntries(formData); //extrae los datos
    addProductMutation.mutate({
      ...product,
      inStock: true,
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" />
      <label htmlFor="description">Description</label>
      <input type="text" id="description" name="description" />
      <label htmlFor="price">Price</label>
      <input type="text" id="price" name="price" />

      <button>Add product</button>
    </form>
  );
};

export default ProductForm;
