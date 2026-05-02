"use client";

import React, { useEffect, useRef } from "react";
import { createChart, ColorType, ISeriesApi, CandlestickData } from "lightweight-charts";

interface TradingChartProps {
  data: CandlestickData[];
  ticker: string;
}

const TradingChart: React.FC<TradingChartProps> = ({ data, ticker }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const handleResize = () => {
      chartRef.current.applyOptions({ width: chartContainerRef.current?.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "rgba(255, 255, 255, 0.6)",
      },
      grid: {
        vertLines: { color: "rgba(255, 255, 255, 0.05)" },
        horzLines: { color: "rgba(255, 255, 255, 0.05)" },
      },
      width: chartContainerRef.current.clientWidth,
      height: 350,
      timeScale: {
        borderColor: "rgba(255, 255, 255, 0.1)",
      },
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor: "#00ff88",
      downColor: "#ff0055",
      borderVisible: false,
      wickUpColor: "#00ff88",
      wickDownColor: "#ff0055",
    });

    candleSeries.setData(data);
    chartRef.current = chart;

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [data]);

  return (
    <div className="chart-wrapper">
      <div className="chart-info">
        <span className="ticker-badge">{ticker}</span>
        <span className="chart-type">Real-time Stream</span>
      </div>
      <div ref={chartContainerRef} />
      <style jsx>{`
        .chart-wrapper {
          position: relative;
          width: 100%;
        }
        .chart-info {
          display: flex;
          gap: 12px;
          margin-bottom: 12px;
        }
        .ticker-badge {
          background: var(--primary);
          color: black;
          padding: 2px 8px;
          border-radius: 4px;
          font-weight: 700;
          font-size: 0.75rem;
        }
        .chart-type {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
};

export default TradingChart;
