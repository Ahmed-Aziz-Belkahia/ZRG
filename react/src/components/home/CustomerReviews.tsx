import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';

interface Testimonial {
  id: string;
  pfp: string;
  name: string;
  comment: string;
  date: string;
  rating: number; // Added rating property to match the API response
}

const CustomerReviews: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/testimonials/');
        const data: Testimonial[] = await response.json();
        setTestimonials(data); // Removed filtering by rating
      } catch (error) {
        console.error('Failed to fetch testimonials:', error);
      }
    };

    fetchTestimonials();
  }, []);

  const nextSlide = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex === totalPages - 1 ? 0 : prevIndex + 1));

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalPages - 1 : prevIndex - 1));

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const goToPage = (index: number) => {
    if (isAnimating) return;
    setCurrentIndex(index);
  };

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-play text-3xl md:text-4xl font-bold text-white mb-3">
            Customer <span className="text-gold">Testimonials</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Hear what our customers say about our scripts. Real feedback from real server owners.
          </p>
        </div>

        {/* Reviews Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
          {testimonials.length > itemsPerPage && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-dark-gray text-white p-2 rounded-full shadow-lg hover:bg-gold hover:text-black transition-colors duration-200 md:-translate-x-6"
                aria-label="Previous testimonials"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-dark-gray text-white p-2 rounded-full shadow-lg hover:bg-gold hover:text-black transition-colors duration-200 md:translate-x-6"
                aria-label="Next testimonials"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Carousel */}
          <div ref={carouselRef} className="overflow-hidden">
            <div
              className={`flex transition-transform duration-500 ease-in-out ${
                isAnimating ? 'opacity-80' : 'opacity-100'
              }`}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {Array.from({ length: totalPages }).map((_, pageIndex) => (
                <div key={pageIndex} className="min-w-full grid grid-cols-1 md:grid-cols-3 gap-6">
                  {testimonials
                    .slice(pageIndex * itemsPerPage, pageIndex * itemsPerPage + itemsPerPage)
                    .map((testimonial) => (
                      <div
                        key={`${testimonial.id}-${Math.random()}`}
                        className="bg-dark-gray rounded-lg p-6 flex flex-col h-full transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-gold/5"
                      >
                        {/* User Info */}
                        <div className="flex items-center mb-4">
                          <img
                            src={testimonial.pfp}
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full mr-4 object-cover"
                          />
                          <div>
                            <h4 className="font-medium text-white">{testimonial.name}</h4>
                            <div className="flex mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={14}
                                  className="text-gold fill-gold"
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-grow">
                          <p className="text-gray-300 italic mb-4">"{testimonial.comment}"</p>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-800">
                          <span className="text-xs text-gray-500">
                            {new Date(testimonial.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                          <div className="flex items-center text-gold">
                            <MessageSquare size={14} className="mr-1" />
                            <span className="text-xs">Testimonial</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    currentIndex === index ? 'bg-gold w-6' : 'bg-gray-600 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;