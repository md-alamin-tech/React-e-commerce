/**
 * Recipes
 * Recipe and culinary inspiration hub strictly implementing Section 4 of the mockup:
 * Hero banner, Featured Recipes grid with 6 signature Balkan dishes, and full recipe modal.
 *
 * Used in: /recipes route
 */

import React, { useState } from 'react';
import { PageBanner } from '../../components/layout/PageBanner';
import { RECIPES, Recipe } from '../../data/recipes';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/products';
import {
  Clock,
  Users,
  ChefHat,
  ArrowRight,
  ShoppingBag,
  CheckCircle2,
} from 'lucide-react';

export default function Recipes() {
  useDocumentTitle('Recipes & Inspiration - Balkan Traditions');
  const { addToCart } = useCart();
  const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null);

  const handleAddAssociatedProducts = (productIds: string[]) => {
    productIds.forEach((pid) => {
      const prod = PRODUCTS.find((p) => p.id === pid);
      if (prod) {
        addToCart(prod, 1);
      }
    });
  };

  return (
    <div className="bg-[#0B0710] pb-16">
      {/* 1. Hero Banner */}
      <PageBanner
        title="Recipes & Inspiration"
        subtitle="Explore traditional recipes, cooking tips, and food inspiration from our European and Balkan heritage."
        image="/assets/aistudio/EA7AB6BA-A77D-4A0C-868C-F7B2BD7987DF_df31e837.png"
        align="center"
      />

      {/* 2. Featured Recipes Grid */}
      <section className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="flex items-center justify-between pb-4 mb-8">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#F5ECD7]">
              Featured Recipes
            </h2>
            <p className="text-xs text-[#B0A99C] mt-0.5">
              Generational dishes crafted with pantry staples found right here at Belké Market.
            </p>
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37] hidden sm:inline">
            6 Traditional Classics
          </span>
        </div>

        {/* 6 Recipes Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {RECIPES.map((recipe) => (
            <div
              key={recipe.id}
              className="group flex flex-col bg-[#140C1F] rounded-3xl border border-[#2A1D3F] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 text-left"
            >
              {/* Image */}
              <div className="relative aspect-16/10 overflow-hidden bg-[#1B1229]">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#D4AF37]/90 text-[#0B0710] text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs">
                  {recipe.category}
                </span>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#F5ECD7] mb-2 group-hover:text-[#D4AF37] transition-colors">
                    {recipe.title}
                  </h3>
                  <p className="text-xs text-[#D0C9BA] line-clamp-2 leading-relaxed mb-4">
                    {recipe.description}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-4 text-xs text-[#B0A99C] mb-5 pt-3 border-t border-[#241838]">
                    <span className="flex items-center gap-1">
                      <Clock size={13} className="text-[#D4AF37]" />
                      {recipe.prepTime} prep
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={13} className="text-[#D4AF37]" />
                      {recipe.servings}
                    </span>
                  </div>

                  {/* Button: "VIEW RECIPE ->" matching mockup! */}
                  <button
                    onClick={() => setActiveRecipe(recipe)}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#B8962E] text-[#0B0710] font-semibold tracking-wider uppercase transition-colors cursor-pointer h-12 px-8 rounded-full text-xs"
                  >
                    <span>VIEW RECIPE</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recipe Detail Modal */}
      {activeRecipe && (
        <Modal
          isOpen={!!activeRecipe}
          onClose={() => setActiveRecipe(null)}
          title={activeRecipe.title}
          maxWidth="2xl"
        >
          <div className="space-y-6 text-left">
            <div className="rounded-2xl overflow-hidden aspect-16/9 bg-[#1B1229]">
              <img
                src={activeRecipe.image}
                alt={activeRecipe.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center gap-6 text-xs text-[#D0C9BA] pb-3 border-b border-[#2E2045]">
              <span className="flex items-center gap-1.5 font-medium">
                <Clock size={15} className="text-[#D4AF37]" />
                Prep: {activeRecipe.prepTime} • Cook: {activeRecipe.cookTime}
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Users size={15} className="text-[#D4AF37]" />
                Yields: {activeRecipe.servings}
              </span>
            </div>

            <p className="text-sm text-[#E6DFCF] leading-relaxed">
              {activeRecipe.description}
            </p>

            {/* Ingredients */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-serif text-base font-bold text-[#F5ECD7]">
                  Ingredients
                </h4>
                {activeRecipe.associatedProductIds.length > 0 && (
                  <button
                    onClick={() =>
                      handleAddAssociatedProducts(activeRecipe.associatedProductIds)
                    }
                    className="inline-flex items-center gap-1.5 text-xs text-[#D4AF37] hover:underline font-semibold cursor-pointer"
                  >
                    <ShoppingBag size={13} />
                    <span>Add Ingredients to Cart</span>
                  </button>
                )}
              </div>
              <ul className="space-y-2 text-xs text-[#D0C9BA] bg-[#140C1F] p-4 rounded-2xl border border-[#2E2045]">
                {activeRecipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Step-by-Step Instructions */}
            <div>
              <h4 className="font-serif text-base font-bold text-[#F5ECD7] mb-3">
                Instructions
              </h4>
              <ol className="space-y-3 text-xs text-[#D0C9BA]">
                {activeRecipe.instructions.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#D4AF37] text-[#0B0710] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
