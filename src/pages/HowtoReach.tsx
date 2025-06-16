// components/ReachWayanad.tsx
import React from "react";
import WayanadImages from "../assets/overview.jpeg"; 

const ReachWayanad = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:mt-10">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Hero Section with Image */}
        <div className="relative h-74 md:h-80 lg:h-96">
          <img src={WayanadImages} alt="Wayanad Transportation" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-700 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
              How to Reach Wayanad
            </h1>
            <p className="text-gray-200 text-lg max-w-2xl">
              Discover the best ways to travel to this beautiful hill station in Kerala
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 md:p-8 lg:p-10">
          <p className="text-gray-700 text-lg mb-8 leading-relaxed">
            Wayanad is a famous destination for its historical places, amazing wildlife, natural beauty, trekking options, cascading waterfalls and adventure activities. This hill station near the Tamil Nadu and Karnataka border remains unspoiled by commercial tourism. Wayanad is well connected from other South Indian cities with Kalpetta as the district headquarters.
          </p>

          {/* Transportation Options */}
          <div className="space-y-12">
            {/* By Air */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4 flex-shrink-0">
                <div className="bg-emerald-100 p-4 rounded-lg h-full flex flex-col items-center justify-center">
                  <svg className="w-12 h-12 text-emerald-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <h3 className="text-xl font-semibold text-emerald-800 text-center">By Air</h3>
                </div>
              </div>
              <div className="md:w-3/4">
                <h2 className="text-2xl font-semibold text-emerald-700 mb-4">Nearest Airports to Wayanad</h2>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    <span className="font-medium">Kozhikode International Airport (CCJ)</span> - 90km to Kalpetta (2.5 hours). Convenient for Vythiri, Kalpetta, Meppady, and Sulthan Bathery.
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Kannur International Airport (CNN)</span> - 70km to Mananthavady (2 hours). Better option for stays near Mananthavady, Thirunelli, or Banasura Sagar Dam.
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Bangalore International Airport (BLR)</span> - 290km (6.5 hours) to Wayanad.
                  </p>
                </div>
              </div>
            </div>

            {/* By Train */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4 flex-shrink-0">
                <div className="bg-emerald-100 p-4 rounded-lg h-full flex flex-col items-center justify-center">
                  <svg className="w-12 h-12 text-emerald-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <h3 className="text-xl font-semibold text-emerald-800 text-center">By Train</h3>
                </div>
              </div>
              <div className="md:w-3/4">
                <h2 className="text-2xl font-semibold text-emerald-700 mb-4">Nearest Railway Stations</h2>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    <span className="font-medium">Kozhikode Railway Station (CLT)</span> - 80km to Kalpetta (2.5 hours)
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Mysore Railway Station (MYS)</span> - 120km to Sulthan Bathery (3 hours)
                  </p>
                  <p className="text-gray-700">
                    Trains are available from major cities like Chennai, Bangalore, and Kochi to these stations.
                  </p>
                </div>
              </div>
            </div>

            {/* By Road */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4 flex-shrink-0">
                <div className="bg-emerald-100 p-4 rounded-lg h-full flex flex-col items-center justify-center">
                  <svg className="w-12 h-12 text-emerald-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  <h3 className="text-xl font-semibold text-emerald-800 text-center">By Road</h3>
                </div>
              </div>
              <div className="md:w-3/4">
                <h2 className="text-2xl font-semibold text-emerald-700 mb-4">Road Connectivity</h2>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Wayanad is well-connected by road from major cities in Kerala, Karnataka, and Tamil Nadu. Regular buses operate from:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Kerala State Transport (KSRTC)</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-emerald-500 mr-2">•</span>
                          Kochi, Trivandrum, Kozhikode
                        </li>
                        <li className="flex items-start">
                          <span className="text-emerald-500 mr-2">•</span>
                          Alleppey, Kottayam, Munnar
                        </li>
                        <li className="flex items-start">
                          <span className="text-emerald-500 mr-2">•</span>
                          <a href="https://www.ksrtconline.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">www.ksrtconline.com</a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Karnataka State Transport (KSRTC)</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-emerald-500 mr-2">•</span>
                          Bangalore, Mysore
                        </li>
                        <li className="flex items-start">
                          <span className="text-emerald-500 mr-2">•</span>
                          <a href="https://www.ksrtc.in" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">www.ksrtc.in</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    Private operators like Kallada Travels and tickets via <a href="https://www.redbus.in" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">redBus</a> are also available.
                  </p>
                </div>
              </div>
            </div>

            {/* Cab Services */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-2xl font-semibold text-emerald-700 mb-4">Cab Services & Packages</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-3">Exclusive Cab Pickup Available From:</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {['Bangalore', 'Calicut', 'Mysore', 'Coimbatore', 'Kochi', 'Kannur'].map((city) => (
                      <div key={city} className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                        <svg className="w-5 h-5 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {city}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-3">Combine With Nearby Destinations:</h3>
                  <ul className="space-y-2">
                    {['Coorg (140km)', 'Mysore (120km)', 'Ooty (100km)', 'Bekal (2 Nights)', 'Kannur (2 Nights)'].map((dest) => (
                      <li key={dest} className="flex items-start">
                        <span className="text-emerald-500 mr-2">•</span>
                        {dest}
                      </li>
                    ))}
                  </ul>
                  {/* <p className="mt-4 text-gray-700">
                    For customized packages, email us at <a href="mailto:info@groowynd.com" className="text-blue-600 hover:underline">info@groowynd.com</a> or visit <a href="https://groowynd.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">groowynd.com</a>
                  </p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReachWayanad;