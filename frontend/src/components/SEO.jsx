import { Helmet } from 'react-helmet-async'

const SEO = ({ 
  title = 'OptomMarket.uz - O\'zbekistondagi eng yirik optom savdo platformasi',
  description = '10,000+ mahsulotlar, raqobatbardosh narxlar va tez yetkazib berish. Biznesingiz uchun eng yaxshi optom savdo platformasi.',
  keywords = 'optom savdo, wholesale, uzbekistan, mahsulotlar, biznes, optom narxlar, optom bozor, ulgurji savdo, optom market, online optom',
  image = 'https://optommarket.uz/og-image.jpg',
  url = 'https://optommarket.uz',
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'OptomMarket.uz',
  structuredData,
  noindex = false
}) => {
  // Generate default structured data if not provided
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "OptomMarket.uz",
    "url": "https://optommarket.uz",
    "description": description,
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://optommarket.uz/products?search={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "OptomMarket.uz",
      "logo": {
        "@type": "ImageObject",
        "url": "https://optommarket.uz/logo.svg"
      }
    }
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      
      {/* Robots */}
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'} />
      <meta name="googlebot" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <meta name="bingbot" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <meta name="yandex" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      
      {/* Language and Location */}
      <meta name="language" content="uz" />
      <meta name="geo.region" content="UZ" />
      <meta name="geo.placename" content="Uzbekistan" />
      <meta httpEquiv="content-language" content="uz" />
      
      {/* Canonical */}
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="uz_UZ" />
      <meta property="og:site_name" content="OptomMarket.uz" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@OptomMarketUz" />
      <meta name="twitter:creator" content="@OptomMarketUz" />
      
      {/* Additional SEO */}
      <meta name="revisit-after" content="3 days" />
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
      <meta name="coverage" content="Worldwide" />
      <meta name="target" content="all" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="MobileOptimized" content="320" />
      
      {/* Yandex */}
      <meta name="yandex-verification" content="" />
      
      {/* Google */}
      <meta name="google-site-verification" content="CbnMP1CwpktX-t6UyP1P4P2ZsIwuKy7hNYR8OVIrtRw" />
      
      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
    </Helmet>
  )
}

export default SEO
