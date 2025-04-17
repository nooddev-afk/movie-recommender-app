// src/components/SeoHelmet.js
import React from "react";
import { Helmet } from "react-helmet";

export default function SeoHelmet({ title, description }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph for social sharing */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.themoviesfinder.com/" />
      <meta
        property="og:image"
        content="https://www.themoviesfinder.com/og-cover.jpg"
      />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content="https://www.themoviesfinder.com/og-cover.jpg"
      />

      {/* Canonical */}
      <link rel="canonical" href="https://www.themoviesfinder.com/" />
    </Helmet>
  );
}
