import React from 'react';
import wayanadView from "../assets/wayanad-huts.jpg"
import Wayanadoverview from "../assets/waterfall.jpg"
import { Link } from 'react-router-dom';

import edakkalCaves from "../assets/edakkal.jpeg";
import chembraPeak from "../assets/Chembra.jpg";
import banasuraSagarDam from "../assets/banasura.jpg";
import pookodeLake from "../assets/pokode.jpg";
import soochiparaFalls from "../assets/soochippara.jpg";
import kuruvaIsland from "../assets/kuruva_island.jpg";
import muthangaWildlife from "../assets/muthanga.jpg";
const AboutWayanad = () => {
    const destinations = [
        {
            name: "Edakkal Caves",
            description: "Edakkal Caves is one of Wayanad's most fascinating historical treasures, featuring ancient rock engravings that date back over 8,000 years to the Neolithic Age. These mysterious caves, formed by a unique split in a massive rock, contain intricate carvings depicting human figures, animals, and symbols that offer a rare glimpse into prehistoric civilization. Often referred to as one of the earliest known centers of human settlement in India, the caves require a scenic trek up Ambukuthi Hill, rewarding visitors with not only archaeological wonders but also breathtaking panoramic views of Wayanad's lush landscapes. A visit to Edakkal is like stepping into a time capsule, where history and nature intertwine in an unforgettable experience.",
            image: edakkalCaves
        },
        {
            name: "Muthanga Wildlife Sanctuary",
            description: "Muthanga Wildlife Sanctuary, part of the Nilgiri Biosphere Reserve, is a pristine wilderness teeming with exotic flora and fauna. Spread across lush forests and grassy meadows, this sanctuary is renowned for its elephant herds, tigers, leopards, and rare species like the sloth bear and Indian bison. Visitors can embark on thrilling jeep safaris or guided nature walks to spot wildlife in their natural habitat while enjoying the sanctuary's tranquil streams and dense bamboo groves. As a vital corridor between Bandipur and Nagarhole national parks, Muthanga offers an unfiltered encounter with Kerala’s rich biodiversity, making it a must-visit for nature lovers and adventure seekers alike.",
            image: muthangaWildlife
        },
        {
            name: "Kuruva Island",
            description: "Kuruva Island is a pristine eco-tourism paradise nestled in the middle of the Kabini River, renowned for its untouched natural beauty and rich biodiversity. This 950-acre protected river delta is accessible only by bamboo rafts or coracle boats, adding an element of adventure to its serene surroundings. Dense tropical forests, bamboo groves, and rare medicinal plants thrive here, while over 100 species of birds and butterflies fill the air. Visitors can wander through shaded jungle trails, picnic by the riverbanks, or simply soak in the tranquil ambiance of this uninhabited island—a true haven for nature lovers seeking peace away from civilization.",
            image: kuruvaIsland
        },
        {
            name: "Chembra Peak",
            description: "Chembra Peak, the tallest mountain in Wayanad at 2,100 meters, offers one of Kerala's most thrilling trekking experiences. The highlight of the climb is the famous heart-shaped lake, a natural freshwater pond believed to never dry up, which has become an iconic romantic spot. As you ascend through misty grasslands and spice plantations, you'll be rewarded with breathtaking panoramic views of the Western Ghats. The 3-4 hour trek is moderately challenging but suitable for beginners with guides, making it perfect for adventure seekers and nature lovers alike. At sunrise, the peak transforms into a magical sea of clouds, creating unforgettable memories.",
            image: chembraPeak
        },
        {
            name: "Banasura Sagar Dam",
            description: "Banasura Sagar Dam, nestled amidst the misty hills of Wayanad, is India's largest earthen dam and an engineering marvel set against breathtaking natural beauty. Built across the Karamanathodu River, this picturesque dam creates a vast freshwater reservoir dotted with small islands that emerge during the monsoon, earning it the nickname 'Miniature Islands of Wayanad.' Visitors can enjoy speedboat rides across the emerald waters, hike up to the Banasura Hill viewpoint for panoramic vistas, or simply relax while soaking in the serene atmosphere. The dam's unique stepped architecture blends seamlessly with the surrounding lush landscapes, making it a photographer's paradise and nature lover's retreat.",
            image: banasuraSagarDam
        },
        {
            name: "Pookode Lake",
            description: "Pookode Lake, a serene freshwater gem cradled in lush evergreen forests, is Wayanad's most picturesque natural attraction. This kidney-shaped lake, spread across 13 acres at 2,100 feet altitude, enchants visitors with its crystal-clear waters reflecting the surrounding misty hills and dense woodlands. Visitors can enjoy peaceful pedal boating across the tranquil waters while spotting vibrant freshwater fish and occasional exotic birds. The lake's periphery features a charming aquarium, children's park, and nature trails winding through spice plantations, making it perfect for family outings. According to local legend, the lake was formed from the tears of a mythical young man, adding a touch of folklore to its natural splendor.",
            image: pookodeLake
        },
        {
            name: "Soochipara Falls",
            description: "Soochipara Falls is a breathtaking three-tiered cascade plunging 200 meters amidst dense tropical forests, creating natural pools perfect for a refreshing dip. The name 'Soochipara' (meaning 'Needle Rock') comes from the needle-shaped rock formation near this waterfall, visible when water levels are low. To reach this natural wonder, visitors trek through 2km of spice-scented coffee plantations and ancient trees alive with birdsong. The main pool's crystal-clear waters are safe for swimming under lifeguard supervision (seasonal), while adventure seekers can try rappelling down the rocky cliffs. During monsoon, the falls transform into a thunderous spectacle, while winter reveals intricate rock patterns behind the curtain of water.",
            image: soochiparaFalls
        },


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
                                <div className="h-64 overflow-hidden">
                                    <img
                                        src={destination.image}
                                        alt={destination.name}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-green-800 mb-2">{destination.name}</h3>
                                    <p className="text-gray-600 text-justify">{destination.description}</p>
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