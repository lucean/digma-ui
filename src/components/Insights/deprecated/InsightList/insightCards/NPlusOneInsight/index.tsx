import { useContext } from "react";
import { InsightType } from "../../../../../../types";
import { sendUserActionTrackingEvent } from "../../../../../../utils/actions/sendUserActionTrackingEvent";
import { getCriticalityLabel } from "../../../../../../utils/getCriticalityLabel";
import { getDurationString } from "../../../../../../utils/getDurationString";
import { trimEndpointScheme } from "../../../../../../utils/trimEndpointScheme";
import { ConfigContext } from "../../../../../common/App/ConfigContext";
import { ScoreIndicator } from "../../../../../common/ScoreIndicator";
import { Tooltip } from "../../../../../common/Tooltip";
import { CrosshairIcon } from "../../../../../common/icons/CrosshairIcon";
import { Description, Link } from "../../../../styles";
import { trackingEvents } from "../../../../tracking";
import { Trace } from "../../../../types";
import { InsightCard } from "../../InsightCard";
import { JiraButton } from "../common/JiraButton";
import * as s from "./styles";
import { NPlusOneInsightProps } from "./types";

/**
 * @deprecated
 */
export const NPlusOneInsight = (props: NPlusOneInsightProps) => {
  const config = useContext(ConfigContext);

  const handleSpanLinkClick = (spanCodeObjectId?: string) => {
    spanCodeObjectId &&
      props.onAssetLinkClick(spanCodeObjectId, props.insight.type);
  };

  const handleTraceButtonClick = (
    trace: Trace,
    insightType: InsightType,
    spanCodeObjectId?: string
  ) => {
    props.onTraceButtonClick(trace, insightType, spanCodeObjectId);
  };

  const handleCreateJiraTicketButtonClick = (event: string) => {
    sendUserActionTrackingEvent(
      trackingEvents.JIRA_TICKET_INFO_BUTTON_CLICKED,
      {
        insightType: props.insight.type
      }
    );
    props.onJiraTicketCreate &&
      props.onJiraTicketCreate(props.insight, undefined, event);
  };

  const spanName = props.insight.clientSpanName || undefined;
  const spanCodeObjectId = props.insight.clientSpanCodeObjectId || undefined;
  const traceId = props.insight.traceId;

  const endpoints = props.insight.endpoints || [];

  return (
    <InsightCard
      data={props.insight}
      spanInfo={props.insight.spanInfo}
      content={
        <s.ContentContainer>
          <Description>Check the following SELECT statement:</Description>
          <s.SpanContainer>
            <Tooltip title={spanName}>
              <s.Name>
                {spanCodeObjectId ? (
                  <Link onClick={() => handleSpanLinkClick(spanCodeObjectId)}>
                    {spanName}
                  </Link>
                ) : (
                  spanName
                )}
              </s.Name>
            </Tooltip>
            {config.isJaegerEnabled && traceId && (
              <s.Button
                onClick={() =>
                  handleTraceButtonClick(
                    {
                      name: spanName,
                      id: traceId
                    },
                    props.insight.type,
                    spanCodeObjectId
                  )
                }
                icon={{ component: CrosshairIcon }}
              >
                Trace
              </s.Button>
            )}
          </s.SpanContainer>
          <s.Stats>
            <s.Stat>
              <Description>Repeats</Description>
              <span>{props.insight.occurrences} (median)</span>
            </s.Stat>
            <s.Stat>
              <Description>Duration</Description>
              <span>{getDurationString(props.insight.duration)}</span>
            </s.Stat>
          </s.Stats>
          <Description>Affected endpoints:</Description>
          <s.EndpointList>
            {endpoints.map((x) => {
              const spanCodeObjectId = x.endpointInfo.entrySpanCodeObjectId;
              const route = trimEndpointScheme(x.endpointInfo.route);

              return (
                <s.Endpoint key={spanCodeObjectId}>
                  <Tooltip title={route}>
                    <s.Name>
                      <Link
                        onClick={() => handleSpanLinkClick(spanCodeObjectId)}
                      >
                        {route}
                      </Link>
                    </s.Name>
                  </Tooltip>
                  <s.Stats>
                    <s.Stat>
                      <Description>Criticality</Description>
                      <Tooltip title={x.criticality}>
                        <s.CriticalityValue>
                          {x.criticality > 0 && (
                            <ScoreIndicator score={x.criticality} />
                          )}
                          {getCriticalityLabel(x.criticality)}
                        </s.CriticalityValue>
                      </Tooltip>
                    </s.Stat>
                    <s.Stat>
                      <Description>Repeats</Description>
                      <span>{x.occurrences} (median)</span>
                    </s.Stat>
                  </s.Stats>
                </s.Endpoint>
              );
            })}
          </s.EndpointList>
        </s.ContentContainer>
      }
      onRecalculate={props.onRecalculate}
      onRefresh={props.onRefresh}
      buttons={[
        <JiraButton
          key={"view-ticket-info"}
          onTicketInfoButtonClick={handleCreateJiraTicketButtonClick}
          spanCodeObjectId={props.insight.spanInfo?.spanCodeObjectId}
          ticketLink={props.insight.ticketLink}
          buttonType={"large"}
          isHintEnabled={props.isJiraHintEnabled}
        />
      ]}
    />
  );
};
