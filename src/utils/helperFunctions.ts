import { TypeProps } from "../components/type";

// Function to generate y-axis labels
export const generateYAxis = (
  factor: number,
  yAxisSize: string | undefined
) => {
  let newData = Array.from({ length: 10 }, (_, i) => (i + 1) * factor);
  if (yAxisSize === "small") {
    newData = newData.filter((val) => val % (2 * factor) === 0);
  }
  return newData;
};

// Create data for the graph
export const createData = (
  label: string[],
  averageLength: number,
  data?: number[] | undefined
): TypeProps[] => {
  return label.map((item, index) => {
    return {
      label: item,
      data: data
        ? data[index]
        : Math.floor(Math.random() * Math.pow(10, averageLength)),
    };
  });
};

// Function to calculate bar height
export const calculateYAxisPlots = (averageLength: number, index: number) => {
  let base = 1;
  if (index === 0) {
    return base - 9 * (averageLength - 1);
  } else if (averageLength >= 3) {
    return base - 9 * (averageLength - 2);
  } else {
    return base;
  }
};

// Function to calculate bar height
export const calculateBarheight = (
  data: number,
  averageLength: number,
  yAxisSize: string | undefined
) => {
  const dataPrecision = data / Math.pow(10, averageLength - 2);
  return dataPrecision * (yAxisSize === "large" ? 4 : 2);
};
