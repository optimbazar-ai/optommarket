import { Helmet } from 'react-helmet-async'

const SEO = ({ 
  title = 'OptoMarket.uz - O\'zbekistondagi eng yirik optom savdo platformasi',
  description = '10,000+ mahsulotlar, raqobatbardosh narxlar va tez yetkazib berish. Biznesingiz uchun eng yaxshi optom savdo platformasi.',
  keywords = 'optom savdo, wholesale, uzbekistan, mahsulotlar, biznes, optom narxlar',
  image = '/og-image.jpg',
  url = 'https://optommarket.uz'
}) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="uz_UZ" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Uzbek" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="OptoMarket.uz" />
      <link rel="canonical" href={url} />
    </Helmet>
  )
}

export default SEO
