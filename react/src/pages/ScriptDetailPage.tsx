import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Play,
  Check,
  Shield,
  Download,
  Code,
  Clock,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Script, Review } from '../types';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import Seo from '../components/shared/Seo';
import RecentlyViewed from '../components/shared/RecentlyViewed';
import Recommendations from '../components/shared/Recommendations';
import StarRating from '../components/shared/StarRating';

const ScriptDetailPage: React.FC = () => {
  const { slug } = useParams();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();
  const { addToRecentlyViewed } = useRecentlyViewed();
  const [script, setScript] = useState<Script | null>(null);
  const [activeTab, setActiveTab] = useState<'description' | 'features' | 'requirements' | 'reviews'>('description');
  const [showVideo, setShowVideo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [videoLoading, setVideoLoading] = useState(false);
  const [keyFeatured, setKeyFeatured] = useState(false);
  const [systemRequirements, setSystemRequirements] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewForm, setReviewForm] = useState({ name: '', rating: 0, description: '' });
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchScript = async () => {
      try {
        const response = await fetch(`/api/scripts/${slug}/`);
        if (!response.ok) throw new Error('Script not found');
        const data = await response.json();
        setScript(data);
        setReviews(data.reviews || []);
        setKeyFeatured(data.key_featured);
        setSystemRequirements(data.system_requirements);
        addToRecentlyViewed(data);
      } catch (error) {
        setScript(null);
      } finally {
        setLoading(false);
      }
    };
    fetchScript();
  }, [slug]);

  const handleWishlistToggle = () => {
    if (!script) return; // Null check for script
    if (isInWishlist(script.id)) {
      removeFromWishlist(script.id);
    } else {
      addToWishlist(script);
    }
  };

  // Helper to get YouTube ID
  function getYouTubeId(url?: string) {
    if (!url) return '';
    const match = url.match(/(?:youtu.be\/|youtube.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? match[1] : '';
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReviewForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitReview = async () => {
    if (!script) {
      setFormError('Script not found.');
      return;
    }

    if (!reviewForm.name || !reviewForm.rating || !reviewForm.description) {
      setFormError('All fields are required.');
      return;
    }

    try {
      const response = await fetch('/api/write-review/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          script_id: script.id,
          name: reviewForm.name,
          rating: reviewForm.rating,
          description: reviewForm.description,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setFormError(errorData.error || 'Failed to submit review.');
        return;
      }

      const newReview = await response.json();
      setFormSuccess('Review submitted successfully!');
      setReviewForm({ name: '', rating: 0, description: '' });

      // Refresh the component by re-fetching the script data
      const updatedScriptResponse = await fetch(`/api/scripts/${slug}/`);
      if (updatedScriptResponse.ok) {
        const updatedScriptData = await updatedScriptResponse.json();
        setScript(updatedScriptData);
        setReviews(updatedScriptData.reviews || []);
      }
    } catch (error) {
      setFormError('An error occurred while submitting the review.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mb-4"></div>
          <span className="text-gold text-lg font-play">Loading script...</span>
        </div>
      </div>
    );
  }

  if (!script) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-black">
        <div className="container mx-auto px-4">
          <Seo 
            title="Script Not Found"
            description="The requested script could not be found."
            type="website"
          />
          <h1 className="font-play text-4xl font-bold text-white mb-8">
            Script not found
          </h1>
          <Link to="/scripts" className="text-gold hover:underline">
            Browse all scripts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Seo 
        title={script.title}
        description={script.description}
        keywords={[...(script.categories || []), 'FiveM', 'scripts', 'gaming', ...(script.seoKeywords || [])]}
        image={script.image || undefined}
        url={`https://yourdomain.com/script/${script.id}`}
        type="product"
        price={script.discountPrice || script.price}
        currency="USD"
      />
      
      <div className="min-h-screen pt-24 pb-16 bg-black">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm mb-8">
            <Link to="/" className="text-gray-400 hover:text-gold">Home</Link>
            <span className="text-gray-600">/</span>
            <Link to="/scripts" className="text-gray-400 hover:text-gold">Scripts</Link>
            <span className="text-gray-600">/</span>
            <span className="text-gold">{script.title}</span>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2">
              {/* Image Gallery and Video */}
              <div className="relative rounded-lg overflow-hidden mb-8">
                {/* Slides: demo video as first slide, then images */}
                <div className="relative">
                  {currentImageIndex === 0 && script.demoVideo ? (
                    showVideo ? (
                      <div className="relative aspect-video">
                        <button
                          onClick={() => setShowVideo(false)}
                          className="absolute top-4 right-4 z-10 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition-colors duration-200"
                        >
                          <X size={24} />
                        </button>
                        {videoLoading && (
                          <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/60">
                            <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        )}
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${getYouTubeId(script.video || script.demoVideo)}`}
                          title={`${script.title} preview`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          onLoad={() => setVideoLoading(false)}
                          onLoadStart={() => setVideoLoading(true)}
                          style={{ zIndex: 10 }}
                        ></iframe>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setShowVideo(true);
                          setVideoLoading(true);
                        }}
                        className="w-full aspect-video flex items-center justify-center bg-black/70 group relative"
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Play className="w-16 h-16 text-gold bg-black/60 rounded-full p-4 group-hover:bg-gold/30 transition-colors duration-300" />
                        </div>
                        <img
                          src={`https://img.youtube.com/vi/${getYouTubeId(script.video || script.demoVideo)}/hqdefault.jpg`}
                          alt={`${script.title} video preview`}
                          className="w-full aspect-video object-cover opacity-60"
                        />
                      </button>
                    )
                  ) : (
                    <img
                      src={script.images?.[currentImageIndex - (script.demoVideo ? 1 : 0)] ? `/media/${script.images[currentImageIndex - (script.demoVideo ? 1 : 0)]}` : script.image ? `/media/${script.image}` : undefined}
                      alt={`${script.title} preview ${currentImageIndex + 1}`}
                      className="w-full aspect-video object-cover"
                    />
                  )}

                  {/* Image Navigation (account for video slide) */}
                  {((script.images && script.images.length > 1) || script.demoVideo) && (
                    <>
                      <button
                        onClick={() => setCurrentImageIndex((prev) => {
                          const total = (script.images?.length || 0) + (script.demoVideo ? 1 : 0);
                          return prev === 0 ? total - 1 : prev - 1;
                        })}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition-colors duration-200"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        onClick={() => setCurrentImageIndex((prev) => {
                          const total = (script.images?.length || 0) + (script.demoVideo ? 1 : 0);
                          return prev === total - 1 ? 0 : prev + 1;
                        })}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition-colors duration-200"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Thumbnail Gallery: include video as first thumbnail if present */}
              {((script.images && script.images.length > 1) || script.demoVideo) && (
                <div className="grid grid-cols-4 gap-4 mb-8">
                  {script.demoVideo && (
                    <button
                      key="video-thumb"
                      onClick={() => {
                        setCurrentImageIndex(0);
                        setShowVideo(false);
                      }}
                      className={`relative aspect-video rounded-lg overflow-hidden ${currentImageIndex === 0 && !showVideo ? 'ring-2 ring-gold' : 'opacity-70 hover:opacity-100'}`}
                    >
                      <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                        <Play className="w-8 h-8 text-gold" />
                      </div>
                      <img
                        src={`https://img.youtube.com/vi/${getYouTubeId(script.video || script.demoVideo)}/hqdefault.jpg`}
                        alt={`${script.title} video thumbnail`}
                        className="w-full h-full object-cover opacity-60"
                      />
                    </button>
                  )}
                  {script.images && script.images.map((image, index) => {
                    const imgIndex = index + (script.demoVideo ? 1 : 0);
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          setCurrentImageIndex(imgIndex);
                          setShowVideo(false);
                        }}
                        className={`relative aspect-video rounded-lg overflow-hidden ${currentImageIndex === imgIndex && !showVideo ? 'ring-2 ring-gold' : 'opacity-70 hover:opacity-100'}`}
                      >
                        <img
                          src={image ? `/media/${image}` : undefined}
                          alt={`${script.title} thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Tabs */}
              <div className="mb-8">
                <div className="flex border-b border-gray-800">
                  {(['description', 'features', 'requirements', 'reviews'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-3 font-play font-medium transition-colors duration-200 ${
                        activeTab === tab
                          ? 'text-gold border-b-2 border-gold'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>

                <div className="py-6">
                  {activeTab === 'description' && (
                    <div className="prose prose-invert max-w-none">
                      <p className="text-gray-300 leading-relaxed mb-6">
                        {script.description}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-dark-gray rounded-lg p-6">
                          <h3 className="font-play text-xl font-bold text-white mb-4">
                            Key Benefits
                          </h3>
                          <ul className="space-y-3">
                            {script.key_benefits && script.key_benefits.split(',').map((benefit, idx) => (
                              <li key={idx} className="flex items-center text-gray-300">
                                <Check className="text-gold mr-3" size={18} />
                                {benefit.trim()}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-dark-gray rounded-lg p-6">
                          <h3 className="font-play text-xl font-bold text-white mb-4">
                            Support
                          </h3>
                          <ul className="space-y-3">
                            <li className="flex items-center text-gray-300">
                              <Shield className="text-gold mr-3" size={18} />
                              24/7 Technical support
                            </li>
                            <li className="flex items-center text-gray-300">
                              <Download className="text-gold mr-3" size={18} />
                              Free updates
                            </li>
                            <li className="flex items-center text-gray-300">
                              <Code className="text-gold mr-3" size={18} />
                              Documentation included
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'features' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-dark-gray rounded-lg p-6">
                        <h3 className="font-play text-xl font-bold text-white mb-4">
                          Core Features
                        </h3>
                        <ul className="space-y-3">
                          {keyFeatured && (
                            <li className="flex items-center text-gray-300">
                              <Check className="text-gold mr-3" size={18} />
                              Featured Script
                            </li>
                          )}
                          {script.core_features && script.core_features.split(',').map((feature, idx) => (
                            <li key={idx} className="flex items-center text-gray-300">
                              <Check className="text-gold mr-3" size={18} />
                              {feature.trim()}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-dark-gray rounded-lg p-6">
                        <h3 className="font-play text-xl font-bold text-white mb-4">
                          Additional Features
                        </h3>
                        <ul className="space-y-3">
                          <li className="flex items-center text-gray-300">
                            <Check className="text-gold mr-3" size={18} />
                            Custom animations
                          </li>
                          <li className="flex items-center text-gray-300">
                            <Check className="text-gold mr-3" size={18} />
                            Database integration
                          </li>
                          <li className="flex items-center text-gray-300">
                            <Check className="text-gold mr-3" size={18} />
                            Admin panel
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {activeTab === 'requirements' && (
                    <div className="space-y-6">
                      <div className="bg-dark-gray rounded-lg p-6">
                        <h3 className="font-play text-xl font-bold text-white mb-4">
                          System Requirements
                        </h3>
                        <ul className="space-y-3">
                          {systemRequirements && systemRequirements.split(',').map((requirement, idx) => (
                            <li key={idx} className="flex items-center text-gray-300">
                              <Check className="text-gold mr-3" size={18} />
                              {requirement.trim()}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {activeTab === 'reviews' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  size={20} 
                                  className={`${
                                    typeof script?.rating === 'number' && i < Math.floor(script.rating)
                                      ? 'text-gold fill-gold' 
                                      : typeof script?.rating === 'number' && i < script.rating 
                                        ? 'text-gold fill-gold opacity-50' 
                                        : 'text-gray-400'
                                  }`} 
                                />
                              ))}
                            </div>
                            <span className="text-xl font-bold text-white">
                              {script?.rating ?? 0}
                            </span>
                            <span className="text-gray-400">
                              ({reviews.length} reviews)
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => setShowReviewForm(true)}
                          className="bg-gold hover:bg-gold/90 text-black font-bold px-6 py-2 rounded transition-colors duration-200"
                        >
                          Write a Review
                        </button>
                      </div>

                      {/* Review Form */}
                      {showReviewForm && (
                        <div className="bg-dark-gray rounded-lg p-6">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="font-play text-xl font-bold text-white">Submit Your Review</h3>
                            <button
                              onClick={() => setShowReviewForm(false)}
                              className="text-gray-400 hover:text-white transition-colors duration-200"
                            >
                              Close
                            </button>
                          </div>
                          {formError && <p className="text-red-500 mb-4">{formError}</p>}
                          {formSuccess && <p className="text-green-500 mb-4">{formSuccess}</p>}
                          <div className="space-y-4">
                            <input
                              type="text"
                              name="name"
                              value={reviewForm.name}
                              onChange={handleFormChange}
                              placeholder="Your Name"
                              className="w-full bg-gray-800 text-white p-3 rounded"
                            />
                            <StarRating
                              rating={reviewForm.rating}
                              setRating={(rating) => setReviewForm((prev) => ({ ...prev, rating }))}
                            />
                            <textarea
                              name="description"
                              value={reviewForm.description}
                              onChange={handleFormChange}
                              placeholder="Your Review"
                              className="w-full bg-gray-800 text-white p-3 rounded"
                            ></textarea>
                            <button
                              onClick={handleSubmitReview}
                              className="bg-gold hover:bg-gold/90 text-black font-bold px-6 py-2 rounded transition-colors duration-200"
                            >
                              Submit Review
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Existing Reviews */}
                      <div className="space-y-4">
                        {reviews.map((review, idx) => (
                          <div key={idx} className="bg-dark-gray rounded-lg p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center">
                                <img
                                  src={`https://randomuser.me/api/portraits/${idx % 2 ? 'men' : 'women'}/${idx + 1}.jpg`}
                                  alt="Reviewer"
                                  className="w-10 h-10 rounded-full mr-4"
                                />
                                <div>
                                  <h4 className="font-medium text-white">{review.username}</h4>
                                  <div className="flex mt-1">
                                    {[...Array(5)].map((_, j) => (
                                      <Star 
                                        key={j}
                                        size={14}
                                        className={j < review.rating ? 'text-gold fill-gold' : 'text-gray-400'}
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <span className="text-gray-400 text-sm">{review.date}</span>
                            </div>
                            <p className="text-gray-300">
                              {review.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Purchase Card */}
            <div className="lg:col-span-1">
              <div className="bg-dark-gray rounded-lg p-6 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          className={`${
                            typeof script.rating === 'number' && i < Math.floor(script.rating)
                              ? 'text-gold fill-gold' 
                              : typeof script.rating === 'number' && i < script.rating 
                                ? 'text-gold fill-gold opacity-50' 
                                : 'text-gray-400'
                          }`} 
                        />
                      ))}
                    </div>
                    <span className="text-gray-400">({script.reviews?.length || 0})</span>
                  </div>
                  <button
                    onClick={handleWishlistToggle}
                    className="p-2 text-white hover:text-gold transition-colors duration-200"
                  >
                    <Heart 
                      size={20} 
                      className={isInWishlist(script.id) ? 'fill-gold text-gold' : ''} 
                    />
                  </button>
                </div>

                <div className="mb-6">
                  {script.discountPrice ? (
                    <div className="flex items-center gap-2">
                      <span className="font-play text-3xl font-bold text-gold">
                        ${script.discountPrice}
                      </span>
                      <span className="text-gray-400 line-through">
                        ${script.price}
                      </span>
                    </div>
                  ) : (
                    <span className="font-play text-3xl font-bold text-gold">
                      ${script.price}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => !isInCart(script.id) && addToCart(script)}
                  disabled={isInCart(script.id)}
                  className={`w-full py-3 rounded mb-4 transition-colors duration-200 flex items-center justify-center gap-2 font-bold ${isInCart(script.id) ? 'bg-gray-500 text-gray-300 cursor-not-allowed' : 'bg-gold hover:bg-gold/90 text-black'}`}
                >
                  <ShoppingCart size={20} />
                  {isInCart(script.id) ? 'Already in Cart' : 'Add to Cart'}
                </button>

                <div className="space-y-4">
                  <div className="flex items-center text-gray-300">
                    <Shield className="text-gold mr-3" size={18} />
                    Secure payment
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Download className="text-gold mr-3" size={18} />
                    Instant download
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Clock className="text-gold mr-3" size={18} />
                    24/7 Support
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related sections */}
      <RecentlyViewed />
      <Recommendations currentScript={script} />
    </>
  );
};

export default ScriptDetailPage;