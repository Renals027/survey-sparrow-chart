import { useEffect, useState, useRef } from "react";
import { TypeProps, graphProps } from "./type";
import {
  barSizeData,
  calculateBarheight,
  calculateYAxisPlots,
  createData,
  generateYAxis,
} from "../utils";

const BarChart = (props: graphProps) => {
  const {
    xAxisData = [],
    xAxisLable = [],
    barSize = "medium",
    yAxisSize = "large",
    xAxisName = "",
    yAxisName = "",
  } = props;
  const [xAxis, setXAxis] = useState<TypeProps[]>([]);
  const [yAxis, setYAxis] = useState<number[]>([]);
  const [containerSize, setContainerSize] = useState({ width: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [averageLength, setAverageLength] = useState(0);

  // Initial data for the graph
  useEffect(() => {
    if (yAxis.length === 0) {
      const averageData =
        xAxisData.reduce((acc, cur) => acc + cur, 0) / xAxisData.length;
      const averageLength = averageData.toString().length;
      setAverageLength(averageLength);
      if (averageLength >= 1) {
        const factor = Math.pow(10, averageLength - 1);
        const yAxisData = generateYAxis(factor, yAxisSize);
        setYAxis(yAxisData.reverse());
      }
    }
    setXAxis(createData(xAxisLable, averageLength, xAxisData));

    // Measure container size
    if (containerRef.current) {
      const container = containerRef.current;
      setContainerSize({
        width: container.scrollWidth + 20,
      });
    }
  }, [xAxisData, xAxisLable, yAxis]);

  // Handle regenerate function
  const handleRegenerate = () => {
    setXAxis(createData(xAxisLable, averageLength, undefined));
  };

  return (
    <div>
      <div className="relative">
        <div
          ref={containerRef}
          className={`flex gap-[30px] border-b-2 pl-6 border-l-2 ml-10 mt-1 border-black-200 items-end`}
          style={{
            width: `${containerSize.width}px`,
            height: yAxisSize === "large" ? "410px" : "210px",
          }}
        >
          {xAxis.map((item, index) => (
            <div key={index} className="relative">
              <div
                className={`bg-blue-200 shadow rounded-t cursor-crosshair`}
                style={{
                  height: `${calculateBarheight(
                    item?.data,
                    averageLength,
                    yAxisSize
                  )}px`,
                  width: `${
                    barSizeData[barSize as keyof typeof barSizeData]
                  }px`,
                }}
              ></div>
              <div className="absolute bottom-[-30px] text-center">
                {item?.label}
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-[105px] left-[12px]">
          <div className="grid column gap-[40px] leading-none">
            {yAxis.map((item, index) => (
              <div
                key={index}
                style={{
                  height: 0,
                  marginLeft: calculateYAxisPlots(averageLength, index),
                }}
              >
                {`${item} -`}
              </div>
            ))}
          </div>
          <div
            className={`absolute left-[-80px]  rotate-90`}
            style={{ bottom: yAxisSize === "large" ? "200px" : "50px" }}
          >
            {yAxisName}
          </div>
        </div>
        <div className="ml-[150px] mt-[30px]">{xAxisName}</div>
      </div>

      <button
        onClick={handleRegenerate}
        className="mb-2 button bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
      >
        Regenerate
      </button>
    </div>
  );
};

export default BarChart;
