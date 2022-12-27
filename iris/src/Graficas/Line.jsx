import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { Grid, Box } from "@mui/material";

const Line = (Props) => {
  if (Props.visible) {
    return (
      <Grid item xs={12} sm={12} md={12}>
        <Box sx={{ padding: 2 }}>
          <Box sx={{ p: 2, border: "5px dashed plum" }}>
            <div style={{ height: "400px", weight: "400" }}>
              <ResponsiveLine
                data={Props.data}
                margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
                xScale={{ type: "point" }}
                yScale={{
                  type: "linear",
                  min: "auto",
                  max: "auto",
                  stacked: true,
                  reverse: false,
                }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  orient: "bottom",
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: Props.LegendBottom,
                  legendOffset: 36,
                  legendPosition: "middle",
                }}
                axisLeft={{
                  orient: "left",
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: Props.LegendLeft,
                  legendOffset: -50,
                  legendPosition: "middle",
                }}
                colors={{ scheme: "purpleRed_green" }}
                pointSize={10}
                pointColor={{ theme: "background" }}
                pointBorderWidth={2}
                pointBorderColor={{ from: "serieColor" }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[]}
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

export default Line;
