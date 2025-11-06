interface PieChartProps {
  data: number[];
  labels: string[];
  title: string;
  colors?: string[];
}

export default function PieChart({ data, labels, title, colors = ["#00D9FF", "#0099CC", "#006699", "#003366"] }: PieChartProps) {
  const total = data.reduce((sum, value) => sum + value, 0);
  let currentAngle = -90;

  const slices = data.map((value, index) => {
    const percentage = (value / total) * 100;
    const angle = (value / total) * 360;
    const startAngle = currentAngle;
    currentAngle += angle;
    
    const startX = 50 + 45 * Math.cos((startAngle * Math.PI) / 180);
    const startY = 50 + 45 * Math.sin((startAngle * Math.PI) / 180);
    const endX = 50 + 45 * Math.cos((currentAngle * Math.PI) / 180);
    const endY = 50 + 45 * Math.sin((currentAngle * Math.PI) / 180);
    
    const largeArcFlag = angle > 180 ? 1 : 0;
    
    const pathData = `M 50 50 L ${startX} ${startY} A 45 45 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;
    
    return {
      pathData,
      color: colors[index % colors.length],
      percentage,
      label: labels[index],
      value
    };
  });

  return (
    <div className="w-full h-full flex flex-col items-center p-4">
      <h3 className="text-sm font-semibold text-gray-300 mb-4">{title}</h3>
      <div className="flex-1 flex items-center justify-center w-full">
        <svg className="w-48 h-48" viewBox="0 0 100 100">
          {slices.map((slice, index) => (
            <g key={index} className="group cursor-pointer">
              <path
                d={slice.pathData}
                fill={slice.color}
                className="transition-all duration-300 hover:opacity-80"
                style={{ filter: `drop-shadow(0 0 5px ${slice.color}60)` }}
              >
                <title>{`${slice.label}: ${slice.value} (${slice.percentage.toFixed(1)}%)`}</title>
              </path>
            </g>
          ))}
          <circle cx="50" cy="50" r="20" fill="#162325" />
        </svg>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4 w-full">
        {slices.map((slice, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: slice.color }} />
            <span className="text-xs text-gray-400">{slice.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
