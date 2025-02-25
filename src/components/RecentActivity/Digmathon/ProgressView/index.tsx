import { useEffect } from "react";
import { sendTrackingEvent } from "../../../../utils/actions/sendTrackingEvent";
import { trackingEvents } from "../../tracking";
import { DigmathonInsightCard } from "../DigmathonInsightCard";
import * as s from "./styles";
import { ProgressViewProps } from "./types";

export const ProgressView = ({ data, foundIssuesCount }: ProgressViewProps) => {
  useEffect(() => {
    sendTrackingEvent(trackingEvents.DIGMATHON_PROGRESS_VIEWED);
  }, []);

  if (foundIssuesCount === 0) {
    return (
      <s.EmptyStateContainer>
        <s.EmptyStateContentContainer>
          <img src="images/DigmoWithAmazonGiftCard.svg" />
          <s.EmptyStateTextContainer>
            <s.EmptyStateTitle>Start Digmathon</s.EmptyStateTitle>
            <span>
              To get started run your code with Digma and begin unlocking
              issues. Check back here to see your progress!
            </span>
          </s.EmptyStateTextContainer>
        </s.EmptyStateContentContainer>
      </s.EmptyStateContainer>
    );
  }

  return (
    <>
      <s.Header>
        <s.HeaderTitle>Search for issues</s.HeaderTitle>
        <s.HeaderDescription>
          Improve your code, and win a gift card
        </s.HeaderDescription>
        <s.IssuesCounter>
          <s.FoundIssuesNumber>{foundIssuesCount}</s.FoundIssuesNumber> out of{" "}
          {data.length} issues found
        </s.IssuesCounter>
      </s.Header>
      <s.CardsContainer>
        {data.map((x, i) =>
          x.data ? (
            <DigmathonInsightCard
              number={i + 1}
              data={x.data}
              key={x.type}
              isActive={x.isFound}
            />
          ) : null
        )}
      </s.CardsContainer>
    </>
  );
};
