import CategoryPage from '../components/CategoryPage';
import { menProducts, menCategories } from '../data/products';

export default function Men() {
  return (
    <div className="pt-20">
      <CategoryPage
        title="Men's Collection"
        subtitle="For the Distinguished Gentleman"
        products={menProducts}
        categories={menCategories}
        bannerImage="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1600&q=80"
      />
    </div>
  );
}
