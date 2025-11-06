interface BarChartProps {
  data: number[];
  labels: string[];
  title: string;
  color?: string;
}

export default function BarChart({ data, labels, title, color = "#00D9FF" }: BarChartProps) {
  const maxValue = Math.max(...data);

  return (
    <div className="w-full h-full flex flex-col p-4">
      <h3 className="text-sm font-semibold text-gray-300 mb-4">{title}</h3>
      <div className="flex-1 flex items-end justify-around gap-2">
        {data.map((value, index) => {
          const height = (value / maxValue) * 100;
          return (
            <div key={index} className="flex flex-col items-center flex-1 gap-2">
              <div className="relative w-full flex items-end justify-center" style={{ height: '200px' }}>
                <div
                  className="w-full rounded-t-lg transition-all duration-300 hover:opacity-80 relative group"
                  style={{
                    height: `${height}%`,
                    background: `linear-gradient(to top, ${color}, ${color}80)`,
                    boxShadow: `0 0 20px ${color}40`
                  }}
                >
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-accent-cyan opacity-0 group-hover:opacity-100 transition-opacity">
                    {value}
                  </span>
                </div>
              </div>
              <span className="text-xs text-gray-400">{labels[index]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
