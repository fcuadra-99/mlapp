export default function BalatroBg() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#162325] via-[#1a2e35] to-[#0f1821]" />
      
      <div className="absolute inset-0">
        <div className="balatro-spiral balatro-spiral-1" />
        <div className="balatro-spiral balatro-spiral-2" />
        <div className="balatro-spiral balatro-spiral-3" />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-[#162325]/80 via-transparent to-transparent" />
      
      <style>{`
        @keyframes balatro-rotate-1 {
          0%, 100% {
            transform: rotate(0deg) scale(1);
            opacity: 0.15;
          }
          50% {
            transform: rotate(180deg) scale(1.1);
            opacity: 0.25;
          }
        }
        
        @keyframes balatro-rotate-2 {
          0%, 100% {
            transform: rotate(0deg) scale(1);
            opacity: 0.2;
          }
          50% {
            transform: rotate(-180deg) scale(1.15);
            opacity: 0.3;
          }
        }
        
        @keyframes balatro-rotate-3 {
          0%, 100% {
            transform: rotate(0deg) scale(1);
            opacity: 0.1;
          }
          50% {
            transform: rotate(120deg) scale(1.05);
            opacity: 0.2;
          }
        }
        
        .balatro-spiral {
          position: absolute;
          width: 150%;
          height: 150%;
          top: 50%;
          left: 50%;
          background: radial-gradient(
            ellipse at center,
            transparent 10%,
            #DE443B 15%,
            transparent 20%,
            #006BB4 30%,
            transparent 35%,
            #DE443B 45%,
            transparent 50%,
            #006BB4 60%,
            transparent 65%
          );
          filter: blur(40px);
          transform-origin: center center;
          border-radius: 50%;
        }
        
        .balatro-spiral-1 {
          animation: balatro-rotate-1 20s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
          margin-left: -75%;
          margin-top: -75%;
        }
        
        .balatro-spiral-2 {
          animation: balatro-rotate-2 25s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
          margin-left: -75%;
          margin-top: -75%;
          animation-delay: -5s;
        }
        
        .balatro-spiral-3 {
          animation: balatro-rotate-3 30s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
          margin-left: -75%;
          margin-top: -75%;
          animation-delay: -10s;
        }
      `}</style>
    </div>
  );
}
