import { ReactElement, useContext } from "react";
import { InsightType } from "../../../../types";
import { getCriticalityLabel } from "../../../../utils/getCriticalityLabel";
import { intersperse } from "../../../../utils/intersperse";
import { ConfigContext } from "../../../common/App/ConfigContext";
import { JiraTicket } from "../../JiraTicket";
import {
  EndpointSuspectedNPlusOneInsight,
  SpanNPlusOneInsight
} from "../../types";
import { CodeLocations } from "../common/CodeLocations";
import { CommitInfos } from "../common/CommitInfos";
import { DigmaSignature } from "../common/DigmaSignature";
import { NPlusOneAffectedEndpoints } from "../common/NPlusOneAffectedEndpoints";
import { useEndpointDataSource } from "../common/useTicketDataSource";
import { InsightTicketProps } from "../types";

export const EndpointNPlusOneInsightTicket = (
  props: InsightTicketProps<EndpointSuspectedNPlusOneInsight>
) => {
  const config = useContext(ConfigContext);
  const span = props.data.insight.spans.find(
    (x) =>
      (x.internalSpan?.spanCodeObjectId &&
        x.internalSpan.spanCodeObjectId === props.data.spanCodeObjectId) ||
      x.clientSpan.spanCodeObjectId === props.data.spanCodeObjectId
  );
  const spanInfo = span?.internalSpan || span?.clientSpan || null;

  const {
    commitInfos,
    spanInsight,
    isLoading,
    codeLocations,
    onReloadSpanInsight
  } = useEndpointDataSource<SpanNPlusOneInsight>(
    spanInfo,
    InsightType.SpanNPlusOne
  );

  const services = [
    ...new Set(
      (spanInsight?.endpoints || []).map((x) => x.endpointInfo.serviceName)
    )
  ];
  const serviceString = services.length > 0 ? services.join(", ") : "";

  const criticalityString = `Criticality: ${getCriticalityLabel(
    props.data.insight.criticality
  )}`;

  const summary = ["N+1 Issue found", serviceString, criticalityString]
    .filter(Boolean)
    .join(" - ");

  const queryString = spanInfo?.displayName || "";

  const renderDescription = () => (
    <>
      {intersperse<ReactElement, ReactElement>(
        [
          <div key={"title"}>N+1 Query Detected</div>,
          <div key={"query"}>{queryString}</div>,
          <CodeLocations key={"codeLocations"} codeLocations={codeLocations} />,
          <NPlusOneAffectedEndpoints
            key={"affectedEndpoints"}
            insight={spanInsight || undefined}
          />,
          <CommitInfos
            key={"commitInfos"}
            commitInfos={commitInfos}
            insight={spanInsight || undefined}
          />,
          <DigmaSignature key={"digmaSignature"} />
        ],
        (i: number) => (
          <br key={`separator-${i}`} />
        )
      )}
    </>
  );

  const traceId = span?.traceId;
  const attachment = traceId
    ? {
        url: `${config.jaegerURL}/api/traces/${traceId}?prettyPrint=true`,
        fileName: `trace-${traceId}.json`
      }
    : undefined;

  return (
    <JiraTicket
      summary={summary}
      description={{
        content: renderDescription(),
        isLoading,
        errorMessage:
          spanInsight === null ? "Failed to get insight details" : undefined
      }}
      attachment={attachment}
      insight={props.data.insight}
      relatedInsight={spanInsight}
      onClose={props.onClose}
      onReloadSpanInsight={onReloadSpanInsight}
    />
  );
};
