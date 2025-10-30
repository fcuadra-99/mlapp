import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface GridPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: any;
  numSquares?: number;
  className?: string;
  maxOpacity?: number;
  duration?: number;
  repeatDelay?: number;
  [key: string]: any;
}

export function AnimatedGridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 50,
  className,
  maxOpacity = 0.5,
  duration = 4,
  repeatDelay = 0.5,
  ...props
}: GridPatternProps) {
  const id = useId();
  const containerRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [squares, setSquares] = useState<Array<[number, number, number]>>([]);

  function getPos() {
    return [
      Math.floor((Math.random() * dimensions.width) / width),
      Math.floor((Math.random() * dimensions.height) / height),
      Math.random() * duration + repeatDelay,
    ] as [number, number, number];
  }

  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      setSquares(Array.from({ length: numSquares }, () => getPos()));
    }
  }, [dimensions, numSquares]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [containerRef]);

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-gray-400/20 stroke-gray-400/20",
        className,
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
      <svg x={x} y={y} className="overflow-visible">
        {squares.map(([posX, posY, delay], index) => (
          <rect
            key={`${index}-${posX}-${posY}`}
            width={width - 1}
            height={height - 1}
            x={posX * width + 1}
            y={posY * height + 1}
            fill="currentColor"
            strokeWidth="0"
            opacity="0"
            className="animate-grid-square"
            style={{
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          />
        ))}
      </svg>
      <style>{`
        @keyframes grid-square {
          0% { opacity: 0; }
          10% { opacity: ${maxOpacity}; }
          90% { opacity: ${maxOpacity}; }
          100% { opacity: 0; }
        }
        .animate-grid-square {
          animation: grid-square ${duration}s ease-in-out infinite;
        }
      `}</style>
    </svg>
  );
}

export default AnimatedGridPattern;
