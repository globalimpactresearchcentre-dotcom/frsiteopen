import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, X, ZoomIn, Award } from 'lucide-react';

import licenseImg from '../assets/certificates/certificate-license.png';
import appendixImg from '../assets/certificates/certificate-appendix.png';

interface Certificate {
    id: string;
    title: string;
    subtitle: string;
    image: string;
}

const certificates: Certificate[] = [
    {
        id: '1',
        title: 'Медицинская лицензия',
        subtitle: '№ 25035506 от 23.10.2025',
        image: licenseImg,
    },
    {
        id: '2',
        title: 'Приложение к лицензии',
        subtitle: 'Психиатрия, психотерапия',
        image: appendixImg,
    },
];

export default function Certificates() {
    const [selected, setSelected] = useState<Certificate | null>(null);

    return (
        <section id="certificates" className="scroll-mt-24 py-14 bg-bg-secondary border-t border-border-custom">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent-light text-accent text-xs font-semibold uppercase tracking-wider border border-border-custom mb-3">
                        <Award className="w-4 h-4" /> Документы и лицензии
                    </span>
                    <h2 className="text-3xl md:text-4xl font-serif font-semibold tracking-tight text-text-primary mb-4">
                        Работаем официально
                    </h2>
                    <p className="text-text-primary/75 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
                        Лицензия Министерства здравоохранения Республики Казахстан на медицинскую деятельность
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
                    {certificates.map((cert) => (
                        <button
                            key={cert.id}
                            onClick={() => setSelected(cert)}
                            className="group text-left bg-bg-primary border border-border-custom overflow-hidden hover:border-accent transition-all"
                        >
                            <div className="relative aspect-[3/4] bg-white overflow-hidden">
                                <img
                                    src={cert.image}
                                    alt={cert.title}
                                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                                    <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </div>
                            <div className="p-5 flex items-start gap-2.5 border-t border-border-custom">
                                <ShieldCheck className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                                <div>
                                    <div className="text-text-primary text-sm font-semibold font-serif">{cert.title}</div>
                                    <div className="text-text-secondary text-xs mt-0.5 font-sans">{cert.subtitle}</div>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selected && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={() => setSelected(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-lg w-full max-h-[85vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelected(null)}
                                className="fixed top-4 right-4 text-white/70 hover:text-white transition-colors bg-black/50 rounded-full p-2"
                            >
                                <X className="w-6 h-6" />
                            </button>
                            <img
                                src={selected.image}
                                alt={selected.title}
                                className="w-full h-auto border border-border-custom"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}