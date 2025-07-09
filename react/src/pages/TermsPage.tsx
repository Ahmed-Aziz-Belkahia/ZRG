import React from 'react';

const TermsPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-300">
            By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
          <p className="text-gray-300">
            Permission is granted to temporarily download one copy of the materials (scripts) purchased on our website for personal, 
            non-commercial transitory viewing only.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Disclaimer</h2>
          <p className="text-gray-300">
            The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, 
            and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions 
            of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Limitations</h2>
          <p className="text-gray-300">
            In no event shall we or our suppliers be liable for any damages (including, without limitation, damages for loss 
            of data or profit, or due to business interruption) arising out of the use or inability to use the materials on 
            our website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Revisions and Errata</h2>
          <p className="text-gray-300">
            The materials appearing on our website could include technical, typographical, or photographic errors. We do not 
            warrant that any of the materials on our website are accurate, complete, or current.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Links</h2>
          <p className="text-gray-300">
            We have not reviewed all of the sites linked to our website and are not responsible for the contents of any such 
            linked site. The inclusion of any link does not imply endorsement by us of the site.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Site Terms of Use Modifications</h2>
          <p className="text-gray-300">
            We may revise these terms of use for our website at any time without notice. By using this website, you are 
            agreeing to be bound by the then current version of these Terms and Conditions of Use.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Governing Law</h2>
          <p className="text-gray-300">
            Any claim relating to our website shall be governed by the laws of the jurisdiction in which we operate without 
            regard to its conflict of law provisions.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsPage;