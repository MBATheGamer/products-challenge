import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/products/")({
  component: RouteComponent,
});

function RouteComponent() {
  const fetchProducts = () =>
    fetch("http://localhost:8000/api/products")
      .then(response => response.json())
      .then<Product[]>(response => response.products);
  const navigate = useNavigate({ from: "/products" });

  const { data: products, error } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (error) return <p>{error.message}</p>;

  return (
    <>
      {products?.map(product => (
        <Button
          key={product.id}
          onClick={() => navigate({ to: `/products/${product.id}` })}
        >
          <Card>
            <img src={product.thumbnail} />
            <h2>{product.title}</h2>
            <p>{product.price}</p>
          </Card>
        </Button>
      ))}
    </>
  );
}
