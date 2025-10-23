import express from 'express';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import Blog from '../models/Blog.js';

const router = express.Router();

// GET /api/seo/sitemap.xml - Main sitemap
router.get('/sitemap.xml', async (req, res) => {
  try {
    const baseUrl = process.env.FRONTEND_URL || 'https://optommarket.uz';
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap-static.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-products.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-categories.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-blog.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
</sitemapindex>`;

    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
  } catch (error) {
    res.status(500).send('Error generating sitemap');
  }
});

// GET /api/seo/sitemap-static.xml - Static pages sitemap
router.get('/sitemap-static.xml', async (req, res) => {
  try {
    const baseUrl = process.env.FRONTEND_URL || 'https://optommarket.uz';
    
    const staticPages = [
      { url: '', priority: '1.0', changefreq: 'daily' },
      { url: '/products', priority: '0.9', changefreq: 'hourly' },
      { url: '/categories', priority: '0.9', changefreq: 'daily' },
      { url: '/blog', priority: '0.8', changefreq: 'daily' },
      { url: '/login', priority: '0.5', changefreq: 'monthly' },
      { url: '/register', priority: '0.5', changefreq: 'monthly' },
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${staticPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
  } catch (error) {
    res.status(500).send('Error generating static sitemap');
  }
});

// GET /api/seo/sitemap-products.xml - Products sitemap
router.get('/sitemap-products.xml', async (req, res) => {
  try {
    const baseUrl = process.env.FRONTEND_URL || 'https://optommarket.uz';
    
    const products = await Product.find({ 
      active: true, 
      approvalStatus: 'approved' 
    })
      .select('_id name updatedAt images')
      .sort({ updatedAt: -1 })
      .limit(5000); // Google limit

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${products.map(product => {
  const imageUrl = product.images && product.images.length > 0 
    ? (product.images[0].startsWith('http') 
        ? product.images[0] 
        : `${process.env.BACKEND_URL || 'http://localhost:5000'}${product.images[0]}`)
    : '';
  
  return `  <url>
    <loc>${baseUrl}/products/${product._id}</loc>
    <lastmod>${product.updatedAt.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>${imageUrl ? `
    <image:image>
      <image:loc>${imageUrl}</image:loc>
      <image:title>${product.name}</image:title>
    </image:image>` : ''}
  </url>`;
}).join('\n')}
</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
  } catch (error) {
    console.error('Error generating products sitemap:', error);
    res.status(500).send('Error generating products sitemap');
  }
});

// GET /api/seo/sitemap-categories.xml - Categories sitemap
router.get('/sitemap-categories.xml', async (req, res) => {
  try {
    const baseUrl = process.env.FRONTEND_URL || 'https://optommarket.uz';
    
    const categories = await Category.find({ active: true })
      .select('_id slug name updatedAt')
      .sort({ updatedAt: -1 });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${categories.map(category => `  <url>
    <loc>${baseUrl}/categories/${category.slug || category._id}</loc>
    <lastmod>${category.updatedAt.toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')}
</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
  } catch (error) {
    console.error('Error generating categories sitemap:', error);
    res.status(500).send('Error generating categories sitemap');
  }
});

// GET /api/seo/sitemap-blog.xml - Blog sitemap
router.get('/sitemap-blog.xml', async (req, res) => {
  try {
    const baseUrl = process.env.FRONTEND_URL || 'https://optommarket.uz';
    
    const posts = await Blog.find({ published: true })
      .select('slug title updatedAt createdAt')
      .sort({ updatedAt: -1 })
      .limit(5000);

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${posts.map(post => `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${post.updatedAt.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <news:news>
      <news:publication>
        <news:name>OptoMarket.uz</news:name>
        <news:language>uz</news:language>
      </news:publication>
      <news:publication_date>${post.createdAt.toISOString()}</news:publication_date>
      <news:title>${post.title}</news:title>
    </news:news>
  </url>`).join('\n')}
</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
  } catch (error) {
    console.error('Error generating blog sitemap:', error);
    res.status(500).send('Error generating blog sitemap');
  }
});

// GET /api/seo/structured-data/:type/:id - Get structured data for specific item
router.get('/structured-data/:type/:id', async (req, res) => {
  try {
    const { type, id } = req.params;
    const baseUrl = process.env.FRONTEND_URL || 'https://optommarket.uz';
    let structuredData = null;

    if (type === 'product') {
      const product = await Product.findById(id)
        .populate('category', 'name')
        .populate('createdBy', 'name companyName');

      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }

      structuredData = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "description": product.description,
        "image": product.images && product.images.length > 0 
          ? product.images.map(img => img.startsWith('http') ? img : `${process.env.BACKEND_URL}${img}`)
          : [],
        "brand": {
          "@type": "Brand",
          "name": product.brand || product.createdBy?.companyName || "OptoMarket.uz"
        },
        "offers": {
          "@type": "Offer",
          "url": `${baseUrl}/products/${product._id}`,
          "priceCurrency": "UZS",
          "price": product.price,
          "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          "seller": {
            "@type": "Organization",
            "name": product.createdBy?.companyName || "OptoMarket.uz"
          }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.5",
          "reviewCount": product.soldCount || 1
        }
      };
    } else if (type === 'blog') {
      const post = await Blog.findById(id).populate('author', 'name');

      if (!post) {
        return res.status(404).json({ success: false, message: 'Blog post not found' });
      }

      structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt || post.metaDescription,
        "image": post.image || `${baseUrl}/logo.svg`,
        "author": {
          "@type": "Person",
          "name": post.author?.name || "OptoMarket.uz"
        },
        "publisher": {
          "@type": "Organization",
          "name": "OptoMarket.uz",
          "logo": {
            "@type": "ImageObject",
            "url": `${baseUrl}/logo.svg`
          }
        },
        "datePublished": post.createdAt.toISOString(),
        "dateModified": post.updatedAt.toISOString(),
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `${baseUrl}/blog/${post.slug}`
        }
      };
    }

    if (structuredData) {
      res.json({ success: true, data: structuredData });
    } else {
      res.status(400).json({ success: false, message: 'Invalid type' });
    }
  } catch (error) {
    console.error('Error generating structured data:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
