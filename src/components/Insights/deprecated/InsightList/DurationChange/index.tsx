import { formatDuration, intervalToDuration } from "date-fns";
import { DefaultTheme, useTheme } from "styled-components";
import { Duration } from "../../../../../globals";
import { formatTimeDistance } from "../../../../../utils/formatTimeDistance";
import { roundTo } from "../../../../../utils/roundTo";
import { Tooltip } from "../../../../common/Tooltip";
import { ArrowIcon } from "../../../../common/icons/ArrowIcon";
import { Direction } from "../../../../common/icons/types";
import * as s from "./styles";
import { DurationChangeProps } from "./types";

const DURATION_RATIO_MIN_LIMIT = 0.1;
const DURATION_DIFF_MIN_LIMIT = 10 * 1000; // in nanoseconds

export const isChangeMeaningfulEnough = (
  currentDuration: Duration,
  previousDuration: Duration | null,
  changeTime: string | null
): boolean => {
  let isChangeMeaningfulEnough = false;

  if (previousDuration && changeTime) {
    const diff = Math.abs(currentDuration.raw - previousDuration.raw);

    isChangeMeaningfulEnough =
      diff / previousDuration.raw > DURATION_RATIO_MIN_LIMIT &&
      diff > DURATION_DIFF_MIN_LIMIT;
  }

  return isChangeMeaningfulEnough;
};

export const getDurationDifferenceString = (
  previousDuration: Duration,
  currentDuration: Duration
) => {
  const diff =
    Math.abs(previousDuration.raw - currentDuration.raw) / 1000 / 1000; // in milliseconds

  if (diff < 1000) {
    return `${roundTo(diff, 2)} ms`;
  }

  const seconds = diff / 1000;

  if (seconds < 60) {
    return `${roundTo(seconds, 2)} sec`;
  }

  const minutes = seconds / 60;

  if (minutes < 60) {
    return `${roundTo(minutes, 2)} min`;
  }

  return formatDuration(intervalToDuration({ start: 0, end: diff })); // approximate for the units larger then hours as start and end dates are unknown
};

const getArrowIconColor = (direction: Direction, theme: DefaultTheme) => {
  if (direction === Direction.UP) {
    switch (theme.mode) {
      case "light":
        return "#e00036";
      case "dark":
      case "dark-jetbrains":
        return "#f93967";
    }
  }

  switch (theme.mode) {
    case "light":
      return "#1dc693";
    case "dark":
    case "dark-jetbrains":
      return "#67d28b";
  }
};

const renderArrowIcon = (
  currentDuration: Duration,
  previousDuration: Duration | null,
  theme: DefaultTheme
): JSX.Element | null => {
  if (!previousDuration) {
    return null;
  }

  const direction =
    previousDuration.raw > currentDuration.raw ? Direction.DOWN : Direction.UP;

  return (
    <s.ArrowContainer>
      <ArrowIcon
        direction={direction}
        color={getArrowIconColor(direction, theme)}
        size={14}
      />
    </s.ArrowContainer>
  );
};

/**
 * @deprecated
 */
export const DurationChange = (props: DurationChangeProps) => {
  const theme = useTheme();

  const isChangeMeaningful = isChangeMeaningfulEnough(
    props.currentDuration,
    props.previousDuration,
    props.changeTime
  );

  return (
    <>
      {props.previousDuration && props.changeTime && isChangeMeaningful && (
        <s.Change>
          {renderArrowIcon(
            props.currentDuration,
            props.previousDuration,
            theme
          )}
          by{" "}
          {getDurationDifferenceString(
            props.previousDuration,
            props.currentDuration
          )}
          ,{" "}
          <Tooltip title={new Date(props.changeTime).toString()}>
            <span>{formatTimeDistance(props.changeTime)}</span>
          </Tooltip>
        </s.Change>
      )}
      {isChangeMeaningful && props.changeVerified === false && (
        <Tooltip
          title={
            "This change is still being validated and is based on initial data"
          }
        >
          <span>• Evaluating</span>
        </Tooltip>
      )}
    </>
  );
};
