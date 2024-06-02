import GraphComponent from "./components/graph";

function App() {
  const xAxisLable = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
  ];
  const xAxisData = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10];
  const barSize = "large";
  const yAxisSize = "large";

  return (
    <>
      <div className="p-10">
        <GraphComponent
          xAxisData={xAxisData}
          xAxisLable={xAxisLable}
          barSize={barSize}
          yAxisSize={yAxisSize}
        />
      </div>
    </>
  );
}

export default App;
