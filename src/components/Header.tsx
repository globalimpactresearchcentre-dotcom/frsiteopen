import React, { useState, useEffect } from 'react';
import { Phone, Heart, Menu, X, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onOpenConsultation: () => void;
}

export default function Header({ onOpenConsultation }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'О центре', href: '#about' },
    { label: 'Программы', href: '#programs' },
    { label: 'Калькулятор', href: '#calculator' },
    { label: 'Пройти Тест', href: '#test' },
    { label: 'Специалисты', href: '#team' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      id="app-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-stone-900/90 backdrop-blur-md border-b border-stone-800 shadow-lg py-3'
          : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-900/20 group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className={`font-sans font-bold text-xl tracking-tight transition-colors ${isScrolled ? 'text-white' : 'text-stone-900'}`}>FAMILY</span>
                <span className="bg-emerald-500 text-stone-950 text-xs font-black px-1.5 py-0.5 rounded tracking-widest">REHAB</span>
              </div>
              <p className={`text-[9px] tracking-wider uppercase font-medium transition-colors ${isScrolled ? 'text-stone-400' : 'text-stone-600'}`}>Реабилитационный центр</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleScrollTo(e, item.href)}
                className={`text-sm font-medium transition-colors py-2 ${isScrolled ? 'text-stone-300 hover:text-emerald-400' : 'text-stone-700 hover:text-emerald-600'
                  }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Contact & CTA */}
          <div className="hidden sm:flex items-center gap-5">
            <div className="text-right">
              <a
                href="tel:88000803942"
                className={`flex items-center gap-1.5 font-mono font-bold text-lg transition-colors ${isScrolled ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'
                  }`}
              >
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isScrolled ? 'bg-emerald-400' : 'bg-emerald-600'}`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${isScrolled ? 'bg-emerald-500' : 'bg-emerald-600'}`}></span>
                </span>
                8 (800) 080-39-42
              </a>
              <p className={`text-[10px] flex items-center justify-end gap-1 font-sans transition-colors ${isScrolled ? 'text-stone-400' : 'text-stone-600'}`}>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Анонимно & Бесплатно 24/7
              </p>
            </div>
            <button
              id="header-cta"
              onClick={onOpenConsultation}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4.5 py-2.5 rounded-xl transition-all hover:scale-102 hover:shadow-lg hover:shadow-emerald-900/20"
            >
              Перезвонить мне
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-3">
            <a
              href="tel:88000803942"
              className="sm:hidden p-2 rounded-lg bg-stone-800 text-emerald-400 hover:bg-stone-700 transition-colors"
              title="Позвонить на горячую линию"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${isScrolled
                  ? 'text-stone-300 hover:text-white hover:bg-stone-800'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200'
                }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-stone-900/95 backdrop-blur-lg border-b border-stone-800 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-3">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleScrollTo(e, item.href)}
                  className="block px-3 py-2.5 rounded-lg text-base font-medium text-stone-300 hover:text-emerald-400 hover:bg-stone-800 transition-all"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 border-t border-stone-800 flex flex-col gap-3 px-3">
                <a
                  href="tel:88000803942"
                  className="flex items-center gap-2 font-mono font-bold text-lg text-emerald-400"
                >
                  <Phone className="w-5 h-5" /> 8 (800) 080-39-42
                </a>
                <p className="text-xs text-stone-400">Горячая линия анонимной помощи, круглосуточно</p>
                <button
                  id="mobile-menu-cta"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenConsultation();
                  }}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-xl transition-all"
                >
                  Получить бесплатную консультацию
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
