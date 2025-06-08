import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { X, ChevronLeft, ChevronRight, ImageIcon, VideoIcon } from 'lucide-react';
import "../components/index.css";

// Dynamically import all images from the folder
const imageModules = import.meta.glob('@/assets/stay/*.jpg', { eager: true, import: 'default' });

// Sample video data - replace with your actual video sources
const galleryVideos = [
  {
    id: 1,
    src: 'https://example.com/video1.mp4',
    
    title: 'Wayanad Retreat Tour',
    description: 'A complete tour of our beautiful eco retreat in Wayanad'
  },
  {
    id: 2,
    src: 'https://example.com/video2.mp4',
   
    title: 'Nature Walk',
    description: 'Experience the beautiful nature trails around our property'
  },
  // Add more videos as needed
];

const Gallery = () => {
  const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('photos');
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [modalAnimation, setModalAnimation] = useState<'opening' | 'closing' | null>(null);
  const [visibleItems, setVisibleItems] = useState(8);
  const [isLoading, setIsLoading] = useState(false);

  // Create array of images in correct order (stay1.jpg to stay40.jpg)
  const galleryImages = Array.from({ length: 40 }, (_, i) => {
    const index = i + 1;
    const imageName = `stay${index}.jpg`;
    const path = Object.keys(imageModules).find((key) => key.endsWith(imageName));
    return {
      id: index,
      src: path ? (imageModules[path] as string) : '',
      title: `Wayanad Retreat ${index}`,
      description: `Experience the beauty of our ${index % 2 === 0 ? 'luxury huts' : 'eco cottages'} in Wayanad's pristine nature.`,
    };
  }).filter((img) => img.src);

  const currentItems = activeTab === 'photos' ? galleryImages : galleryVideos;

  const loadMoreItems = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleItems((prev) => Math.min(prev + 8, currentItems.length));
      setIsLoading(false);
    }, 800);
  };

  const openModal = (idx: number) => {
    setExpandedItem(idx);
    setModalAnimation('opening');
  };

  const closeModal = () => {
    setModalAnimation('closing');
    setTimeout(() => {
      setExpandedItem(null);
      setModalAnimation(null);
    }, 300);
  };

  const navigateItem = (direction: 'prev' | 'next') => {
    if (expandedItem === null) return;
    const newIndex = direction === 'prev' 
      ? (expandedItem - 1 + currentItems.length) % currentItems.length
      : (expandedItem + 1) % currentItems.length;
    setExpandedItem(newIndex);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (expandedItem !== null) {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') navigateItem('prev');
        if (e.key === 'ArrowRight') navigateItem('next');
      }
    };

    document.body.style.overflow = expandedItem !== null ? 'hidden' : 'auto';
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [expandedItem]);

  // Reset visible items when tab changes
  useEffect(() => {
    setVisibleItems(8);
  }, [activeTab]);

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-white to-emerald-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
            MEDIA GALLERY
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Discover <span className="text-emerald-600">Wayanadan Huts</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our collection of photos and videos showcasing the beauty and comfort of our eco-friendly retreats.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('photos')}
              className={`px-6 py-3 rounded-lg font-medium flex items-center transition-all ${
                activeTab === 'photos' 
                  ? 'bg-white text-emerald-600 shadow-md' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <ImageIcon className="w-5 h-5 mr-2" />
              Photos
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`px-6 py-3 rounded-lg font-medium flex items-center transition-all ${
                activeTab === 'videos' 
                  ? 'bg-white text-emerald-600 shadow-md' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <VideoIcon className="w-5 h-5 mr-2" />
              Videos
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentItems.slice(0, visibleItems).map((item, idx) => (
            <div
              key={item.id}
              className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              onMouseEnter={() => setHoveredItem(idx)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => openModal(idx)}
            >
              <div className="aspect-square relative">
                {activeTab === 'photos' ? (
                  <img
                    src={item.src}
                    alt={`Gallery Image ${idx}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <>
                    <img
                      src={``}
                      alt={`Video Thumbnail ${idx}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center">
                        <VideoIcon className="w-8 h-8 text-emerald-600" />
                      </div>
                    </div>
                  </>
                )}
              </div>

              {hoveredItem === idx && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-white">
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="text-sm line-clamp-2">{item.description}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {visibleItems < currentItems.length && (
          <div className="mt-12 text-center">
            <Button 
              onClick={loadMoreItems}
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-full shadow-lg transition-all hover:shadow-xl hover:scale-105"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Load More'}
              {!isLoading && (
                <svg className="w-5 h-5 ml-2 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Enhanced Modal */}
      {expandedItem !== null && (
        <div
          className={`fixed inset-0 bg-black/90 flex justify-center items-center z-50 transition-opacity duration-300 ${
            modalAnimation === 'opening'
              ? 'opacity-100'
              : modalAnimation === 'closing'
              ? 'opacity-0'
              : ''
          }`}
          onClick={closeModal}
        >
          <div
            className={`relative max-w-6xl w-full mx-4 transform transition-all duration-300 ${
              modalAnimation === 'opening'
                ? 'scale-100 opacity-100'
                : modalAnimation === 'closing'
                ? 'scale-90 opacity-0'
                : ''
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 m-2 p-2 text-white hover:text-emerald-400 transition-colors duration-200 z-10"
              aria-label="Close gallery"
            >
              <X className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); navigateItem('prev'); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white rounded-full hover:bg-emerald-600 transition-all duration-200 z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <div className="relative w-full h-[70vh] bg-black rounded-xl overflow-hidden">
              {activeTab === 'photos' ? (
                <img
                  src={currentItems[expandedItem].src}
                  alt={`Expanded Gallery Image ${expandedItem}`}
                  className="w-full h-full object-contain"
                />
              ) : (
                <video 
                  controls 
                  autoPlay
                  className="w-full h-full object-contain"
                >
                  <source src={currentItems[expandedItem].src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); navigateItem('next'); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white rounded-full hover:bg-emerald-600 transition-all duration-200 z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <div className="mt-4 text-center text-white bg-black/50 p-4 rounded-lg backdrop-blur-sm">
              <h3 className="text-2xl font-bold">{currentItems[expandedItem].title}</h3>
              <p className="mt-2 text-lg max-w-2xl mx-auto">{currentItems[expandedItem].description}</p>
              <div className="mt-3 text-emerald-400">
                {expandedItem + 1} / {currentItems.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;