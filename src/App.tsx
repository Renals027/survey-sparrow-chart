import BarChart from "./components/barChart";

function App() {
  const xAxisLable = ["1", "2", "3", "4", "5"];
  const xAxisData = [100, 90, 80, 70, 60];
  const barSize = "medium";
  const yAxisSize = "large";
  const xAxisName = "Rating";
  const yAxisName = "No. of Rating";
  return (
    <div className="p-10 pt-0">
      <div className="text-2xl font-bold mb-2">Bar Chart</div>
      <BarChart
        xAxisData={xAxisData}
        xAxisLable={xAxisLable}
        barSize={barSize}
        yAxisSize={yAxisSize}
        xAxisName={xAxisName}
        yAxisName={yAxisName}
      />
      <div className="text-red-500 font-bold">Note :</div>
      <ul className="list-disc">
        <li>
          The yAxis of the graph is generated dynamically based on the data. If
          the average of the data is created in hundreds or thousands the y-axis
          modifies according to that
        </li>
        <li>
          The yAxis plots can be modified by 10s or 20s based on the props
        </li>
        <li>
          The labels of the xAxis can also be given dynamically by the props
        </li>
        <li>The bar size can also be modified based on the props</li>
        <li>The name of the x-axis and y-axis can also be modified</li>
      </ul>
    </div>
  );
}

export default App;
