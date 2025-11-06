interface LineChartProps {
  data: number[];
  labels: string[];
  title: string;
  color?: string;
}

export default function LineChart({ data, labels, title, color = "#00D9FF" }: LineChartProps) {
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value - minValue) / range) * 80 - 10;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="w-full h-full flex flex-col p-4">
      <h3 className="text-sm font-semibold text-gray-300 mb-4">{title}</h3>
      <div className="flex-1 relative">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`gradient-${title}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          
          <polyline
            points={`0,100 ${points} 100,100`}
            fill={`url(#gradient-${title})`}
          />
          
          <polyline
            points={points}
            fill="none"
            stroke={color}
            strokeWidth="0.5"
            style={{ filter: `drop-shadow(0 0 2px ${color})` }}
          />
          
          {data.map((value, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = 100 - ((value - minValue) / range) * 80 - 10;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="1"
                fill={color}
                className="hover:r-2 transition-all cursor-pointer"
                style={{ filter: `drop-shadow(0 0 3px ${color})` }}
              >
                <title>{`${labels[index]}: ${value}`}</title>
              </circle>
            );
          })}
        </svg>
      </div>
      <div className="flex justify-between mt-2 text-xs text-gray-400">
        <span>{labels[0]}</span>
        <span>{labels[labels.length - 1]}</span>
      </div>
    </div>
  );
}
