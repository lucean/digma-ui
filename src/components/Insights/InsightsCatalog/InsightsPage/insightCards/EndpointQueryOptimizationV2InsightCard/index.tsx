import { getDurationString } from "../../../../../../utils/getDurationString";
import { InsightType, Trace } from "../../../../types";
import { InsightCard } from "../common/InsightCard";
import { ColumnsContainer } from "../common/InsightCard/ColumnsContainer";
import { KeyValue } from "../common/InsightCard/KeyValue";
import { ContentContainer, Details } from "../styles";
import * as s from "./styles";
import { EndpointQueryOptimizationV2InsightCardProps } from "./types";

export const EndpointQueryOptimizationV2InsightCard = ({
  insight,
  onAssetLinkClick,
  onTraceButtonClick,
  onJiraTicketCreate,
  isJiraHintEnabled,
  onRecalculate,
  onRefresh,
  onGoToSpan,
  isMarkAsReadButtonEnabled
}: EndpointQueryOptimizationV2InsightCardProps) => {
  const handleSpanLinkClick = (spanCodeObjectId: string) => {
    onAssetLinkClick(spanCodeObjectId, insight.type);
  };

  const handleTicketInfoButtonClick = (
    spanCodeObjectId: string | undefined,
    event: string
  ) => {
    onJiraTicketCreate && onJiraTicketCreate(insight, spanCodeObjectId, event);
  };

  const handleTraceButtonClick = (
    trace: Trace,
    insightType: InsightType,
    spanCodeObjectId: string
  ) => {
    onTraceButtonClick(trace, insightType, spanCodeObjectId);
  };

  const spanName = insight.span.spanInfo.displayName;
  const spanCodeObjectId = insight.span.spanInfo.spanCodeObjectId;

  return (
    <InsightCard
      insight={insight}
      content={
        <ContentContainer>
          <Details>
            <s.SpanListItem
              name={spanName}
              onClick={() => handleSpanLinkClick(spanCodeObjectId)}
            />
          </Details>
          <ColumnsContainer>
            <KeyValue label={"Duration"}>
              {getDurationString(insight.span.duration)}
            </KeyValue>
          </ColumnsContainer>
        </ContentContainer>
      }
      onRecalculate={onRecalculate}
      onRefresh={onRefresh}
      onGoToTrace={() =>
        handleTraceButtonClick(
          {
            name: spanName,
            id: insight.span.traceId
          },
          insight.type,
          spanCodeObjectId
        )
      }
      onJiraButtonClick={handleTicketInfoButtonClick}
      jiraTicketInfo={{
        ticketLink: insight.span.ticketLink,
        spanCodeObjectId,
        isHintEnabled: isJiraHintEnabled
      }}
      onGoToSpan={onGoToSpan}
      isMarkAsReadButtonEnabled={isMarkAsReadButtonEnabled}
    />
  );
};
