import React from 'react';
import wayanadView from "../assets/wayanad-huts.jpg"
import Wayanadoverview from "../assets/waterfall.jpg"
import { Link } from 'react-router-dom';

const AboutWayanad = () => {
    const destinations = [
        {
            name: "Edakkal Caves",
            description: "Prehistoric caves with ancient carvings dating back to 6000 BC.",
            image: "/images/edakkal.jpg"
        },
        {
            name: "Chembra Peak",
            description: "The highest peak in Wayanad with a heart-shaped lake en route.",
            image: "/images/chembra.jpg"
        },
        {
            name: "Banasura Sagar Dam",
            description: "Largest earthen dam in India surrounded by picturesque landscapes.",
            image: "/images/banasura.jpg"
        },
        {
            name: "Pookode Lake",
            description: "Serene freshwater lake surrounded by forests and hills.",
            image: "/images/pookode.jpg"
        },
        {
            name: "Soochipara Falls",
            description: "Three-tiered waterfalls perfect for swimming and picnics.",
            image: "/images/soochipara.jpg"
        },
        {
            name: "Kuruva Island",
            description: "Eco-tourism spot with dense forests and bamboo groves.",
            image: "/images/kuruva.jpg"
        }
    ];

    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
          <div 
                className="relative h-[60vh] bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: `url(${wayanadView})` }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Discover Wayanad</h1>
                    <p className="text-xl md:text-2xl text-white">Kerala's Green Paradise</p>
                </div>
            </div>

            {/* About Section */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="md:w-1/2">
                            <h2 className="text-3xl font-bold text-green-800 mb-6 relative pb-2">
                                About Wayanad
                                <span className="absolute bottom-0 left-0 w-12 h-1 bg-amber-600"></span>
                            </h2>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                Nestled in the Western Ghats, Wayanad is one of the most beautiful districts in Kerala, known for its mist-clad mountains, lush green forests, and rich biodiversity. The name 'Wayanad' comes from 'Vayal Nadu' which means 'Land of Paddy Fields' in Malayalam.
                            </p>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                With altitudes ranging from 700 to 2100 meters above sea level, Wayanad enjoys a pleasant climate throughout the year. It's home to several indigenous tribes and offers a perfect blend of nature, adventure, and cultural experiences.
                            </p>
                            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                                <h4 className="text-xl font-semibold text-amber-700 mb-3">Wayanad Highlights:</h4>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-start">
                                        <span className="text-green-600 mr-2">✓</span>
                                        Part of the Nilgiri Biosphere Reserve
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-600 mr-2">✓</span>
                                        Home to several wildlife sanctuaries
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-600 mr-2">✓</span>
                                        Rich in tribal heritage and culture
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-600 mr-2">✓</span>
                                        Famous for coffee, tea and spice plantations
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-600 mr-2">✓</span>
                                        Adventure activities like trekking and bamboo rafting
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="md:w-1/2 mt-8 md:mt-0">
                            <div className="relative rounded-lg overflow-hidden ">
                                <img 
                                    src={Wayanadoverview} 
                                    alt="Wayanad Landscape" 
                                    className="w-full h-[600px] object-contain rounded-lg shadow-lg"
                                />
                                {/* <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-3 text-sm">
                                    The lush green landscapes of Wayanad
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Destinations Section */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-green-800 mb-12 relative pb-2 inline-block">
                        Popular Destinations in Wayanad
                        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-amber-600"></span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {destinations.map((destination, index) => (
                            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                                <div className="h-48 overflow-hidden">
                                    <img 
                                        src={destination.image} 
                                        alt={destination.name}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-green-800 mb-2">{destination.name}</h3>
                                    <p className="text-gray-600">{destination.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-emerald-900 to-emerald-950 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Explore Wayanad?</h3>
                    <p className="text-xl mb-8">Book your stay at Wayanadan Huts for an authentic experience</p>
                    <Link to="/">
                        <button className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
                            Book Now
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default AboutWayanad;