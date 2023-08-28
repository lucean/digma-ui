import useDimensions from "react-cool-dimensions";
import {
  Bar,
  BarChart,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis
} from "recharts";
import { DefaultTheme, useTheme } from "styled-components";
import { Duration } from "../../../globals";
import { isNumber } from "../../../typeGuards/isNumber";
import { formatTimeDistance } from "../../../utils/formatTimeDistance";
import { getPercentileLabel } from "../../../utils/getPercentileLabel";
import { Button } from "../../common/Button";
import { ChartIcon } from "../../common/icons/ChartIcon";
import { DoubleCircleIcon } from "../../common/icons/DoubleCircleIcon";
import { DurationChange, isChangeMeaningfulEnough } from "../DurationChange";
import { InsightCard } from "../InsightCard";
import { Description } from "../styles";
import { HistogramBarData, Trace } from "../types";
import { ReferenceLineLabel } from "./ReferenceLineLabel";
import { XAxisTick } from "./XAxisTick";
import { DIVIDER } from "./constants";
import * as s from "./styles";
import { DurationInsightProps, TickData } from "./types";

const LAST_CALL_TIME_DISTANCE_LIMIT = 60 * 1000; // in milliseconds

// in pixels
const BAR_WIDTH = 5;
const MIN_X_AXIS_PADDING = 40;
const MIN_CHART_CONTAINER_HEIGHT = 120;
const CHART_Y_MARGIN = 20;

const durationPlaceholder: Duration = { value: 0, unit: "ns", raw: 0 };

const getDurationString = (duration: Duration) =>
  `${duration.value} ${duration.unit}`;

const getBarColor = (value: Duration, p50?: Duration, p95?: Duration) => {
  const blueColor = "#4b46a2";
  const purpleColor = "#6f46a2";
  const redColor = "#a24666";

  if (p50 && value.raw < p50.raw) {
    return blueColor;
  }

  if (p95 && value.raw >= p95.raw) {
    return redColor;
  }

  return purpleColor;
};

const getTickColor = (theme: DefaultTheme) => {
  switch (theme.mode) {
    case "light":
      return "#4d668a";
    case "dark":
    case "dark-jetbrains":
      return "#b4b8bf";
  }
};

const calculateBars = (
  bars: HistogramBarData[],
  chartWidth: number
): HistogramBarData[] => {
  const filledBars: HistogramBarData[] = [];

  for (let i = 0; i < bars.length; i++) {
    const bar = bars[i];

    if (i === 0 && bar.index > 0) {
      for (let j = 0; j < bar.index; j++) {
        filledBars[j] = {
          index: j,
          count: 0,
          start: durationPlaceholder,
          end: durationPlaceholder
        };
      }
    }

    if (i !== 0) {
      const prevBar = bars[i - 1];
      for (let j = prevBar.index + 1; j < bar.index; j++) {
        filledBars[j] = {
          index: j,
          count: 0,
          start: durationPlaceholder,
          end: durationPlaceholder
        };
      }
    }

    filledBars[bar.index] = bar;
  }

  const barReservedWidth = BAR_WIDTH * 2;
  const newBarCount = Math.floor(chartWidth / barReservedWidth);
  const barsCount = filledBars.length;
  const groupSize = Math.ceil(barsCount / newBarCount);

  const newBars: HistogramBarData[] = [];

  for (let i = 0, j = 0; i < barsCount; i += groupSize, j++) {
    const group = filledBars.slice(i, i + groupSize);
    const newCount = group.reduce((acc, cur) => acc + cur.count, 0);
    const notEmptyBars = group.filter((x) => x.count > 0);

    newBars.push({
      index: j,
      count: newCount,
      start: newCount > 0 ? notEmptyBars[0].start : durationPlaceholder,
      end:
        newCount > 0
          ? notEmptyBars[notEmptyBars.length - 1].end
          : durationPlaceholder
    });
  }

  return newBars;
};

export const DurationInsight = (props: DurationInsightProps) => {
  // const config = useContext(ConfigContext);
  const theme = useTheme();
  const tickColor = getTickColor(theme);
  const { observe, width } = useDimensions();

  const sortedPercentiles = [...props.insight.percentiles].sort(
    (a, b) => a.percentile - b.percentile
  );

  const spanLastCall = props.insight.lastSpanInstanceInfo;

  const handleHistogramButtonClick = () => {
    props.insight.spanInfo &&
      props.onHistogramButtonClick(
        props.insight.spanInfo.instrumentationLibrary,
        props.insight.spanInfo.name,
        props.insight.type
      );
  };

  const handleLiveButtonClick = () => {
    props.insight.prefixedCodeObjectId &&
      props.onLiveButtonClick(props.insight.prefixedCodeObjectId);
  };

  // const handleCompareButtonClick = (traces: [Trace, Trace]) => {
  //   props.onCompareButtonClick(traces, props.insight.type);
  // };

  const traces: Trace[] = [];

  const isLastCallRecent = spanLastCall
    ? Date.now() - new Date(spanLastCall.startTime).valueOf() <
      LAST_CALL_TIME_DISTANCE_LIMIT
    : false;

  const chartData = props.insight.histogramPlot
    ? calculateBars(props.insight.histogramPlot.bars, width)
    : [];

  const XAxisPadding = Math.max(
    (width - chartData.length * BAR_WIDTH * 2) / 2,
    MIN_X_AXIS_PADDING
  );

  const p50 = props.insight.histogramPlot?.quantiles.find(
    (x) => x.quantileValue === 0.5
  )?.timestamp;

  const p95 = props.insight.histogramPlot?.quantiles.find(
    (x) => x.quantileValue === 0.95
  )?.timestamp;

  const p50BarIndex = p50
    ? chartData.findIndex((x) => x.end.raw >= p50.raw)
    : undefined;

  const p95BarIndex = p95
    ? chartData.findIndex((x) => x.end.raw >= p95.raw)
    : undefined;

  const ticks: Record<number, TickData> = {};

  const isP50Present = p50 && isNumber(p50BarIndex) && p50BarIndex > -1;
  const isP95Present = p95 && isNumber(p95BarIndex) && p95BarIndex > -1;

  if (isP50Present) {
    ticks[p50BarIndex] = {
      value: getDurationString(p50),
      label: getPercentileLabel(0.5)
    };
  }

  if (isP95Present) {
    ticks[p95BarIndex] = {
      value: getDurationString(p95),
      label: getPercentileLabel(0.95)
    };
  }

  if (isP50Present && isP95Present && p50BarIndex === p95BarIndex) {
    ticks[p95BarIndex] = {
      value: [getDurationString(p50), getDurationString(p95)].join(DIVIDER),
      label: [getPercentileLabel(0.5), getPercentileLabel(0.95)].join(DIVIDER),
      multiline: true
    };
  }

  let chartContainerHeight = MIN_CHART_CONTAINER_HEIGHT;
  let chartMarginTop = CHART_Y_MARGIN;
  let chartMarginBottom = 0;
  const hasMultilineLabels = Object.values(ticks).some((x) => x.multiline);

  if (hasMultilineLabels) {
    chartMarginTop += CHART_Y_MARGIN;
    chartMarginBottom += CHART_Y_MARGIN;
    chartContainerHeight += CHART_Y_MARGIN * 2;
  }

  const notEmptyBars = chartData.filter((x) => x.count > 0);

  if (!p50 && !p95 && notEmptyBars.length) {
    const minBar = notEmptyBars[0];
    ticks[minBar.index] = {
      value: getDurationString(minBar.start),
      role: "min"
    };

    const maxBar = notEmptyBars[notEmptyBars.length - 1];
    ticks[maxBar.index] = {
      value: getDurationString(maxBar.end),
      role: "max"
    };
  }

  return (
    <InsightCard
      data={props.insight}
      isRecent={isLastCallRecent}
      content={
        <s.Container>
          {spanLastCall && (
            <s.Stats>
              <s.StatsTitle>Last call</s.StatsTitle>
              <s.ValueContainer>
                <Description>
                  {getDurationString(spanLastCall.duration)}
                </Description>
                <s.LastCallTimeDistance isRecent={isLastCallRecent}>
                  •{" "}
                  {isLastCallRecent
                    ? "Moments ago"
                    : formatTimeDistance(spanLastCall.startTime)}
                </s.LastCallTimeDistance>
              </s.ValueContainer>
            </s.Stats>
          )}
          {sortedPercentiles.length > 0 ? (
            <>
              {sortedPercentiles.map((percentile) => {
                if (percentile.traceIds.length > 0) {
                  traces.push({
                    id: percentile.traceIds[0],
                    name: `P${percentile.percentile * 100}`
                  });
                }

                const isChangeMeaningful = isChangeMeaningfulEnough(
                  percentile.currentDuration,
                  percentile.previousDuration,
                  percentile.changeTime
                );

                return isChangeMeaningful ? (
                  <s.Stats key={percentile.percentile}>
                    <s.StatsTitle>
                      {getPercentileLabel(percentile.percentile)}
                    </s.StatsTitle>
                    <s.ValueContainer>
                      <DurationChange
                        currentDuration={percentile.currentDuration}
                        previousDuration={percentile.previousDuration}
                        changeTime={percentile.changeTime}
                        changeVerified={percentile.changeVerified}
                      />
                    </s.ValueContainer>
                  </s.Stats>
                ) : null;
              })}
            </>
          ) : (
            // TODO: add hourglass icon
            <span>Waiting for more data...</span>
          )}
          {!props.insight.histogramPlot &&
            props.insight.average &&
            props.insight.standardDeviation && (
              <s.Stats key={"average"}>
                <s.StatsTitle>Average</s.StatsTitle>
                <Description>
                  {getDurationString(props.insight.average)}
                  {props.insight.standardDeviation.raw > 0 &&
                    ` ± ${getDurationString(props.insight.standardDeviation)}`}
                </Description>
              </s.Stats>
            )}

          {props.insight.histogramPlot && (
            <s.ChartContainer ref={observe} height={chartContainerHeight}>
              <ResponsiveContainer width={"100%"} height={"100%"}>
                <BarChart
                  margin={{
                    top: chartMarginTop,
                    right: 0,
                    bottom: chartMarginBottom,
                    left: 0
                  }}
                  barSize={BAR_WIDTH}
                  data={chartData}
                >
                  <Bar
                    dataKey={"count"}
                    radius={BAR_WIDTH / 2}
                    isAnimationActive={false}
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={getBarColor(entry.end, p50, p95)}
                      />
                    ))}
                  </Bar>
                  <Tooltip
                    cursor={false}
                    content={(x) => {
                      const data = x.payload
                        ? (x.payload[0]?.payload as HistogramBarData)
                        : null;

                      if (!data || data.count === 0) {
                        return;
                      }

                      return (
                        <s.TooltipContainer>
                          <span>Request count: {data.count}</span>
                          <span>
                            Duration range: {getDurationString(data.start)} -{" "}
                            {getDurationString(data.end)}
                          </span>
                        </s.TooltipContainer>
                      );
                    }}
                    isAnimationActive={false}
                  />
                  <XAxis
                    padding={{ left: XAxisPadding, right: XAxisPadding }}
                    stroke={tickColor}
                    tick={(props) => <XAxisTick {...props} ticks={ticks} />}
                    interval={0}
                    ticks={Object.keys(ticks).map((x) => Number(x))}
                    tickFormatter={(x: number) => ticks[x].value}
                    height={20}
                  />
                  {Object.entries(ticks)
                    .filter(([, tickData]) => tickData.label)
                    .map(([barIndex, tickData]) => (
                      <ReferenceLine
                        key={tickData.label}
                        x={Number(barIndex)}
                        stroke={tickColor}
                        strokeDasharray={"5 5"}
                        label={{
                          position: "top",
                          value: tickData.label,
                          fill: tickColor,
                          content: ReferenceLineLabel
                        }}
                      />
                    ))}
                </BarChart>
              </ResponsiveContainer>
            </s.ChartContainer>
          )}
        </s.Container>
      }
      onRecalculate={props.onRecalculate}
      onRefresh={props.onRefresh}
      isAsync={props.insight.isAsync}
      buttons={[
        ...(props.insight.spanInfo
          ? [
              <Button
                icon={{ component: ChartIcon }}
                key={"histogram"}
                onClick={handleHistogramButtonClick}
              >
                Histogram
              </Button>
            ]
          : []),
        // ...(config.isJaegerEnabled && traces.length > 1
        //   ? [
        //       <Button
        //         key={"compare"}
        //         onClick={() => handleCompareButtonClick([traces[0], traces[1]])}
        //       >
        //         Compare
        //       </Button>
        //     ]
        //   : []),
        ...(props.insight.prefixedCodeObjectId
          ? [
              <Button
                icon={{ component: DoubleCircleIcon }}
                key={"live"}
                buttonType={"secondary"}
                onClick={handleLiveButtonClick}
              >
                Live
              </Button>
            ]
          : [])
      ]}
    />
  );
};
