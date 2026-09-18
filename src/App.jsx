import { useEffect, useRef, useState } from 'react';

export default function App() {
  const canvasRef = useRef(null);
  const [activeDoor, setActiveDoor] = useState(null); // 'story' | 'cubz' | 'cult' | null

  // The three doors. Adding another is one entry here plus a block in the modal.
  const DOORS = [
    { id: 'story', label: '1) The Story' },
    { id: 'cubz',  label: '2) Ledger Cubz' },
    { id: 'cult',  label: '3) Welcome to the Cult' },
  ];

  // Social Links
  const TWITTER_LINK = "https://x.com/ledgercubz";
  const TELEGRAM_LINK = "https://t.me/ledgercubz";

  // Canvas Smoke Particle System
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    class SmokeParticle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = -Math.random() * 0.8 - 0.3;
        this.size = Math.random() * 60 + 40;
        this.alpha = Math.random() * 0.25 + 0.05;
        this.growth = Math.random() * 0.15 + 0.05;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.size += this.growth;
        this.alpha -= 0.0006;

        if (this.alpha <= 0 || this.y < -this.size) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.size
        );
        gradient.addColorStop(0, `rgba(180, 180, 180, ${this.alpha})`);
        gradient.addColorStop(0.5, `rgba(120, 120, 120, ${this.alpha * 0.5})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const particleCount = 50;
    const particles = Array.from({ length: particleCount }, () => new SmokeParticle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-hidden selection:bg-white selection:text-black flex flex-col justify-between">
      {/* Dynamic Animated Smoke Background Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0 opacity-80"
      />

      {/* Main Hero Header */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto pt-12 pb-24">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight uppercase mb-4 drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]">
          Ledger Cubz Cult
        </h1>
        <p className="text-neutral-400 text-lg md:text-xl max-w-xl mb-8 leading-relaxed">
          Welcome to the shadows. Step inside the cult and explore the next era.
        </p>

        {/* Social Action Links */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={TWITTER_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-neutral-200 transition-all duration-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-95"
          >
            Twitter / X
          </a>
          <a
            href={TELEGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-neutral-900 border border-neutral-800 text-white font-semibold rounded-lg hover:bg-neutral-800 transition-all duration-200 active:scale-95"
          >
            Telegram
          </a>
        </div>
      </main>

      {/* Base / Footer Doors Navigation */}
      <footer className="relative z-20 pb-8 px-4 flex justify-center items-end gap-6 md:gap-12">
        {DOORS.map((door) => (
          <button
            key={door.id}
            onClick={() => setActiveDoor(door.id)}
            className="group flex flex-col items-center transition-all duration-300 transform hover:-translate-y-2 focus:outline-none"
          >
            <span className="text-[10px] md:text-xs uppercase tracking-widest text-neutral-400 group-hover:text-white mb-2 font-mono text-center">
              {door.label}
            </span>
            <img
              src="/door.png"
              alt={door.label}
              className="w-20 h-32 md:w-28 md:h-48 object-contain drop-shadow-lg opacity-80 group-hover:opacity-100 transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.35)]"
            />
          </button>
        ))}
      </footer>

      {/* Modal Popup for Door Content */}
      {activeDoor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:p-8 shadow-2xl text-left overflow-hidden">
            <button
              onClick={() => setActiveDoor(null)}
              className="absolute top-4 right-4 z-10 text-neutral-400 hover:text-white text-xl font-bold p-2 bg-neutral-800/60 rounded-full w-8 h-8 flex items-center justify-center"
            >
              ✕
            </button>

            {/* Door 1: The Story */}
            {activeDoor === 'story' && (
              <div>
                <h2 className="text-2xl font-bold uppercase tracking-wider mb-4 text-white">
                  1) The Story
                </h2>
                <div className="text-neutral-300 leading-relaxed space-y-4 text-sm md:text-base">
                  <p>
                    Emerging from the quiet depths of the XRP Ledger, the cult brings together creators and collectors into a single unified vision.
                  </p>
                  <p>
                    Bound by the shadows and guided by pure art, Ledger Cubz represents a new standard of community and identity.
                  </p>
                </div>
              </div>
            )}

            {/* Door 2: Ledger Cubz & Video */}
            {activeDoor === 'cubz' && (
              <div>
                <h2 className="text-2xl font-bold uppercase tracking-wider mb-4 text-white">
                  2) Ledger Cubz
                </h2>

                {/* Video Container */}
                <div className="w-full aspect-video bg-black rounded-lg overflow-hidden border border-neutral-800 mb-4 shadow-inner">
                  <video
                    controls
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    src="/cubz.mp4"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>

                <div className="text-neutral-300 leading-relaxed space-y-3 text-sm md:text-base">
                  <p className="font-semibold text-white">
                    Collection Size: 199 Cubz
                  </p>
                  <p>
                    A limited 199-piece digital art collection built on the XRP Ledger.
                  </p>
                </div>
              </div>
            )}

            {/* Door 3: Welcome to the Cult */}
            {activeDoor === 'cult' && (
              <div>
                <h2 className="text-2xl font-bold uppercase tracking-wider mb-4 text-white">
                  3) Welcome to the Cult
                </h2>

                <div className="w-full aspect-video bg-black rounded-lg overflow-hidden border border-neutral-800 mb-4 shadow-inner">
                  <video
                    controls
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    src="/cult.mp4"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>

                <div className="text-neutral-300 leading-relaxed space-y-3 text-sm md:text-base">
                  <p>
                    The council is seated. The cult is open.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
