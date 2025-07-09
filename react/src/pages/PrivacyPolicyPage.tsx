import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="text-gray-300">
            We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Personal identification information (Name, email address, phone number)</li>
            <li>Payment information</li>
            <li>Usage data and analytics</li>
            <li>Technical data including IP address and browser information</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>To provide and maintain our service</li>
            <li>To notify you about changes to our service</li>
            <li>To provide customer support</li>
            <li>To process your transactions</li>
            <li>To improve our website and services</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
          <p className="text-gray-300">
            We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Right to access your personal data</li>
            <li>Right to rectification of your personal data</li>
            <li>Right to erasure of your personal data</li>
            <li>Right to restrict processing of your personal data</li>
            <li>Right to data portability</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-300">
            If you have any questions about this Privacy Policy, please contact us through our contact page.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;