import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FAQ {
  id: string | number;
  question: string;
  answer: string;
  category: string;
}

const FAQPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openQuestions, setOpenQuestions] = useState<Set<string>>(new Set());
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await fetch('/api/faqs/');
        const data: FAQ[] = await response.json();
        setFaqs(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFAQs();
  }, []);

  const toggleQuestion = (question: string) => {
    const newOpenQuestions = new Set(openQuestions);
    if (newOpenQuestions.has(question)) {
      newOpenQuestions.delete(question);
    } else {
      newOpenQuestions.add(question);
    }
    setOpenQuestions(newOpenQuestions);
  };

  const filteredFAQs = faqs.filter(faq => {
    return faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
           faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (isLoading) {
    return <p className="text-center text-gray-400">Loading FAQs...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-black">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm mb-8">
          <Link to="/" className="text-gray-400 hover:text-gold">Home</Link>
          <span className="text-gray-600">/</span>
          <span className="text-gold">FAQ</span>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-play text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked <span className="text-gold">Questions</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions about our scripts, installation, licensing, and support.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-dark-gray pl-12 pr-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold/50"
            />
          </div>
        </div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto">
          {filteredFAQs.length > 0 ? (
            <div className="space-y-4">
              {filteredFAQs.map((faq) => (
                <div
                  key={faq.question}
                  className="bg-dark-gray rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleQuestion(faq.question)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className="font-play text-lg font-medium text-white">
                      {faq.question}
                    </span>
                    {openQuestions.has(faq.question) ? (
                      <ChevronUp className="text-gold" size={20} />
                    ) : (
                      <ChevronDown className="text-gold" size={20} />
                    )}
                  </button>
                  {openQuestions.has(faq.question) && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-400">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4">No questions found matching your search.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                }}
                className="text-gold hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-16">
          <h2 className="font-play text-2xl font-bold text-white mb-4">
            Still have questions?
          </h2>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold/90 text-black font-bold px-8 py-3 rounded transition-colors duration-200"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;