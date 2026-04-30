import CategoryPage from '../components/CategoryPage';
import { kidsProducts, kidsCategories } from '../data/products';

export default function Kids() {
  return (
    <div className="pt-20">
      <CategoryPage
        title="Kids' Collection"
        subtitle="Little Ones, Big Style"
        products={kidsProducts}
        categories={kidsCategories}
        bannerImage="https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=1600&q=80"
      />
    </div>
  );
}
