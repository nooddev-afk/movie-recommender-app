import React from 'react';
import { Helmet } from 'react-helmet';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-20 font-body max-w-4xl mx-auto">
      <Helmet>
        <title>Privacy Policy | The Movies Finder</title>
        <meta
          name="description"
          content="Read The Movies Finder's privacy policy to understand how we collect, use, and protect your personal information when recommending what to watch."
        />
      </Helmet>

      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>

      <div className="space-y-6 text-sm text-zinc-300 leading-relaxed">
        <p>
          At The Movies Finder (<strong>themoviesfinder.com</strong>), we respect your privacy. This Privacy Policy explains how we collect and use data when you use our platform to discover trending movies and TV shows.
        </p>

        <h2 className="text-lg font-semibold text-white">1. Information We Collect</h2>
        <p>We may collect anonymous usage data such as your country location, browsing behavior, and device info using tools like Google Analytics and IPAPI.</p>

        <h2 className="text-lg font-semibold text-white">2. Use of Cookies</h2>
        <p>
          We use cookies to personalize recommendations and understand user engagement. Google AdSense and other ad partners may also use cookies for targeting ads based on your interests.
        </p>

        <h2 className="text-lg font-semibold text-white">3. AdSense and Third-Party Tools</h2>
        <p>
          The Movies Finder may display ads served by Google AdSense. These ads may use cookies or web beacons to deliver personalized content. To learn more, visit Google’s{' '}
          <a
            href="https://policies.google.com/technologies/ads"
            className="text-pink-400 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Advertising Policy Page
          </a>.
        </p>

        <h2 className="text-lg font-semibold text-white">4. Your Control</h2>
        <p>
          You can manage cookie preferences through your browser settings. Disabling cookies may affect the performance of features like localized content and tailored recommendations.
        </p>

        <h2 className="text-lg font-semibold text-white">5. Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy or how your data is used, email us at{' '}
          <a href="mailto:info@themoviesfinder.com" className="text-pink-400 underline">
            contact@themoviesfinder.com
          </a>
        </p>
      </div>
    </div>
  );
}
