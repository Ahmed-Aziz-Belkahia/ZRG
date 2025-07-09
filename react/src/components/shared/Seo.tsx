import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SeoProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  price?: number;
  currency?: string;
}

const Seo: React.FC<SeoProps> = ({ 
  title, 
  description, 
  keywords = [], 
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
  price,
  currency = 'USD'
}) => {
  const siteTitle = 'ZRG Gaming - Premium FiveM Scripts';
  const fullTitle = `${title} | ${siteTitle}`;
  const defaultImage = 'https://yourdomain.com/default-og-image.jpg';
  const siteUrl = 'https://yourdomain.com';
  const finalUrl = url || siteUrl;
  const finalImage = image || defaultImage;

  const getStructuredData = () => {
    const baseData = {
      "@context": "https://schema.org",
      "@type": type.charAt(0).toUpperCase() + type.slice(1),
      "url": finalUrl,
      "name": title,
      "description": description,
      "image": finalImage
    };

    if (type === 'article') {
      return {
        ...baseData,
        "author": {
          "@type": "Person",
          "name": author
        },
        "datePublished": publishedTime,
        "dateModified": modifiedTime || publishedTime,
        "publisher": {
          "@type": "Organization",
          "name": "ZRG Gaming",
          "logo": {
            "@type": "ImageObject",
            "url": "https://yourdomain.com/logo.png"
          }
        },
        "articleSection": section
      };
    }

    if (type === 'product') {
      return {
        ...baseData,
        "offers": {
          "@type": "Offer",
          "price": price,
          "priceCurrency": currency,
          "availability": "https://schema.org/InStock"
        },
        "brand": {
          "@type": "Brand",
          "name": "ZRG Gaming"
        }
      };
    }

    return baseData;
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <link rel="canonical" href={finalUrl} />

      {/* Open Graph */}
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:type" content={type} />
      {publishedTime && <meta property="article:published_time\" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author\" content={author} />}
      {section && <meta property="article:section" content={section} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={finalImage} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(getStructuredData())}
      </script>
    </Helmet>
  );
};

export default Seo;