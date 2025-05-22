import React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"


const categories = [
  { label: "Frontend Devloper", color: "bg-indigo-100 text-indigo-700" },
  { label: "Backend Devloper", color: "bg-green-100 text-green-700" },
  { label: "Data Science", color: "bg-yellow-100 text-yellow-800" },
  { label: "FullStack Devlopre", color: "bg-blue-100 text-blue-700" },
  { label: "IT & Tech", color: "bg-purple-100 text-purple-700" },
  { label: "Marketing", color: "bg-pink-100 text-pink-700" },
  { label: "Graphic Design", color: "bg-orange-100 text-orange-700" },
];

const CategoryCarousel = () => {

  return (
   <>
 <div className="w-full flex justify-center py-10">
  <Carousel className="w-full max-w-4xl">
    <CarouselContent className="flex gap-4">
      {categories.map((cat, index) => (
        <CarouselItem
          key={index}
          className="basis-2/3 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
        >
          <div className="h-20 flex items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition text-gray-700 font-medium text-sm sm:text-base text-center px-4">
            {cat.label}
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</div>

   </>
  );
};

export default CategoryCarousel;
