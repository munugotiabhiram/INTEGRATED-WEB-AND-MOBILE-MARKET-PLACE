import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Search, SlidersHorizontal, RefreshCw, X, Sparkles } from 'lucide-react';
import { useApp } from '../context';
import ProductCard from '../components/ProductCard';

const ProductsPage = () => {
  const { API_BASE } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [sortOption, setSortOption] = useState('newest');

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, sortOption]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_BASE}/products/categories`);
      setCategories(res.data);
    } catch (err) {
      console.warn('Error fetching categories:', err.message);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = `${API_BASE}/products?`;
      if (selectedCategory && selectedCategory !== 'All') {
        url += `category=${encodeURIComponent(selectedCategory)}&`;
      }
      if (sortOption) {
        url += `sort=${sortOption}&`;
      }
      if (searchTerm) {
        url += `search=${encodeURIComponent(searchTerm)}&`;
      }

      const res = await axios.get(url);
      setProducts(res.data);
    } catch (err) {
      console.warn('Error fetching products:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    // Trigger re-fetch without search term
    axios.get(`${API_BASE}/products?category=${selectedCategory !== 'All' ? encodeURIComponent(selectedCategory) : ''}&sort=${sortOption}`)
      .then(res => setProducts(res.data));
  };

  return (
    <div style={{ padding: '40px 0 60px 0' }}>
      <div className="container-custom">
        {/* Header */}
        <div style={{ marginBottom: '35px' }}>
          <span className="badge-neon badge-cyan" style={{ marginBottom: '10px' }}>
            Interactive 3D Catalog
          </span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '10px' }}>
            Explore All Products
          </h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px' }}>
            Browse through our futuristic marketplace catalog with real-time stock availability, instant search, and categorized filtering.
          </p>
        </div>

        {/* Filter & Search Bar Controls */}
        <div
          className="glass-panel"
          style={{
            padding: '20px 24px',
            marginBottom: '35px',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
        >
          {/* Search Row */}
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '12px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <input
                type="text"
                placeholder="Search products by name, specs or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-3d"
                style={{ paddingLeft: '44px', paddingRight: searchTerm ? '40px' : '16px' }}
              />
              <Search
                size={18}
                color="var(--neon-cyan)"
                style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer'
                  }}
                >
                  <X size={18} />
                </button>
              )}
            </div>

            <button type="submit" className="btn-3d btn-primary-3d" style={{ padding: '0 24px' }}>
              Search
            </button>
          </form>

          {/* Category Pills & Sort Select */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '16px'
          }}>
            {/* Category Pills */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginRight: '6px', fontWeight: 600 }}>
                Category:
              </span>
              <button
                onClick={() => setSelectedCategory('All')}
                className="btn-3d"
                style={{
                  padding: '6px 14px',
                  fontSize: '0.8rem',
                  borderRadius: '20px',
                  background: selectedCategory === 'All' ? 'linear-gradient(135deg, #00f5d4, #0070f3)' : 'rgba(255, 255, 255, 0.05)',
                  color: selectedCategory === 'All' ? '#000' : '#fff',
                  border: '1px solid var(--border-glass)'
                }}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className="btn-3d"
                  style={{
                    padding: '6px 14px',
                    fontSize: '0.8rem',
                    borderRadius: '20px',
                    background: selectedCategory === cat.name ? 'linear-gradient(135deg, #00f5d4, #0070f3)' : 'rgba(255, 255, 255, 0.05)',
                    color: selectedCategory === cat.name ? '#000' : '#fff',
                    border: '1px solid var(--border-glass)'
                  }}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Sort Select */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <SlidersHorizontal size={16} color="var(--neon-cyan)" />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                Sort:
              </span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="input-3d"
                style={{ width: 'auto', padding: '6px 14px', fontSize: '0.85rem', borderRadius: '10px' }}
              >
                <option value="newest" style={{ background: '#0f0926' }}>Newest Added</option>
                <option value="price_asc" style={{ background: '#0f0926' }}>Price: Low to High</option>
                <option value="price_desc" style={{ background: '#0f0926' }}>Price: High to Low</option>
                <option value="name_asc" style={{ background: '#0f0926' }}>Name (A-Z)</option>
                <option value="stock" style={{ background: '#0f0926' }}>Highest Stock</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div style={{ marginBottom: '20px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Showing <strong>{products.length}</strong> available products
          {selectedCategory !== 'All' && ` in "${selectedCategory}"`}
        </div>

        {/* Product Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--neon-cyan)' }}>
            <RefreshCw size={36} className="animate-spin" />
            <p style={{ marginTop: '14px', fontWeight: 600 }}>Fetching products from MySQL database...</p>
          </div>
        ) : products.length === 0 ? (
          <div
            className="glass-panel"
            style={{ textAlign: 'center', padding: '60px 20px', borderRadius: '24px' }}
          >
            <Sparkles size={48} color="var(--neon-magenta)" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '8px' }}>
              No Products Found
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
              We could not find any products matching your search or filters.
            </p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchTerm(''); }}
              className="btn-3d btn-primary-3d"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
