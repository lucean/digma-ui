import { ReactElement, useEffect, useState } from "react";
import { dispatcher } from "../../../../dispatcher";
import { getCriticalityLabel } from "../../../../utils/getCriticalityLabel";
import { intersperse } from "../../../../utils/intersperse";
import { JiraTicket } from "../../JiraTicket";
import { actions } from "../../actions";
import { SpanEndpointBottleneckInsight } from "../../types";
import { BottleneckEndpoints } from "../common/BottleneckEndpoints";
import { CodeLocations } from "../common/CodeLocations";
import { CommitInfos } from "../common/CommitInfos";
import { DigmaSignature } from "../common/DigmaSignature";
import { getInsightCommits } from "../getInsightCommits";
import {
  CodeLocationsData,
  CommitInfosData,
  InsightTicketProps
} from "../types";

export const BottleneckInsightTicket = (
  props: InsightTicketProps<SpanEndpointBottleneckInsight>
) => {
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [codeLocations, setCodeLocations] = useState<string[]>([]);
  const [commitInfos, setCommitInfos] = useState<CommitInfosData>();

  const services = [
    ...new Set(
      props.data.insight.slowEndpoints.map((x) => x.endpointInfo.serviceName)
    )
  ];
  const serviceString = services.length > 0 ? services.join(", ") : "";

  const criticalityString =
    props.data.insight.criticality > 0
      ? `Criticality: ${getCriticalityLabel(props.data.insight.criticality)}`
      : "";

  const summary = ["Bottleneck found", serviceString, criticalityString]
    .filter(Boolean)
    .join(" - ");

  const renderDescription = () => (
    <>
      {intersperse<ReactElement, ReactElement>(
        [
          <BottleneckEndpoints
            key={"bottleneckEndpoints"}
            insight={props.data.insight}
          />,
          <CodeLocations key={"codeLocations"} codeLocations={codeLocations} />,
          <CommitInfos
            key={"commitInfos"}
            commitInfos={commitInfos}
            insight={props.data.insight}
          />,
          <DigmaSignature key={"digmaSignature"} />
        ],
        (i: number) => (
          <br key={`separator-${i}`} />
        )
      )}
    </>
  );

  useEffect(() => {
    const spanCodeObjectId = props.data.insight.spanInfo?.spanCodeObjectId;
    const methodCodeObjectId =
      props.data.insight.spanInfo?.methodCodeObjectId || undefined;

    setIsInitialLoading(true);

    window.sendMessageToDigma({
      action: actions.GET_CODE_LOCATIONS,
      payload: {
        spanCodeObjectId,
        methodCodeObjectId
      }
    });

    const commits = getInsightCommits(props.data.insight);

    if (commits.length > 0) {
      window.sendMessageToDigma({
        action: actions.GET_COMMIT_INFO,
        payload: {
          commits
        }
      });
    }

    const handleCodeLocationsData = (data: unknown) => {
      const codeLocationsData = data as CodeLocationsData;
      setCodeLocations(codeLocationsData.codeLocations);
    };

    const handleCommitInfosData = (data: unknown) => {
      const commitInfosData = data as CommitInfosData;
      setCommitInfos(commitInfosData);
    };

    dispatcher.addActionListener(
      actions.SET_CODE_LOCATIONS,
      handleCodeLocationsData
    );

    dispatcher.addActionListener(
      actions.SET_COMMIT_INFO,
      handleCommitInfosData
    );

    return () => {
      dispatcher.removeActionListener(
        actions.SET_CODE_LOCATIONS,
        handleCodeLocationsData
      );

      dispatcher.removeActionListener(
        actions.SET_COMMIT_INFO,
        handleCommitInfosData
      );
    };
  }, []);

  useEffect(() => {
    if (codeLocations) {
      const commits = getInsightCommits(props.data.insight);
      if (commits.length > 0) {
        if (commitInfos) {
          setIsInitialLoading(false);
        }
      } else {
        setIsInitialLoading(false);
      }
    }
  }, [codeLocations, props.data.insight, commitInfos]);

  return (
    <JiraTicket
      summary={summary}
      description={{
        content: renderDescription(),
        isLoading: isInitialLoading
      }}
      insight={props.data.insight}
      onClose={props.onClose}
    />
  );
};
