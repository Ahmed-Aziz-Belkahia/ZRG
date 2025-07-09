import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  id: string | number;
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await fetch('/api/faqs/');
        const data: FAQItem[] = await response.json();
        setFaqs(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFAQs();
  }, []);

  if (isLoading) {
    return <p className="text-center text-gray-400">Loading FAQs...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  if (faqs.length === 0) {
    return <p className="text-center text-gray-400">No FAQs available.</p>;
  }

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-play text-3xl md:text-4xl font-bold text-white mb-3">
            Frequently Asked <span className="text-gold">Questions</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Find quick answers to common questions about our scripts and services
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={`${faq.id}-${index}`}
                className="bg-dark-gray rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left group transition-all duration-300 hover:bg-dark-gray/70"
                >
                  <span className="font-play text-lg font-medium text-white group-hover:text-gold transition-colors duration-300">
                    {faq.question}
                  </span>
                  <div className={`transform transition-transform duration-300 ${
                    openQuestion === index ? 'rotate-180' : ''
                  }`}>
                    <ChevronDown className="text-gold" size={20} />
                  </div>
                </button>
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    openQuestion === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6">
                    <p className="text-gray-400">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;