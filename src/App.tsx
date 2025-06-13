// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./Router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";

const queryClient = new QueryClient();

// Add max length constants
const MAX_LENGTHS = {
  name: 24,
  place: 50,
  state: 50,
  description: 500
};

const StarRating = ({
  rating,
  setRating
}: {
  rating: number;
  setRating: (rating: number) => void
}) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => {
        const currentRating = hoverRating || rating;
        const isHalfStar = currentRating + 0.5 === star;
        const isFilled = currentRating >= star || (isHalfStar && currentRating % 1 !== 0);

        return (
          <div
            key={star}
            className="relative"
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(null)}
            onClick={() => setRating(star)}
          >
            {/* Background star (always shows) */}
            <Star
              size={24}
              className="text-gray-300 transition-colors duration-200"
            />

            {/* Foreground star (shows filled portion) */}
            <div
              className="absolute top-0 left-0 overflow-hidden"
              style={{
                width: isHalfStar ? '50%' : isFilled ? '100%' : '0%',
              }}
            >
              <Star
                size={24}
                className="fill-yellow-400 text-yellow-400 transition-colors duration-200"
              />
            </div>

            {/* Invisible clickable areas for half stars */}
            <div
              className="absolute top-0 left-0 w-1/2 h-full cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setRating(star - 0.5);
              }}
            />
            <div
              className="absolute top-0 left-1/2 w-1/2 h-full cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setRating(star);
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    place: "",
    state: "",
    rating: 0,
    description: "",
    status: "New"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Limit input to max length
    if (name in MAX_LENGTHS && value.length > MAX_LENGTHS[name as keyof typeof MAX_LENGTHS]) {
      return;
    }
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "ratings"), {
        ...formData,
        createdAt: new Date()
      });

      console.log("Rating submitted:", formData);

      setIsOpen(false);
      // Reset form
      setFormData({
        name: "",
        place: "",
        state: "",
        rating: 0,
        description: "",
        status: "New"
      });
    } catch (error) {
      console.error("Error saving rating:", error);
      // Optionally show a toast or Sonner alert here
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>

        {/* Floating button */}
        <div className="fixed bottom-6 right-6 z-50">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-16 h-16 shadow-xl"
              >
                <Button
                  variant="default"
                  size="lg"
                  className="rounded-full w-16 h-16 p-0  bg-gradient-to-br from-emerald-600 to-emerald-800 hover:from-emerald-700 hover:to-emerald-900 transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={"#fff"}
                    width={'32'}
                    height={'32'}
                    viewBox="0 0 64 64"
                    version="1.1"
                    xmlSpace="preserve"
                    style={{ fillRule: "evenodd", clipRule: "evenodd", strokeLinejoin: "round", strokeMiterlimit: 2 }}
                  >
                    <path d="M43.046,9.05c5.137,0.117 9.856,3.451 11.782,8.485c2.392,6.249 0.678,13.452 -2.495,19.624
             c-3.792,7.375 -10.79,12.703 -17.966,17.288c0,0 -2.796,1.351 -5.516,-0.403c-9.246,-6.021
             -17.877,-13.963 -20.318,-24.82c-1.857,-8.258 1.161,-18.596 10.582,-20.034c4.72,-0.721 
             11.109,2.766 12.808,5.869c1.657,-3.095 6.565,-5.884 10.694,-6.008c0.215,-0.002 0.214,-0.003 0.429,-0.001Z"
                      style={{ fillRule: "nonzero" }}
                    />
                  </svg>
                </Button>
              </motion.div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[650px] rounded-lg">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-emerald-800">
                  Add New Entry
                </DialogTitle>
                <p className="text-sm text-gray-500 mt-1">
                  Share your experience with the community
                </p>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6 mt-2">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <span className="text-xs text-gray-500">
                        {formData.name.length}/{MAX_LENGTHS.name}
                      </span>
                    </div>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      maxLength={MAX_LENGTHS.name}
                      className="focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label htmlFor="place" className="block text-sm font-medium text-gray-700">
                        Place
                      </label>
                      <span className="text-xs text-gray-500">
                        {formData.place.length}/{MAX_LENGTHS.place}
                      </span>
                    </div>
                    <Input
                      id="place"
                      name="place"
                      value={formData.place}
                      onChange={handleChange}
                      maxLength={MAX_LENGTHS.place}
                      className="focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                        State
                      </label>
                      <span className="text-xs text-gray-500">
                        {formData.state.length}/{MAX_LENGTHS.state}
                      </span>
                    </div>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      maxLength={MAX_LENGTHS.state}
                      className="focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Rating
                    </label>
                    <div className="p-2 border rounded-lg bg-gray-50">
                      <StarRating
                        rating={formData.rating}
                        setRating={handleRatingChange}
                      />
                      <div className={`text-sm mt-1 font-medium ${formData.rating >= 4 ? 'text-emerald-600' :
                          formData.rating >= 2 ? 'text-amber-500' : 'text-rose-500'
                        }`}>
                        Current rating: {formData.rating.toFixed(1)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <span className="text-xs text-gray-500">
                      {formData.description.length}/{MAX_LENGTHS.description}
                    </span>
                  </div>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    maxLength={MAX_LENGTHS.description}
                    rows={5}
                    className="focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                    className="border-gray-300 hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 transition-colors duration-300"
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;