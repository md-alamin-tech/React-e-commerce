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
    <div className="bg-cream pb-16">
      {/* 1. Hero Banner */}
      <PageBanner
        title="Recipes & Inspiration"
        subtitle="Explore traditional recipes, cooking tips, and food inspiration from our European and Balkan heritage."
        image="/assets/aistudio/EA7AB6BA-A77D-4A0C-868C-F7B2BD7987DF_df31e837.png"
        align="center"
      />

      {/* 2. Featured Recipes Grid */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="flex items-center justify-between pb-4 mb-8">
          <div>
            <h2 className="font-serif text-2xl font-bold text-ink">
              Featured Recipes
            </h2>
            <p className="text-xs text-ink/60 mt-0.5">
              Generational dishes crafted with pantry staples found right here at EMBER.
            </p>
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-brand hidden sm:inline">
            6 Traditional Classics
          </span>
        </div>

        {/* 6 Recipes Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {RECIPES.map((recipe) => (
            <div
              key={recipe.id}
              className="group flex flex-col bg-white rounded-2xl border border-black/10 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 text-left"
            >
              {/* Image */}
              <div className="relative aspect-16/10 overflow-hidden bg-[#EFEBE2]">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-brand/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs">
                  {recipe.category}
                </span>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-ink mb-2 group-hover:text-brand transition-colors">
                    {recipe.title}
                  </h3>
                  <p className="text-xs text-ink/75 line-clamp-2 leading-relaxed mb-4">
                    {recipe.description}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-4 text-xs text-ink/60 mb-5 pt-3 border-t border-black/10">
                    <span className="flex items-center gap-1">
                      <Clock size={13} className="text-brand" />
                      {recipe.prepTime} prep
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={13} className="text-brand" />
                      {recipe.servings}
                    </span>
                  </div>

                  {/* Button: "VIEW RECIPE ->" matching mockup! */}
                  <button
                    onClick={() => setActiveRecipe(recipe)}
                    className="w-full inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white font-medium tracking-wide uppercase transition-colors cursor-pointer h-12 px-8 rounded-full font-serif text-sm"
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
            <div className="rounded-2xl overflow-hidden aspect-16/9 bg-[#EFEBE2]">
              <img
                src={activeRecipe.image}
                alt={activeRecipe.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center gap-6 text-xs text-ink/75 pb-3 border-b border-black/10">
              <span className="flex items-center gap-1.5 font-medium">
                <Clock size={15} className="text-brand" />
                Prep: {activeRecipe.prepTime} • Cook: {activeRecipe.cookTime}
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Users size={15} className="text-brand" />
                Yields: {activeRecipe.servings}
              </span>
            </div>

            <p className="text-sm text-ink leading-relaxed">
              {activeRecipe.description}
            </p>

            {/* Ingredients */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-serif text-base font-bold text-ink">
                  Ingredients
                </h4>
                {activeRecipe.associatedProductIds.length > 0 && (
                  <button
                    onClick={() =>
                      handleAddAssociatedProducts(activeRecipe.associatedProductIds)
                    }
                    className="inline-flex items-center gap-1.5 text-xs text-brand hover:underline font-semibold cursor-pointer"
                  >
                    <ShoppingBag size={13} />
                    <span>Add Ingredients to Cart</span>
                  </button>
                )}
              </div>
              <ul className="space-y-2 text-xs text-ink/75 bg-white p-4 rounded-2xl border border-black/10">
                {activeRecipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Step-by-Step Instructions */}
            <div>
              <h4 className="font-serif text-base font-bold text-ink mb-3">
                Instructions
              </h4>
              <ol className="space-y-3 text-xs text-ink/75">
                {activeRecipe.instructions.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-brand text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
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
