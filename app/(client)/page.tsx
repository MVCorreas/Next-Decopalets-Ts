import data from '@/lib/data';
import ProductItem from '@/components/Product/ProductItem';

export default function Home() {
  return (
    <>
    <h2 className="text-2xl py-2">Latest Products</h2>
    <div className="grid grid-cols-1 pag-4 gap-8 md:grid-cols-3 lg:grid-cols-4">
      {
        data.products.map((product) => (
          <ProductItem key={ product.id} product={product} />
        ))}
    </div>
    </>
  );
}
