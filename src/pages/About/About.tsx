/**
 * About
 * Brand heritage and mission page strictly implementing Section 3 of the mockup:
 * Our Story hero with script typography, About Belké Market story block with store photo,
 * 4 core value pillars, and "Good Food Brings People Together" banner.
 *
 * Used in: /about route
 */

import React, { useRef } from 'react';
import { PageBanner } from '../../components/layout/PageBanner';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { ArrowRight, Sparkles, HeartHandshake, Users, Award } from 'lucide-react';

export default function About() {
  useDocumentTitle('About Us - Belké Market Story & Values');
  const valuesRef = useRef<HTMLDivElement>(null);

  const scrollToValues = () => {
    valuesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const values = [
    {
      icon: <Sparkles className="w-6 h-6 text-[#D4AF37]" />,
      title: 'AUTHENTIC PRODUCTS',
      desc: 'Sourced directly from heritage Balkan and European producers who preserve traditional recipes.',
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-[#D4AF37]" />,
      title: 'FAMILY FOCUSED',
      desc: 'Rooted in generational love, welcoming every family to gather around a warm, home-cooked meal.',
    },
    {
      icon: <Users className="w-6 h-6 text-[#D4AF37]" />,
      title: 'COMMUNITY DRIVEN',
      desc: 'Proudly serving Southington and Connecticut, fostering cultural connection and neighborly hospitality.',
    },
    {
      icon: <Award className="w-6 h-6 text-[#D4AF37]" />,
      title: 'EUROPEAN TRADITION',
      desc: 'Honoring time-tested methods—from natural barrel-curing to slow fire-roasting.',
    },
  ];

  return (
    <div className="bg-[#0B0710] pb-16">
      {/* 1. Hero: Our Story */}
      <PageBanner
        title="Our Story"
        image="/assets/aistudio/418DF6A8-A9E9-410B-B7B8-20AFB3597616_6d2f0595.png"
        imageAlt="Historic European mountain town and bridge"
        align="left"
      >
        <p className="font-script text-3xl sm:text-4xl lg:text-5xl text-[#D4AF37] leading-snug">
          More than groceries... <br />
          It's our culture, <br />
          our traditions, <br />
          our memories.
        </p>
      </PageBanner>

      {/* 2. Section: About Belké Market */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Shop Photo */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-[#2E2045] aspect-4/3 sm:aspect-16/11">
                <img
                  src="/assets/aistudio/64702B2B-DAFA-4039-A870-C1923AC2C266_3aa407e6.png"
                  alt="Belké Market warm artisan grocery shop interior"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Story Description */}
            <div className="lg:col-span-6 text-left">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5ECD7] mb-6">
                About Belké Market
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-[#D0C9BA] leading-relaxed mb-8">
                <p>
                  Belké Market was created with a simple mission: to bring authentic European and Balkan foods closer to home. We believe food connects generations, preserves culture, and brings communities together.
                </p>
                <p>
                  From everyday essentials to traditional favorites, we carefully select high-quality products that remind us of home and introduce new flavors to our neighbors.
                </p>
                <p>
                  Whether you are searching for authentic sheep milk feta in wooden barrels, smoky homemade ajvar, fresh spiral burek, or rich roasted Turkish coffee, our shelves are stocked with pride and care.
                </p>
              </div>

              <button
                onClick={scrollToValues}
                className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#B8962E] text-[#0B0710] font-semibold tracking-wider uppercase transition-colors shadow-xs hover:shadow cursor-pointer h-12 px-8 rounded-full text-xs justify-center"
              >
                <span>OUR VALUES</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Four Core Values Grid */}
      <section ref={valuesRef} className="py-16 lg:py-20">
        <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => (
              <div
                key={idx}
                className="bg-[#140C1F] p-7 rounded-3xl border border-[#2A1D3F] flex flex-col items-center text-center shadow-2xs hover:shadow-sm transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-[#0B0710] border border-[#2E2045] flex items-center justify-center mb-4">
                  {val.icon}
                </div>
                <h3 className="font-serif text-sm font-bold tracking-wider uppercase text-[#F5ECD7] mb-2">
                  {val.title}
                </h3>
                <p className="text-xs text-[#B0A99C] leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Bottom Photographic Quote Banner: "Good Food Brings People Together." */}
      <section className="pt-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1536px] mx-auto">
          <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#2E2045]">
            <img
              src="/assets/aistudio/EA7AB6BA-A77D-4A0C-868C-F7B2BD7987DF_df31e837.png"
              alt="Mediterranean spread with olive branches"
              className="w-full h-64 sm:h-80 object-cover object-center filter brightness-[0.65]"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-black/25">
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5ECD7] tracking-tight drop-shadow-md">
                Good Food Brings People Together.
              </h3>
              <p className="text-xs sm:text-sm text-[#EFE7D6] mt-3 font-medium">
                Visit our store in Southington, CT or order online today.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
