import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { BasicTooltip } from '@nivo/tooltip';

const Barra = (Props) => {
  const BarTooltip = (props) => {
    return React.createElement(BasicTooltip, {
      id: props.id,
      value: props.value,
      color: props.color,
      enableChip: true,
    });
  };
  return (
    <div style={{ height: "400px", weight: "400"}}>
      <ResponsiveBar
        data={Props.data}
        keys={Props.keys}
        indexBy={Props.indexBy}
        margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
        padding={0.3}
        groupMode="grouped"
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "pink_yellowGreen" }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
          legend: Props.title,
          legendPosition: "middle",
          legendOffset: -330,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        enableLabel={false}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        legends={[]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        tooltip={BarTooltip}
      />
    </div>
  );
};

export default Barra;
