import { useEffect, useState, useRef } from "react";
import { TypeProps, graphProps } from "./type";

const GraphComponent = (props: graphProps) => {
  const barSizeData = {
    small: 12,
    medium: 20,
    large: 30,
  };

  const { xAxisData, xAxisLable, barSize, yAxisSize } = props;
  const [xAxis, setXAxis] = useState<TypeProps[]>([]);
  const [yAxis, setYAxis] = useState<number[]>([]);
  const [containerSize, setContainerSize] = useState({ width: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Function to generate y-axis labels
  const generateYAxis = (factor: number) => {
    let newData = Array.from({ length: 10 }, (_, i) => (i + 1) * factor);
    if (yAxisSize === "small") {
      newData = newData.filter((val) => val % (2 * factor) === 0);
    }
    return newData;
  };

  // Initial data for the graph
  useEffect(() => {
    setXAxis(createData(xAxisLable, xAxisData));
    if (yAxis.length === 0) {
      const averageData =
        xAxisData.reduce((acc, cur) => acc + cur, 0) / xAxisData.length;
      const averageLength = averageData.toString().length;

      if (averageLength >= 1) {
        const factor = Math.pow(10, averageLength - 1);
        const yAxisData = generateYAxis(factor);
        setYAxis(yAxisData.reverse());
      }
    }

    // Measure container size
    if (containerRef.current) {
      const container = containerRef.current;
      setContainerSize({
        width: container.scrollWidth + 20,
      });
    }
  }, [xAxisData, xAxisLable, yAxis]);

  // Create data for the graph
  const createData = (label: string[], data?: number[]): TypeProps[] => {
    return label.map((item, index) => {
      return {
        label: item,
        data: data ? data[index] : Math.floor(Math.random() * 100),
      };
    });
  };

  // Handle regenerate function
  const handleRegenerate = () => {
    setXAxis(createData(xAxisLable));
  };

  return (
    <div>
      <div className="relative">
        <div
          ref={containerRef}
          className={`flex gap-[30px] border-b-2 pl-6 border-l-2 ml-10 mt-20 border-blue-200 items-end`}
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
                  height: `${item?.data * (yAxisSize === "large" ? 4 : 2)}px`,
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
                  marginLeft: index === 0 ? "-10px" : "0px",
                }}
              >
                {item} -
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            width: `${containerSize.width}px`,
            margin: "auto",
            marginTop: "30px",
          }}
        >
          Voted Population
        </div>
      </div>

      <button
        onClick={handleRegenerate}
        className="m-4 button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Regenerate
      </button>
    </div>
  );
};

export default GraphComponent;
