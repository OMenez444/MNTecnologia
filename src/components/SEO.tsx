import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

const SEO = ({
  title = "MN Tech Launchpad - Marketing Digital & Desenvolvimento Web",
  description = "Especialistas em marketing digital, desenvolvimento web, SaaS e ferramentas de gestão para acelerar o crescimento da sua empresa. ROI médio de 300%.",
  keywords = "marketing digital, desenvolvimento web, SEO, tráfego pago, desenvolvimento SaaS, ferramentas de gestão",
  image = "/og-image.jpg",
  url = "https://mn-tech-launchpad.com",
  type = "website"
}: SEOProps) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "MN Tech Launchpad",
    "description": description,
    "url": url,
    "logo": `${url}/logo.svg`,
    "sameAs": [
      "https://linkedin.com/company/mntecnologia",
      "https://facebook.com/mntecnologia",
      "https://www.instagram.com/mn.tecnologia_iub"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+55-64-99666-6165",
      "contactType": "customer service",
      "areaServed": "BR"
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": -23.5505,
        "longitude": -46.6333
      },
      "geoRadius": "50000"
    }
  };

  return (
    <Helmet>
      {/* Meta Tags Básicas */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="MN Tech Launchpad" />
      <meta name="robots" content="index, follow" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="MN Tech Launchpad" />
      <meta property="og:locale" content="pt_BR" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

                                                                                                                   {/* Favicon e Ícones do Site */}
                        <link rel="icon" type="image/x-icon" href="/favicon.ico?v=7" />
                        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=7" />
                        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=7" />
                        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=7" />
                        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png?v=7" />
                        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png?v=7" />
                        <link rel="manifest" href="/site.webmanifest?v=7" />
      <meta name="msapplication-TileColor" content="#10B981" />
      <meta name="theme-color" content="#10B981" />

      {/* Preconnect para performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;

