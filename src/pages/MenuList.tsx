import { motion } from 'framer-motion';
import { Leaf, Coffee, Utensils, Drumstick } from 'lucide-react';

const FoodMenu = () => {
  const menuCategories = [
    {
      title: "Hot & Snacks",
      icon: <Coffee className="w-5 h-5 text-emerald-600" />,
      items: [
        { id: 1, name: "Tea", price: "₹15" },
        { id: 2, name: "Coffee", price: "₹20" },
        { id: 3, name: "Pazhannoori", price: "₹15" },
        { id: 4, name: "Uzhunnu Vada", price: "₹15" },
        { id: 5, name: "Lilli Vada", price: "₹15" },
        { id: 6, name: "Patio Vada", price: "₹15" },
        { id: 7, name: "Chicken Cutlet", price: "₹30" },
        { id: 8, name: "Beef Cutlet", price: "₹32" },
        { id: 9, name: "Samosa Veg", price: "₹15" },
        { id: 10, name: "Samosa Chicken", price: "₹20" },
        { id: 11, name: "Samosa Beef", price: "₹22" }
      ]
    },
    {
      title: "Breakfast",
      icon: <Utensils className="w-5 h-5 text-emerald-600" />,
      items: [
        { id: 1, name: "Dosa with Sambar & Chutney", price: "₹100" },
        { id: 2, name: "Idly with Sambar & Chutney", price: "₹100" },
        { id: 3, name: "Poori & Bhaji", price: "₹100" },
        { id: 4, name: "Puttu", price: "₹40" },
        { id: 5, name: "Idiyappam", price: "₹12" },
        { id: 6, name: "Appam", price: "₹12" },
        { id: 7, name: "Kappa", price: "₹40" },
        { id: 8, name: "Upma", price: "₹40" },
        { id: 9, name: "Kadala Curry", price: "₹70" },
        { id: 10, name: "Green Peas Curry", price: "₹70" },
        { id: 11, name: "Egg Curry", price: "₹70" },
        { id: 12, name: "Fish Curry", price: "Market Price" }
      ]
    },
    {
      title: "Lunch & Dinner",
      icon: <Drumstick className="w-5 h-5 text-emerald-600" />,
      items: [
        { id: 1, name: "Kerala Meals (Rice, Veg Curry, Fish Curry, 2 Thoran, Papad, Pickle)", price: "₹100" },
        { id: 2, name: "Chicken Biriyani", price: "₹180" },
        { id: 3, name: "Beef Biriyani", price: "₹200" },
        { id: 4, name: "Egg Biriyani", price: "₹120" },
        { id: 5, name: "Ghee Rice", price: "₹80" },
        { id: 6, name: "Chappathi", price: "₹12" },
        { id: 7, name: "Pathiri", price: "₹12" },
        { id: 8, name: "Kappa", price: "₹40" },
        { id: 9, name: "Chicken Curry", price: "₹120" },
        { id: 10, name: "Beef Curry", price: "₹140" },
        { id: 11, name: "Fish Curry", price: "Market Price" },
        { id: 12, name: "Egg Curry", price: "₹70" },
        { id: 13, name: "Fish Fry", price: "Market Price" },
        { id: 14, name: "Omelet (Single)", price: "₹25" },
        { id: 15, name: "Omelet (Double)", price: "₹50" }
      ]
    },
    {
      title: "Specialties",
      icon: <Leaf className="w-5 h-5 text-emerald-600" />,
      items: [
        { id: 1, name: "Kappa Biriyani", price: "₹150" },
        { id: 2, name: "Chicken Mandhi (Half)", price: "₹300" },
        { id: 3, name: "Chicken Mandhi (Full)", price: "₹600" },
        { id: 4, name: "Beef Mandhi (Half)", price: "₹350" },
        { id: 5, name: "Beef Mandhi (Full)", price: "₹700" }
      ]
    }
  ];

  return (
    <section id="food-menu" className="py-20 bg-gradient-to-b from-emerald-50 to-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
            AUTHENTIC FLAVORS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Taste of <span className="text-emerald-600">Kerala</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience traditional Wayanad cuisine prepared with locally sourced ingredients
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {menuCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-emerald-100"
            >
              <div className="bg-emerald-50 px-6 py-4 border-b border-emerald-100 flex items-center">
                <div className="bg-emerald-100 p-2 rounded-lg mr-3">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  {category.items.map((item) => (
                    <motion.li 
                      key={item.id}
                      whileHover={{ x: 5 }}
                      className="flex justify-between pb-2 border-b border-gray-100 last:border-0"
                    >
                      <span className="text-gray-700">{item.name}</span>
                      <span className="font-medium text-emerald-600 whitespace-nowrap">{item.price}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 bg-emerald-50 rounded-2xl p-6 text-center border border-emerald-100"
        >
          <p className="text-gray-700">
            <span className="font-bold text-emerald-600">Note:</span> We can prepare any dish upon special request using fresh local ingredients
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FoodMenu;