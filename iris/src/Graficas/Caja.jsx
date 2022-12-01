import Plot from "react-plotly.js";

const Caja = (Props) => {
  return (
    <div style={{ height: "400px", weight: "400px" }}>
      <Plot
        data={Props.data}
        layout={Props.layout}
        config={{
          staticPlot: true,
        }}
      />
    </div>
  );
};

export default Caja;
