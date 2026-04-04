/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User, ExternalLink, X, Send } from "lucide-react";
import { TerminalBackground } from "./components/MatrixBackground";

const portfolioItems = [
  {
    id: 1,
    title: "Figma Turbo: Domine a ferramenta.",
    category: "Cursos",
    description: "Aprenda as habilidades essenciais para dominar o Figma em profundidade. Este curso cobre desde princípios básicos até técnicas avançadas.",
    author: "Ermeson Silva",
    price: 149,
    color: "text-brand-orange",
    btnColor: "bg-gradient-to-r from-orange-400 to-orange-600",
    badge: "Novo!",
    image: "capa-figma-turbo.webp",
    authorImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAR9mpFkrT0pxoDEvLXiFVzhn3LdLjQY6hWnVqJeWC6VHMJ7yTpwFFyDTlEMHVEqNy3PcLz4SRJ2_6a6myFlCZPyMSeKDuB81HpRLebxPMEguSNlVqs9ibUxHoBtTDZtgh7aw5RFe4c4ZgBbDamTQ8h0ScaQ4gxnnWmhNlwyV5bYpsPa3YZFzn1VtGNf5Kz1IBuxl5qmIwFPst4lb5BJdqk-PiPOc0UuudskWHaheV_HvTJr4nAQ1AMvl3uOrtuT4kQoZOYPt2aT2Q"
  },
  {
    id: 2,
    title: "HTML & CSS para Designers.",
    category: "Cursos",
    description: "Torne-se um designer mais rápido e contratável aprendendo a base da web. Entenda como seu design ganha vida no código.",
    author: "Ermeson Silva",
    price: 149,
    color: "text-brand-green",
    btnColor: "bg-gradient-to-r from-brand-green to-[#99eb7d]",
    image: "curso-html.webp",
    authorImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDO5yZmr0gjmzTb5ovon3d2NAk4X6GrE-xRMHPNeKw2QsFUJn2ZgEEtrGvBEvprE6BKIfXuojldWhIszsRkPmnn81k0EE7jVa5c2kdVL3m-56DSx7Wq3DLasTBxE27QjfySehL0o2j4904V2U8yQZBhFGHPd3KUNjqs7BlhNzaFOk6nqnZVNiF8OOIjFZqAAB3uUVLTvXK2-xPFxp2IXAUcioHPETbfR5rEIJ5V5Po8TWLFxGUPy166YjlJt01cZ3QeQDkerIdd7Vw"
  },
  {
    id: 3,
    title: "O Guia do Freelancer de Sucesso.",
    category: "Livros",
    description: "Estratégias reais para se destacar como web designer freelancer e conquistar clientes de alto valor.",
    author: "Ermeson Silva",
    price: 49,
    color: "text-brand-purple",
    btnColor: "bg-gradient-to-r from-brand-purple to-[#a65df2]",
    badge: "Best Seller!",
    image: "https://designfulltime.com/images/stand-out-freelancer/thumbnail.png",
    authorImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCb0Yro_eIr-vNXfeoU6Tqm5v9aivNwaTwHpNh1EUsPvQVJ0yuTwLAGgIHtWN-7CQfaCa7eoihs5vzBS96RyhQDpEzHXupBb45v8jL-Jx1xr-W2lCkzDphjuU0ISCklzHezA0fhKzIOh78O__KR0iFmWVUSiW9EQsIjFHuhi1Tj_rf_M0XhQCAqnB8WoK_x0cMfDi-O3PZpy2SLbmuDBs1vnYwYcHKQkz6S_NNbdqmVU2zlu904PSLGXoPERBIzpjzJZq3hTsDmQoY"
  },
  {
    id: 4,
    title: "Design System do Zero ao Avançado.",
    category: "Palestras",
    description: "Uma palestra completa sobre como construir e manter sistemas de design escaláveis para grandes produtos.",
    author: "Ermeson Silva",
    price: 0,
    color: "text-brand-orange",
    btnColor: "bg-gradient-to-r from-blue-400 to-blue-600",
    image: "https://picsum.photos/seed/designsystem/800/600",
    authorImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAR9mpFkrT0pxoDEvLXiFVzhn3LdLjQY6hWnVqJeWC6VHMJ7yTpwFFyDTlEMHVEqNy3PcLz4SRJ2_6a6myFlCZPyMSeKDuB81HpRLebxPMEguSNlVqs9ibUxHoBtTDZtgh7aw5RFe4c4ZgBbDamTQ8h0ScaQ4gxnnWmhNlwyV5bYpsPa3YZFzn1VtGNf5Kz1IBuxl5qmIwFPst4lb5BJdqk-PiPOc0UuudskWHaheV_HvTJr4nAQ1AMvl3uOrtuT4kQoZOYPt2aT2Q"
  },
  {
    id: 5,
    title: "Artigos.",
    category: "Artigos",
    description: "Otimize seu fluxo de trabalho com este framework testado para acelerar a entrega de projetos de design.",
    author: "Ermeson Silva",
    price: 29,
    color: "text-brand-green",
    btnColor: "bg-gradient-to-r from-emerald-400 to-emerald-600",
    image: "https://picsum.photos/seed/framework/800/600",
    authorImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDO5yZmr0gjmzTb5ovon3d2NAk4X6GrE-xRMHPNeKw2QsFUJn2ZgEEtrGvBEvprE6BKIfXuojldWhIszsRkPmnn81k0EE7jVa5c2kdVL3m-56DSx7Wq3DLasTBxE27QjfySehL0o2j4904V2U8yQZBhFGHPd3KUNjqs7BlhNzaFOk6nqnZVNiF8OOIjFZqAAB3uUVLTvXK2-xPFxp2IXAUcioHPETbfR5rEIJ5V5Po8TWLFxGUPy166YjlJt01cZ3QeQDkerIdd7Vw"
  },
  {
    id: 6,
    title: "Framework de Processo Criativo.",
    category: "Ferramentas e Frameworks",
    description: "Otimize seu fluxo de trabalho com este framework testado para acelerar a entrega de projetos de design.",
    author: "Ermeson Silva",
    price: 29,
    color: "text-brand-green",
    btnColor: "bg-gradient-to-r from-emerald-400 to-emerald-600",
    image: "https://picsum.photos/seed/framework/800/600",
    authorImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDO5yZmr0gjmzTb5ovon3d2NAk4X6GrE-xRMHPNeKw2QsFUJn2ZgEEtrGvBEvprE6BKIfXuojldWhIszsRkPmnn81k0EE7jVa5c2kdVL3m-56DSx7Wq3DLasTBxE27QjfySehL0o2j4904V2U8yQZBhFGHPd3KUNjqs7BlhNzaFOk6nqnZVNiF8OOIjFZqAAB3uUVLTvXK2-xPFxp2IXAUcioHPETbfR5rEIJ5V5Po8TWLFxGUPy166YjlJt01cZ3QeQDkerIdd7Vw"
  }
];

export default function App() {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [showContactForm, setShowContactForm] = useState(false);

  const phrases = [
    "Inteligência\nArtificial",
    "Transformação\nDigital",
    "UX/UI\nDesign",
    "Tecnologias\nFront-end",
    "Frameworks\nde Pesquisa"
  ];

  useEffect(() => {
    const handleTyping = () => {
      const currentPhrase = phrases[phraseIndex];
      
      if (!isDeleting) {
        if (displayText.length < currentPhrase.length) {
          setDisplayText(currentPhrase.substring(0, displayText.length + 1));
          setTypingSpeed(100);
        } else {
          // Phrase complete, pause before deleting
          setTypingSpeed(2000);
          setIsDeleting(true);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentPhrase.substring(0, displayText.length - 1));
          setTypingSpeed(50);
        } else {
          // Deletion complete, move to next phrase
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
          setTypingSpeed(500); // short pause before typing next
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex, typingSpeed]);

  return (
    <div className="min-h-screen bg-transparent font-sans selection:bg-brand-orange selection:text-black relative">
      {/* Navigation */}
      <header className="max-w-7xl mx-auto px-6 pt-8 pb-16">
        <nav className="flex justify-between items-center mb-16">
          <div className="flex gap-8 items-center">
            <a href="#" className="text-[18px] font-bold tracking-tighter">Cursos</a>
            <a href="#" className="text-[18px] font-bold tracking-tighter">Livros</a>
            <a href="#" className="text-[18px] font-bold tracking-tighter">Projetos e Recursos</a>
          </div>
          <div className="relative">
            <button 
              onClick={() => setShowContactForm(!showContactForm)}
              className="cursor-pointer border border-white/20 rounded-sm px-6 py-2 text-[18px] font-bold tracking-tighter hover:bg-white hover:text-black transition-all"
            >
              Fale comigo
            </button>

            <AnimatePresence>
              {showContactForm && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  className="absolute right-0 top-full mt-4 w-[350px] md:w-[450px] bg-brand-card border border-white/10 p-8 rounded-sm shadow-2xl z-50 backdrop-blur-xl"
                >
                  {/* Tooltip Arrow */}
                  <div className="absolute -top-2 right-12 w-4 h-4 bg-brand-card border-t border-l border-white/10 rotate-45" />
                  
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-black italic tracking-tighter text-white">Fale comigo!</h3>
                    <button 
                      onClick={() => setShowContactForm(false)}
                      className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5 text-brand-gray" />
                    </button>
                  </div>

                  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div>
                      <label className="block text-[14px] font-semibold text-brand-gray mb-2">Nome Completo</label>
                      <input 
                        type="text" 
                        placeholder="Como posso te chamar?"
                        className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white placeholder:text-white/20 focus:border-brand-orange outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[14px] font-semibold text-brand-gray mb-2">E-mail</label>
                      <input 
                        type="email" 
                        placeholder="seu@email.com"
                        className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white placeholder:text-white/20 focus:border-brand-orange outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[14px] font-semibold text-brand-gray mb-2">Mensagem</label>
                      <textarea 
                        rows={4}
                        placeholder="No que posso te ajudar hoje?"
                        className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white placeholder:text-white/20 focus:border-brand-orange outline-none transition-all resize-none"
                      />
                    </div>
                    <button className="w-full bg-brand-orange text-white font-bold py-4 rounded-sm flex items-center justify-center hover:brightness-110 transition-all text-lg">
                      Enviar Mensagem
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center relative overflow-hidden py-20 -mt-8 mb-8"
        >
          <TerminalBackground />
          <div className="scanlines flicker opacity-10" />
          <div className="vignette opacity-50" />
          
          <div className="mb-8 relative">
            <img 
              src="ermeson-silva-site.webp" 
              alt="Ermeson Silva" 
              className="w-24 h-24 rounded-full border-2 border-white/30 object-cover shadow-2xl"
              referrerPolicy="no-referrer"
            />
            
            {/* Handwritten Name and Arrow */}
            <div className="absolute -right-92 -top-22 mt-6 hidden md:flex flex-col items-start pointer-events-none">
              <span className="font-hand text-3xl text-white whitespace-nowrap -rotate-6 mb-1 ml-12">
                Ermeson Silva
              </span>
              <span className="font-hand text-2xl text-white/60 whitespace-nowrap -rotate-3 ml-16 -mt-2">
                Programador, professor & pesquisador
              </span>
              <svg 
                width="100" 
                height="60" 
                viewBox="0 0 100 60" 
                fill="none" 
                className="text-brand-orange"
              >
                <path 
                  d="M85 10C75 20 40 45 15 50M15 50L30 52M15 50L20 35" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          
          <div className="relative mb-6 w-full max-w-4xl">
            {/* Ghost text to reserve space and prevent layout shifts */}
            <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-[0.9] invisible pointer-events-none select-none">
              DESIGN<br />FULL-TIME
            </h1>
            
            {/* Actual animated text */}
            <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-[0.9] absolute top-0 left-0 w-full h-full flex flex-col justify-start glitch-hover transition-all drop-shadow-[0_0_15px_rgba(255,92,40,0.3)]">
              <span>
                {displayText.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    {i === 0 && displayText.includes('\n') && <br />}
                  </span>
                ))}
                <span className="cursor" />
              </span>
            </h1>
          </div>

          <p className="text-brand-gray text-base md:text-xl">
            Helping 40K+ designers become better, faster, and higher paid everyday.
          </p>
        </motion.div>
      </header>

      {/* Promo Banner */}
      <section className="max-w-7xl mx-auto px-6 mb-8">
        <div className="border border-orange-400 bg-brand-orange/5 p-1 flex flex-col md:flex-row items-center justify-between">
          <div className="px-4 py-2 text-brand-orange font-bold text-[14px]">Save 60%</div>
          <div className="text-white font-bold text-lg tracking-tight py-2">Get all 5 courses for $399!</div>
          <button className="bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold px-8 py-4 text-[16px] hover:brightness-110 transition-all">
            Quero saber mais
          </button>
        </div>
      </section>

      {/* Filter Section */}
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row items-center gap-8 py-6 border-b border-white/10">
          <span className="text-gray-400 text-[18px] font-bold">Selecione:</span>
          <div className="flex flex-wrap gap-6">
            {["Todos", "Cursos", "Livros", "Palestras", "Artigos", "Ferramentas e Frameworks"].map((filter) => (
              <label key={filter} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input 
                    type="radio" 
                    name="course-filter" 
                    value={filter}
                    checked={activeFilter === filter}
                    onChange={() => setActiveFilter(filter)}
                    className="peer sr-only"
                  />
                  <div className="w-4 h-4 rounded-full border border-white/20 transition-all peer-checked:border-brand-orange peer-checked:bg-brand-orange/10 group-hover:border-white/40" />
                  <div className="absolute w-2 h-2 rounded-full bg-brand-orange scale-0 transition-transform peer-checked:scale-100" />
                </div>
                <span className="text-[16px] font-bold text-white transition-all peer-checked:text-white group-hover:text-white/80">
                  {filter}
                </span>
              </label>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <main className="max-w-7xl mx-auto px-6 space-y-8 pb-24">
        {[...portfolioItems].sort((a, b) => {
          if (activeFilter === "Todos") return 0;
          if (a.category === activeFilter && b.category !== activeFilter) return -1;
          if (a.category !== activeFilter && b.category === activeFilter) return 1;
          return 0;
        }).map((item) => (
          <motion.article 
            key={item.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              layout: { duration: 0.6, type: "spring", stiffness: 100, damping: 20 },
              opacity: { duration: 0.3 }
            }}
            className="bg-brand-card/80 backdrop-blur-sm border border-white/5 overflow-hidden flex flex-col lg:flex-row group hover:border-white/20 transition-all"
          >
            {/* Course Image */}
            <div className="lg:w-1/2 relative overflow-hidden bg-black flex items-center justify-center h-48 lg:h-auto">
              {item.badge && (
                <div className="absolute top-0 left-0 z-10">
                  <div className={`${item.id === 3 ? 'bg-white text-black' : 'bg-brand-orange text-black'} font-black uppercase text-[9px] px-6 py-1.5 badge-slant shadow-xl`}>
                    {item.badge}
                  </div>
                </div>
              )}
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover opacity-100 group-hover:scale-105 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Course Content */}
            <div className="lg:w-1/2 p-6 md:p-8 flex flex-col justify-center">
              <div className="flex flex-col gap-6">
                <div>
                  <span className={`${item.btnColor} bg-clip-text text-transparent font-bold text-[20px] mb-2 block`}>
                    {item.category}
                  </span>
                  <h2 className="text-xl md:text-4xl font-bold mb-3">
                    {item.title}
                  </h2>
                  <p className="text-brand-gray text-[20px] leading-relaxed mb-4 line-clamp-2 max-w-xl">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-2 mb-6">
                    <img 
                      src={item.authorImage} 
                      alt={item.author} 
                      className="w-8 h-8 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-[16px] text-brand-gray font-medium">
                      por <strong className="text-white">{item.author}</strong>
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-row gap-3">
                    <button className={`${item.btnColor} text-white font-black px-8 py-4 text-[16px] hover:brightness-110 transition-all cursor-pointer flex-1 shadow-xl`}>
                      {item.price === 0 ? 'Ver Palestra' : `Comprar — $${item.price}`}
                    </button>
                    <button className="border border-white/10 text-white font-bold px-8 py-4 text-[16px] hover:bg-white/5 transition-all cursor-pointer flex-1 shadow-xl">
                      Detalhes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-brand-gray text-[10px] font-bold uppercase tracking-[0.2em]">
            © 2026 Ermeson Silva.
          </div>
          <div className="flex gap-8">
            <a 
              href="#" 
              className="text-brand-gray hover:text-white transition-colors text-[10px] font-bold uppercase tracking-[0.2em]"
            >
              @erminsilva
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
