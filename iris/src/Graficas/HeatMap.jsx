import React from "react";
import { ResponsiveHeatMap } from "@nivo/heatmap";
import { Grid, Box } from "@mui/material";

const HeatMap = (Props) => {
  if (Props.visible) {
    return (
      <Grid item xs={12} sm={12} md={12}>
        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed plum" }}>
            <div style={{ height: "400px", weight: "400" }}>
              <ResponsiveHeatMap
                data={Props.data}
                margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
                valueFormat=">-.2s"
                axisTop={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: -90,
                  legend: "",
                  legendOffset: 46,
                }}
                axisRight={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legendPosition: "middle",
                  legendOffset: 70,
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legendPosition: "middle",
                  legendOffset: -72,
                }}
                colors={{
                  type: "diverging",
                  scheme: "red_purple",
                  divergeAt: 0.5,
                }}
                emptyColor="#555555"
                legends={[
                  {
                    anchor: "bottom",
                    translateX: 0,
                    translateY: 30,
                    length: 400,
                    thickness: 8,
                    direction: "row",
                    tickPosition: "after",
                    tickSize: 3,
                    tickSpacing: 4,
                    tickOverlap: false,
                    tickFormat: ">-.2s",
                    title: "Value →",
                    titleAlign: "start",
                    titleOffset: 4,
                  },
                ]}
                isInteractive={false}
              />
            </div>
          </Box>
        </Box>
      </Grid>
    );
  } else {
    return null;
  }
};

export default HeatMap;
