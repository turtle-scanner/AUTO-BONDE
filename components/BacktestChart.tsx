"use client";

import React, { useEffect, useRef } from "react";
import { createChart, ColorType, LineStyle } from "lightweight-charts";

interface BacktestChartProps {
  data: any[];
  title: string;
  color?: string;
  isDrawdown?: boolean;
}

const BacktestChart: React.FC<BacktestChartProps> = ({ data, title, color = "#00f2ff", isDrawdown = false }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "rgba(255, 255, 255, 0.6)",
      },
      grid: {
        vertLines: { color: "rgba(255, 255, 255, 0.03)" },
        horzLines: { color: "rgba(255, 255, 255, 0.03)" },
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
      timeScale: {
        borderColor: "rgba(255, 255, 255, 0.1)",
      },
    });

    const series = isDrawdown 
      ? chart.addAreaSeries({
          lineColor: "#ff0055",
          topColor: "rgba(255, 0, 85, 0.3)",
          bottomColor: "rgba(255, 0, 85, 0)",
          lineWidth: 2,
        })
      : chart.addLineSeries({
          color: color,
          lineWidth: 3,
        });

    series.setData(data);

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current?.clientWidth });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [data, color, isDrawdown]);

  return (
    <div className="chart-box">
      <div className="chart-header">
        <span className="chart-title">{title}</span>
      </div>
      <div ref={chartContainerRef} />
      <style jsx>{`
        .chart-box {
          width: 100%;
          padding: 16px;
        }
        .chart-header {
          margin-bottom: 12px;
        }
        .chart-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
      `}</style>
    </div>
  );
};

export default BacktestChart;
