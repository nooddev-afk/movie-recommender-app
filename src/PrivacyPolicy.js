// src/pages/PrivacyPolicy.js
import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-20 font-body max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>

      <div className="space-y-6 text-sm text-zinc-300 leading-relaxed">
        <p>
          At The Movies Finder, we value your privacy. This Privacy Policy outlines how your personal data is
          collected, used, and protected when you use our website.
        </p>

        <h2 className="text-lg font-semibold text-white">1. Information We Collect</h2>
        <p>We may collect anonymous usage data, such as your browser type, IP address, and country location using cookies and third-party services like Google Analytics and IPAPI.</p>

        <h2 className="text-lg font-semibold text-white">2. Use of Cookies</h2>
        <p>
          We use cookies to personalize content and analyze traffic. Third-party vendors like Google may also use
          cookies to serve ads based on your prior visits to this or other websites.
        </p>

        <h2 className="text-lg font-semibold text-white">3. Google AdSense</h2>
        <p>
          This site may display ads served by Google AdSense. Google uses cookies to serve ads based on your
          interests and browsing behavior. You can learn more about how Google uses data by visiting their{' '}
          <a
            href="https://policies.google.com/technologies/ads"
            className="text-pink-400 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Advertising Policies
          </a>.
        </p>

        <h2 className="text-lg font-semibold text-white">4. Your Choices</h2>
        <p>
          You may disable cookies via your browser settings, but please note that some features of our site may not
          function properly as a result.
        </p>

        <h2 className="text-lg font-semibold text-white">5. Contact Us</h2>
        <p>
          For any questions about this Privacy Policy, you can email us at:{' '}
          <a
            href="mailto:contact@themoviesfinder.com"
            className="text-pink-400 underline"
          >
            contact@themoviesfinder.com
          </a>
        </p>
      </div>
    </div>
  );
}
