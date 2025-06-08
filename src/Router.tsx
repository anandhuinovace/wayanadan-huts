// src/router.tsx
import { Routes, Route } from "react-router-dom";

import Index from "@/pages/Index";
import FoodMenu from "@/pages/MenuList";
import NotFound from "@/pages/NotFound";
import Gallery from "./pages/Gallery";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/menu" element={<FoodMenu />} />
      <Route path="/media" element={<Gallery />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};