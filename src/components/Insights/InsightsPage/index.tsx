import { useContext, useEffect, useRef } from "react";
import { actions as globalActions } from "../../../actions";
import { usePersistence } from "../../../hooks/usePersistence";
import { usePrevious } from "../../../hooks/usePrevious";
import { trackingEvents as globalTrackingEvents } from "../../../trackingEvents";
import { isNumber } from "../../../typeGuards/isNumber";
import { isUndefined } from "../../../typeGuards/isUndefined";
import { InsightType } from "../../../types";
import { sendTrackingEvent } from "../../../utils/sendTrackingEvent";
import { ConfigContext } from "../../common/App/ConfigContext";
import { Card } from "../../common/Card";
import { EmptyState } from "../../common/EmptyState";
import { CardsIcon } from "../../common/icons/CardsIcon";
import { BottleneckInsight } from "../BottleneckInsight";
import { DurationBreakdownInsight } from "../DurationBreakdownInsight";
import { DurationInsight } from "../DurationInsight";
import { DurationSlowdownSourceInsight } from "../DurationSlowdownSourceInsight";
import { EndpointNPlusOneInsight } from "../EndpointNPlusOneInsight";
import { EndpointQueryOptimizationInsight } from "../EndpointQueryOptimizationInsight";
import { ErrorsInsight } from "../ErrorsInsight";
import { ExcessiveAPICallsInsight } from "../ExcessiveAPICallsInsight";
import { HighNumberOfQueriesInsight } from "../HighNumberOfQueriesInsight";
import { InsightCard } from "../InsightCard";
import { NPlusOneInsight } from "../NPlusOneInsight";
import { NoScalingIssueInsight } from "../NoScalingIssueInsight";
import { PerformanceAtScaleInsight } from "../PerformanceAtScaleInsight";
import { QueryOptimizationInsight } from "../QueryOptimizationInsight";
import { RequestBreakdownInsight } from "../RequestBreakdownInsight";
import { ScalingIssueInsight } from "../ScalingIssueInsight";
import { SessionInViewInsight } from "../SessionInViewInsight";
import { SlowEndpointInsight } from "../SlowEndpointInsight";
import { SpanBottleneckInsight } from "../SpanBottleneckInsight";
import { SpanNexusInsight } from "../SpanNexusInsight";
import { TopUsageInsight } from "../TopUsageInsight";
import { TrafficInsight } from "../TrafficInsight";
import { actions } from "../actions";
import { Description } from "../styles";
import { trackingEvents } from "../tracking";
import {
  isChattyApiEndpointInsight,
  isCodeObjectErrorsInsight,
  isCodeObjectHotSpotInsight,
  isEndpointBreakdownInsight,
  isEndpointDurationSlowdownInsight,
  isEndpointHighNumberOfQueriesInsight,
  isEndpointHighUsageInsight,
  isEndpointLowUsageInsight,
  isEndpointNormalUsageInsight,
  isEndpointQueryOptimizationInsight,
  isEndpointSlowestSpansInsight,
  isEndpointSuspectedNPlusOneInsight,
  isSessionInViewEndpointInsight,
  isSlowEndpointInsight,
  isSpanDurationBreakdownInsight,
  isSpanDurationsInsight,
  isSpanEndpointBottleneckInsight,
  isSpanNPlusOneInsight,
  isSpanNexusInsight,
  isSpanQueryOptimizationInsight,
  isSpanScalingBadlyInsight,
  isSpanScalingInsufficientDataInsight,
  isSpanScalingWellInsight,
  isSpanUsagesInsight
} from "../typeGuards";
import { CodeObjectInsight, GenericCodeObjectInsight, Trace } from "../types";
import * as s from "./styles";
import { InsightPageProps, isInsightJiraTicketHintShownPayload } from "./types";

const getInsightToShowJiraHint = (insights: CodeObjectInsight[]): number => {
  const insightsWithJiraButton = [
    InsightType.EndpointSpanNPlusOne,
    InsightType.SpanNPlusOne,
    InsightType.SpanEndpointBottleneck,
    InsightType.SlowestSpans,
    InsightType.SpanQueryOptimization,
    InsightType.EndpointHighNumberOfQueries,
    InsightType.EndpointQueryOptimization
  ];

  return insights.findIndex((insight) =>
    insightsWithJiraButton.includes(insight.type)
  );
};

const renderInsightCard = (
  insight: GenericCodeObjectInsight,
  onJiraTicketCreate: (
    insight: GenericCodeObjectInsight,
    spanCodeObjectId: string | undefined,
    event?: string
  ) => void,
  isJiraHintEnabled: boolean,
  onRefresh: () => void
): JSX.Element | undefined => {
  const handleErrorSelect = (errorId: string, insightType: InsightType) => {
    sendTrackingEvent(globalTrackingEvents.USER_ACTION, {
      action: `Follow ${insightType} link`
    });
    window.sendMessageToDigma({
      action: actions.GO_TO_ERROR,
      payload: {
        errorId
      }
    });
  };

  const handleErrorsExpandButtonClick = () => {
    window.sendMessageToDigma({
      action: actions.GO_TO_ERRORS
    });
  };

  const handleHistogramButtonClick = (
    instrumentationLibrary: string,
    name: string,
    insightType: InsightType,
    displayName: string
  ) => {
    window.sendMessageToDigma({
      action: actions.OPEN_HISTOGRAM,
      payload: {
        instrumentationLibrary,
        name,
        insightType,
        displayName
      }
    });
  };

  const handleLiveButtonClick = (prefixedCodeObjectId: string) => {
    window.sendMessageToDigma({
      action: actions.OPEN_LIVE_VIEW,
      payload: {
        prefixedCodeObjectId
      }
    });
  };

  const handleTraceButtonClick = (
    trace: Trace,
    insightType: InsightType,
    spanCodeObjectId?: string
  ) => {
    window.sendMessageToDigma({
      action: actions.GO_TO_TRACE,
      payload: {
        trace,
        insightType,
        spanCodeObjectId
      }
    });
  };

  const handleCompareButtonClick = (
    traces: [Trace, Trace],
    insightType: InsightType
  ) => {
    window.sendMessageToDigma({
      action: actions.GO_TO_TRACE_COMPARISON,
      payload: {
        traces,
        insightType
      }
    });
  };

  const handleAssetLinkClick = (
    spanCodeObjectId: string,
    insightType: InsightType
  ) => {
    sendTrackingEvent(globalTrackingEvents.USER_ACTION, {
      action: `Follow ${insightType} link`
    });
    window.sendMessageToDigma({
      action: actions.GO_TO_ASSET,
      payload: {
        spanCodeObjectId
      }
    });
  };

  const handleRecalculate = (
    prefixedCodeObjectId: string,
    insightType: InsightType
  ) => {
    window.sendMessageToDigma({
      action: actions.RECALCULATE,
      payload: {
        prefixedCodeObjectId,
        insightType
      }
    });
  };

  if (isSpanDurationsInsight(insight)) {
    return (
      <DurationInsight
        key={insight.id}
        insight={insight}
        onHistogramButtonClick={handleHistogramButtonClick}
        onLiveButtonClick={handleLiveButtonClick}
        onCompareButtonClick={handleCompareButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
      />
    );
  }
  if (isSpanDurationBreakdownInsight(insight)) {
    return (
      <DurationBreakdownInsight
        key={insight.id}
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
      />
    );
  }
  if (isSpanUsagesInsight(insight)) {
    return (
      <TopUsageInsight
        key={insight.id}
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onTraceButtonClick={handleTraceButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
      />
    );
  }
  if (isSpanEndpointBottleneckInsight(insight)) {
    return (
      <BottleneckInsight
        key={insight.id}
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
        onJiraTicketCreate={onJiraTicketCreate}
        isJiraHintEnabled={isJiraHintEnabled}
      />
    );
  }
  if (isEndpointSlowestSpansInsight(insight)) {
    return (
      <SpanBottleneckInsight
        key={insight.id}
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
        onJiraTicketCreate={onJiraTicketCreate}
        isJiraHintEnabled={isJiraHintEnabled}
      />
    );
  }
  if (isSlowEndpointInsight(insight)) {
    return (
      <SlowEndpointInsight
        key={insight.id}
        insight={insight}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
      />
    );
  }
  if (
    isEndpointLowUsageInsight(insight) ||
    isEndpointNormalUsageInsight(insight) ||
    isEndpointHighUsageInsight(insight)
  ) {
    return (
      <TrafficInsight
        key={insight.id}
        insight={insight}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
      />
    );
  }
  if (isCodeObjectErrorsInsight(insight)) {
    return (
      <ErrorsInsight
        key={insight.id}
        insight={insight}
        onErrorSelect={handleErrorSelect}
        onExpandButtonClick={handleErrorsExpandButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
      />
    );
  }
  if (isEndpointSuspectedNPlusOneInsight(insight)) {
    return (
      <EndpointNPlusOneInsight
        key={insight.id}
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onTraceButtonClick={handleTraceButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
        onJiraTicketCreate={onJiraTicketCreate}
        isJiraHintEnabled={isJiraHintEnabled}
      />
    );
  }
  if (isSpanNPlusOneInsight(insight)) {
    return (
      <NPlusOneInsight
        key={insight.id}
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onTraceButtonClick={handleTraceButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
        onJiraTicketCreate={onJiraTicketCreate}
        isJiraHintEnabled={isJiraHintEnabled}
      />
    );
  }
  if (isSpanScalingBadlyInsight(insight)) {
    return (
      <ScalingIssueInsight
        key={insight.id}
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onTraceButtonClick={handleTraceButtonClick}
        onHistogramButtonClick={handleHistogramButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
        onJiraTicketCreate={onJiraTicketCreate}
        isJiraHintEnabled={isJiraHintEnabled}
      />
    );
  }
  if (isCodeObjectHotSpotInsight(insight)) {
    return (
      <InsightCard
        data={insight}
        content={
          <Description>
            Major errors occur or propagate through this function
          </Description>
        }
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
      />
    );
  }
  if (isEndpointDurationSlowdownInsight(insight)) {
    return (
      <DurationSlowdownSourceInsight
        key={insight.id}
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
      />
    );
  }

  if (isEndpointBreakdownInsight(insight)) {
    return (
      <RequestBreakdownInsight
        key={insight.id}
        insight={insight}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
      />
    );
  }

  if (isSpanScalingWellInsight(insight)) {
    return (
      <NoScalingIssueInsight
        key={insight.id}
        insight={insight}
        onHistogramButtonClick={handleHistogramButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
      />
    );
  }

  if (isSpanScalingInsufficientDataInsight(insight)) {
    return (
      <PerformanceAtScaleInsight
        key={insight.id}
        insight={insight}
        onHistogramButtonClick={handleHistogramButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
      />
    );
  }

  if (isSessionInViewEndpointInsight(insight)) {
    return (
      <SessionInViewInsight
        key={insight.id}
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onTraceButtonClick={handleTraceButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
      />
    );
  }

  if (isChattyApiEndpointInsight(insight)) {
    return (
      <ExcessiveAPICallsInsight
        key={insight.id}
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onTraceButtonClick={handleTraceButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
      />
    );
  }

  if (isEndpointHighNumberOfQueriesInsight(insight)) {
    return (
      <HighNumberOfQueriesInsight
        key={insight.id}
        insight={insight}
        onTraceButtonClick={handleTraceButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
        onJiraTicketCreate={onJiraTicketCreate}
        isJiraHintEnabled={isJiraHintEnabled}
      />
    );
  }

  if (isSpanNexusInsight(insight)) {
    return (
      <SpanNexusInsight
        key={insight.id}
        insight={insight}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
      />
    );
  }

  if (isSpanQueryOptimizationInsight(insight)) {
    return (
      <QueryOptimizationInsight
        key={insight.id}
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onTraceButtonClick={handleTraceButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
        onJiraTicketCreate={onJiraTicketCreate}
        isJiraHintEnabled={isJiraHintEnabled}
      />
    );
  }

  if (isEndpointQueryOptimizationInsight(insight)) {
    return (
      <EndpointQueryOptimizationInsight
        key={insight.id}
        insight={insight}
        onAssetLinkClick={handleAssetLinkClick}
        onTraceButtonClick={handleTraceButtonClick}
        onRecalculate={handleRecalculate}
        onRefresh={onRefresh}
        onJiraTicketCreate={onJiraTicketCreate}
      />
    );
  }
};

const IS_INSIGHT_JIRA_TICKET_HINT_SHOWN_PERSISTENCE_KEY =
  "isInsightJiraTicketHintShown";

export const InsightsPage = (props: InsightPageProps) => {
  const config = useContext(ConfigContext);
  const previousConfig = usePrevious(config);
  const [isInsightJiraTicketHintShown, setIsInsightJiraTicketHintShown] =
    usePersistence<isInsightJiraTicketHintShownPayload>(
      IS_INSIGHT_JIRA_TICKET_HINT_SHOWN_PERSISTENCE_KEY,
      "application"
    );
  const listRef = useRef<HTMLDivElement>(null);
  const previousPage = usePrevious(props.page);

  const insightIndexWithJiraHint = getInsightToShowJiraHint(props.insights);

  useEffect(() => {
    if (
      (isNumber(previousPage) && previousPage !== props.page) ||
      (previousConfig &&
        (previousConfig?.scope?.span !== config?.scope?.span ||
          previousConfig?.environment?.originalName !==
            config.environment?.originalName))
    ) {
      listRef.current?.scrollTo(0, 0);
    }
  }, [previousPage, props.page, config, previousConfig]);

  useEffect(() => {
    window.sendMessageToDigma({
      action: actions.MARK_INSIGHT_TYPES_AS_VIEWED,
      payload: {
        insightTypes: props.insights.map((x) => ({
          type: x.type,
          reopenCount: x.reopenCount
        }))
      }
    });
  }, [props.insights]);

  const handleShowJiraTicket = (
    insight: GenericCodeObjectInsight,
    spanCodeObjectId: string | undefined,
    event?: string
  ) => {
    props.onJiraTicketCreate(insight, spanCodeObjectId);
    if (!isInsightJiraTicketHintShown?.value) {
      sendTrackingEvent(trackingEvents.JIRA_TICKET_HINT_CLOSED, { event });
    }
    setIsInsightJiraTicketHintShown({ value: true });
  };

  const handleTroubleshootingLinkClick = () => {
    sendTrackingEvent(globalTrackingEvents.TROUBLESHOOTING_LINK_CLICKED, {
      origin: "insights"
    });

    window.sendMessageToDigma({
      action: globalActions.OPEN_TROUBLESHOOTING_GUIDE
    });
  };

  return (
    <s.Container ref={listRef}>
      {props.insights.length > 0 ? (
        props.insights.map((insight, j) => {
          return renderInsightCard(
            insight,
            handleShowJiraTicket,
            !isUndefined(isInsightJiraTicketHintShown) &&
              !isInsightJiraTicketHintShown?.value &&
              j === insightIndexWithJiraHint,
            props.onRefresh
          );
        })
      ) : props.isFilteringEnabled ? (
        <Card
          header={<>No data found</>}
          content={
            <Description>There are no insights for this criteria</Description>
          }
        />
      ) : config.scope?.span ? (
        <Card
          header={<>No data yet</>}
          content={
            <Description>
              No data received yet for this span, please trigger some actions
              using this code to see more insights.
            </Description>
          }
        />
      ) : (
        <EmptyState
          icon={CardsIcon}
          title={"No data yet"}
          content={
            <>
              <s.EmptyStateDescription>
                Trigger actions that call this application to learn more about
                its runtime behavior
              </s.EmptyStateDescription>
              <s.TroubleshootingLink onClick={handleTroubleshootingLinkClick}>
                Not seeing your application data?
              </s.TroubleshootingLink>
            </>
          }
        />
      )}
    </s.Container>
  );
};
