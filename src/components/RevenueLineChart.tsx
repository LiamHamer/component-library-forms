import React, { useRef, useEffect, useMemo } from 'react';

const RevenueLineChart = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Sample revenue data by month
  const revenueData = useMemo(() => [
    { month: 'Jan', revenue: 45000 },
    { month: 'Feb', revenue: 52000 },
    { month: 'Mar', revenue: 48000 },
    { month: 'Apr', revenue: 61000 },
    { month: 'May', revenue: 55000 },
    { month: 'Jun', revenue: 67000 },
    { month: 'Jul', revenue: 73000 },
    { month: 'Aug', revenue: 69000 },
    { month: 'Sep', revenue: 78000 },
    { month: 'Oct', revenue: 82000 },
    { month: 'Nov', revenue: 76000 },
    { month: 'Dec', revenue: 89000 }
  ], []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 400;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Chart dimensions and padding
    const padding = 60;
    const chartWidth = canvas.width - 2 * padding;
    const chartHeight = canvas.height - 2 * padding;

    // Find min and max revenue for scaling
    const maxRevenue = Math.max(...revenueData.map(d => d.revenue));
    const minRevenue = Math.min(...revenueData.map(d => d.revenue));
    const revenueRange = maxRevenue - minRevenue;

    // Helper functions
    const getX = (index: number) => padding + (index / (revenueData.length - 1)) * chartWidth;
    const getY = (revenue: number) => padding + chartHeight - ((revenue - minRevenue) / revenueRange) * chartHeight;

    // Draw background
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines
    ctx.strokeStyle = '#e9ecef';
    ctx.lineWidth = 1;

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + (i / 5) * chartHeight;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(padding + chartWidth, y);
      ctx.stroke();
    }

    // Vertical grid lines
    for (let i = 0; i < revenueData.length; i++) {
      const x = getX(i);
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, padding + chartHeight);
      ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = '#495057';
    ctx.lineWidth = 2;
    ctx.beginPath();
    // Y-axis
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, padding + chartHeight);
    // X-axis
    ctx.moveTo(padding, padding + chartHeight);
    ctx.lineTo(padding + chartWidth, padding + chartHeight);
    ctx.stroke();

    // Draw revenue line
    ctx.strokeStyle = '#007bff';
    ctx.lineWidth = 3;
    ctx.beginPath();

    revenueData.forEach((data, index) => {
      const x = getX(index);
      const y = getY(data.revenue);

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Draw data points
    ctx.fillStyle = '#007bff';
    revenueData.forEach((data, index) => {
      const x = getX(index);
      const y = getY(data.revenue);

      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fill();
    });

    // Add labels
    ctx.fillStyle = '#495057';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';

    // X-axis labels (months)
    revenueData.forEach((data, index) => {
      const x = getX(index);
      ctx.fillText(data.month, x, padding + chartHeight + 20);
    });

    // Y-axis labels (revenue)
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
      const revenue = minRevenue + (i / 5) * revenueRange;
      const y = padding + chartHeight - (i / 5) * chartHeight;
      ctx.fillText(`$${Math.round(revenue / 1000)}K`, padding - 10, y + 4);
    }

    // Add title
    ctx.fillStyle = '#212529';
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Monthly Revenue', canvas.width / 2, 30);

  }, [revenueData]);

  return (
    <div className="p-6 bg-white">
      <canvas
        ref={canvasRef}
        className="border border-gray-200 rounded-lg shadow-sm"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
};

export default RevenueLineChart;