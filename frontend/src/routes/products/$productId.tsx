import { Card } from "@/components/ui/card";
import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/products/$productId")({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();

  const fetchProduct = () =>
    fetch(`http://localhost:8000/api/products/${params["productId"]}`).then(
      response => response.json(),
    );

  const { data: product, error } = useQuery<Product, Error>({
    queryKey: ["product"],
    queryFn: fetchProduct,
  });

  if (error) return <p>{error.message}</p>;

  return (
    <>
      {product && (
        <Card>
          <img src={product.thumbnail} />
          <h2>{product.title}</h2>
          <p>{product.price}</p>
          <p>{product.description}</p>
        </Card>
      )}
    </>
  );
}
