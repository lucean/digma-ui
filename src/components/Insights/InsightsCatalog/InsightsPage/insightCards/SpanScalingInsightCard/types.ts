import { InsightType, SpanScalingInsight, Trace } from "../../../../types";
import { InsightCardCommonProps } from "../common/InsightCard/types";

export interface SpanScalingInsightCardProps extends InsightCardCommonProps {
  insight: SpanScalingInsight;
  onAssetLinkClick: (
    spanCodeObjectId: string,
    insightType: InsightType
  ) => void;
  onTraceButtonClick: (
    trace: Trace,
    insightType: InsightType,
    spanCodeObjectId: string
  ) => void;
  onHistogramButtonClick: (
    instrumentationLibrary: string,
    name: string,
    insightType: InsightType,
    displayName: string
  ) => void;
}
