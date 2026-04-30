import CategoryPage from '../components/CategoryPage';
import { womenProducts, womenCategories } from '../data/products';

export default function Women() {
  return (
    <div className="pt-20">
      <CategoryPage
        title="Women's Collection"
        subtitle="Grace in Every Thread"
        products={womenProducts}
        categories={womenCategories}
        bannerImage="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80"
      />
    </div>
  );
}
