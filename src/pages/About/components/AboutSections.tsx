/**
 * AboutSections
 * Sections of the About page, laid out like the FoodKing reference: quality intro,
 * green delivery band, hot item tabs, special cards, deal slider, chefs and serve steps.
 *
 * Used in: About page
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ThumbsUp,
  Star,
  ArrowLeft,
  ArrowRight,
  ChefHat,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
} from 'lucide-react';
import { SectionTitle } from '../../Home/components/SectionTitle';
import { BTN_GREEN } from '../../Home/homeData';

const IMG = '/assets/about';
const DESC = 'A team of dreamers and best building unique interactive';

/* 1. Quality intro */
export const QualityIntro: React.FC = () => (
  <section className="bg-cream py-16 lg:py-24">
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <div className="relative flex justify-center">
        <img src={`${IMG}/hero-burger.png`} alt="Signature burger" className="no-fx w-[360px] max-w-full drop-shadow-2xl" />
        <div className="absolute bottom-4 right-[12%] rotate-[-18deg] rounded-md bg-leaf text-white font-serif px-5 py-2 text-lg font-semibold shadow-xl">
          Since 1985
        </div>
      </div>

      <div>
        <SectionTitle label="About Our Food" center={false} title="Where Quality Meet Excellent Service." />
        <p className="text-ink/70 leading-relaxed mt-5">
          We hand-select high quality imported products and bake fresh each morning, so every meal on
          your table tastes like home. Traditional recipes, honest ingredients and a warm welcome for
          every family.
        </p>
        <div className="grid sm:grid-cols-2 gap-6 mt-8">
          {[
            { icon: ThumbsUp, title: 'Super Quality Food' },
            { icon: Star, title: 'Well Reputation' },
          ].map(({ icon: Icon, title }) => (
            <div key={title} className="flex items-start gap-3">
              <span className="w-11 h-11 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
                <Icon size={20} className="text-brand" />
              </span>
              <div>
                <h4 className="font-serif text-lg font-semibold text-ink">{title}</h4>
                <p className="text-sm text-ink/60 mt-1 leading-snug">{DESC}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-6 mt-9">
          <Link to="/shop" className={BTN_GREEN}>
            <span>Shop Now</span>
          </Link>
          <p className="font-serif text-xs uppercase tracking-widest text-ink/60 max-w-[200px]">
            Customer's experience is our highest priority
          </p>
        </div>
      </div>
    </div>
  </section>
);

/* 2. Green delivery band */
export const DeliveryBand: React.FC = () => (
  <section className="relative isolate overflow-hidden bg-leaf">
    <img src={`${IMG}/green-bg.jpg`} alt="" className="no-fx absolute inset-0 -z-10 w-full h-full object-cover" />
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-12 lg:py-0 grid md:grid-cols-[1.1fr_1fr_auto] items-center gap-8">
      <div className="lg:py-20">
        <p className="font-serif text-lg font-semibold text-sun tracking-wide">Crispy, Every Bite Taste</p>
        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mt-2">
          30 Minutes Fast
          <br />
          <span className="text-sun">Delivery</span> Challenge
        </h2>
      </div>
      <div className="flex justify-center">
        <img src={`${IMG}/rider.png`} alt="Delivery rider" className="no-fx w-[300px] lg:w-[340px] -mt-4 lg:-mt-10 lg:mb-0" />
      </div>
      <Link
        to="/shop"
        className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-white hover:bg-sun text-ink font-serif font-medium tracking-wide uppercase text-sm transition-colors justify-self-center"
      >
        <span>Order Now</span>
      </Link>
    </div>
  </section>
);

/* 3. Hot delicious items */
const TABS: Record<string, { img: string; name: string }[]> = {
  'Chicken Fry': [
    { img: 'pizza', name: 'Chicago Deep Pizza.' },
    { img: 'fries', name: 'Crispy Golden Fries.' },
    { img: 'wings', name: 'Spicy Hot Wings.' },
    { img: 'burger-sm', name: 'Classic Cheese Burger.' },
  ],
  Pizza: [
    { img: 'pizza', name: 'Chicago Deep Pizza.' },
    { img: 'pizza2', name: 'Pepperoni Special.' },
    { img: 'step-pizza', name: 'Wood Fired Pizza.' },
    { img: 'step-slice', name: 'Cheesy Slice.' },
  ],
  Burger: [
    { img: 'burger-sm', name: 'Classic Cheese Burger.' },
    { img: 'burger2', name: 'Double Beef Burger.' },
    { img: 'hero-burger', name: 'Signature Burger.' },
    { img: 'burger-sm', name: 'Smoky BBQ Burger.' },
  ],
  Deserts: [
    { img: 'step-slice', name: 'Sweet Cheese Slice.' },
    { img: 'steak', name: 'Chef Grill Plate.' },
    { img: 'fries', name: 'Crispy Golden Fries.' },
    { img: 'wings', name: 'Spicy Hot Wings.' },
  ],
};

export const HotItems: React.FC = () => {
  const [tab, setTab] = useState('Chicken Fry');
  return (
    <section className="bg-cream py-16 lg:py-24">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        <SectionTitle label="About Our Food" title="Hot Delicious Item" />
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {Object.keys(TABS).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`h-14 px-8 rounded-full border font-serif text-lg font-medium transition-colors cursor-pointer ${
                tab === t ? 'bg-sun border-sun text-ink' : 'border-black/10 text-ink hover:bg-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[30px] mt-12">
          {TABS[tab].map((item, i) => (
            <Link
              key={`${tab}-${i}`}
              to="/shop"
              className={`group flex flex-col items-center text-center rounded-2xl px-6 pt-12 pb-14 transition-colors duration-300 hover:bg-white ${
                i === 0 ? 'bg-white' : 'bg-transparent'
              }`}
            >
              <img
                src={`${IMG}/${item.img}.png`}
                alt={item.name}
                className="no-fx h-[190px] object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <h3 className="font-serif text-2xl font-semibold text-ink mt-8">{item.name}</h3>
              <p className="text-ink/60 mt-2 leading-relaxed">
                Its the perfect dining experience where Experience quick and efficient
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

/* 4. Special cards */
export const SpecialPair: React.FC = () => (
  <section className="bg-cream pb-16 lg:pb-20">
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-[30px]">
      <div className="relative isolate overflow-hidden rounded-2xl bg-[#1b1b1b] min-h-[320px] flex items-center">
        <div className="relative z-10 p-8 sm:p-10 max-w-[55%]">
          <p className="font-hand text-3xl text-sun -rotate-3">Today Special</p>
          <h3 className="font-serif text-5xl sm:text-6xl font-bold uppercase text-white leading-[1.05] mt-1">
            Beef Burger
          </h3>
          <Link to="/shop" className={`${BTN_GREEN} mt-6`}>
            <span>Order Now</span>
          </Link>
        </div>
        <img src={`${IMG}/burger2.png`} alt="Beef burger" className="no-fx absolute right-6 top-1/2 -translate-y-1/2 w-[210px] drop-shadow-2xl" />
        <span className="absolute right-8 bottom-5 font-serif text-white text-lg font-semibold">$59.00</span>
      </div>

      <div className="relative isolate overflow-hidden rounded-2xl bg-[#1b1b1b] min-h-[320px] flex items-center">
        <div className="relative z-10 p-8 sm:p-10 max-w-[58%]">
          <p className="font-serif text-lg font-semibold text-sun tracking-wide">Crispy, Every Bite Taste</p>
          <h3 className="font-serif text-5xl sm:text-6xl font-bold text-white leading-[1.05] mt-1">
            <span className="text-sun">Fast</span> Food
            <br />
            Meal
          </h3>
          <p className="text-sm text-white/70 mt-3">The mouth watering aroma of sizzling burgers</p>
          <Link to="/shop" className={`${BTN_GREEN} mt-6`}>
            <span>Order Now</span>
          </Link>
        </div>
        <img src={`${IMG}/bucket.png`} alt="Spicy chicken bucket" className="no-fx absolute -right-4 top-1/2 -translate-y-1/2 w-[270px] drop-shadow-2xl" />
      </div>
    </div>
  </section>
);

/* 5. Deal of the day */
const DEALS = [
  { img: 'pizza2', script: 'Super Delicious Pizza' },
  { img: 'steak', script: 'Chef Grill Plate' },
  { img: 'hero-burger', script: 'Signature Burger' },
];

export const DealSlider: React.FC = () => {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((v) => (v + d + DEALS.length) % DEALS.length);
  const deal = DEALS[i];
  return (
    <section className="grid lg:grid-cols-[1.9fr_1fr]">
      <div className="relative isolate overflow-hidden bg-gradient-to-br from-[#b01212] via-[#c81818] to-[#7d0d0d] min-h-[420px] flex items-center justify-center">
        <p className="absolute left-8 top-10 font-hand text-4xl text-sun -rotate-6 z-10">{deal.script}</p>
        <img src={`${IMG}/${deal.img}.png`} alt={deal.script} className="no-fx w-[300px] sm:w-[400px] my-14 drop-shadow-[0_30px_50px_rgba(0,0,0,0.55)]" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col z-10">
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next"
            className="w-11 h-11 bg-sun text-ink flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
          >
            <ArrowRight size={18} className="text-ink" />
          </button>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous"
            className="w-11 h-11 bg-white text-ink flex items-center justify-center hover:bg-sun transition-colors cursor-pointer"
          >
            <ArrowLeft size={18} className="text-ink" />
          </button>
        </div>
      </div>

      <div className="relative isolate overflow-hidden bg-leaf text-white px-8 sm:px-12 py-14 flex flex-col justify-center">
        <img src={`${IMG}/green-bg.jpg`} alt="" className="no-fx absolute inset-0 -z-10 w-full h-full object-cover" />
        <p className="font-serif text-sm font-semibold text-sun tracking-wide">Deal Of The Day</p>
        <h3 className="font-serif text-4xl sm:text-5xl font-bold uppercase leading-[1.1] mt-2">
          Today's The
          <br />
          Hamburger' Day
        </h3>
        <p className="font-serif text-lg mt-5">
          Special Price <span className="text-sun text-3xl font-bold ml-2">$55</span>
        </p>
        <p className="text-sm text-white/80 leading-relaxed mt-4">
          Savor the perfect symphony of flavors. It's the perfect dining experience with our signature
          hamburger, a culinary delight.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center justify-center self-start h-12 px-8 rounded-full bg-white hover:bg-sun text-ink font-serif font-medium tracking-wide uppercase text-sm transition-colors mt-7"
        >
          <span>Order Now</span>
        </Link>
      </div>
    </section>
  );
};

/* 6. Chefs */
const CHEFS = [
  { name: 'HENRY LUCAS', role: 'Sr Table Manager', tone: 'from-[#2a2a2a] to-[#111]' },
  { name: 'MATEO LEVI', role: 'Senior Cooker', tone: 'from-[#3a3a3a] to-[#1a1a1a]' },
  { name: 'Daniel Jack', role: 'Senior Cooker', tone: 'from-[#4a4a4a] to-[#222]' },
];
const SOCIALS = [Facebook, Twitter, Linkedin, Youtube];

export const Chefs: React.FC = () => (
  <section className="bg-cream py-16 lg:py-24">
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
      <SectionTitle label="About Our Food" title="Meet Our Expert Chefs" />
      <div className="grid md:grid-cols-3 gap-[50px] mt-14">
        {CHEFS.map((c) => (
          <div key={c.name} className="group text-center">
            <div className="relative px-4">
              <span className="pointer-events-none absolute -top-3 left-[34px] right-0 h-full rounded-xl border-2 border-dotted border-leaf/80 border-b-0 border-l-0 translate-x-2 transition-transform duration-300 group-hover:translate-x-3" />
              <div className={`relative rounded-xl overflow-hidden aspect-[4/5] bg-gradient-to-b ${c.tone} flex items-center justify-center`}>
                <ChefHat size={120} strokeWidth={1.2} className="text-white/80" />
              </div>
              <ul className="absolute left-0 top-[18%] w-[58px] -translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 bg-leaf py-4 flex flex-col items-center gap-4 shadow-xl">
                {SOCIALS.map((Icon, k) => (
                  <li key={k}>
                    <a href="#" aria-label="Social link" className="text-white hover:text-sun transition-colors">
                      <Icon size={18} className="text-current" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <p className="font-serif text-leaf font-medium mt-6">{c.role}</p>
            <h3 className="font-serif text-3xl font-semibold uppercase text-ink mt-1">{c.name}</h3>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <Link to="/contact" className={BTN_GREEN}>
          <span>Meet Our Team</span>
        </Link>
      </div>
    </div>
  </section>
);

/* 7. How we serve */
const STEPS = [
  { img: 'step-pizza', title: 'Cooking With Care' },
  { img: 'step-slice', title: 'Quickly Delivery' },
  { img: 'step-rider', title: 'Choose Food' },
];

export const ServeSteps: React.FC = () => (
  <section className="bg-white py-16 lg:py-24">
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
      <SectionTitle label="Food Processing" title="How We Serve You?" />
      <div className="relative grid md:grid-cols-3 gap-[30px] mt-14">
        <span className="hidden md:block absolute left-[16%] right-[16%] top-[44%] border-t border-dotted border-ink/60" />
        {STEPS.map((s, i) => (
          <div
            key={s.title}
            className="group relative rounded-2xl px-8 pt-14 pb-12 text-center transition-colors duration-300 hover:bg-sun"
          >
            <span className="absolute left-[22%] top-8 w-10 h-10 rounded-full bg-leaf text-white font-serif font-semibold flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
              0{i + 1}
            </span>
            <div className="relative h-[180px] flex items-center justify-center">
              <img src={`${IMG}/${s.img}.png`} alt={s.title} className="no-fx max-h-full object-contain" />
            </div>
            <h3 className="font-serif text-3xl font-semibold text-ink mt-8">{s.title}</h3>
            <p className="text-ink/60 mt-3 leading-relaxed">
              Its the perfect dining experience where Experience quick and efficient
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

