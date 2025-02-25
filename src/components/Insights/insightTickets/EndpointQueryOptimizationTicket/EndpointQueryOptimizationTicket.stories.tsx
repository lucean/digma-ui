import { Meta, StoryObj } from "@storybook/react";
import { EndpointQueryOptimizationInsightTicket } from ".";
import { mockedEndpointQueryOptimizationInsight } from "../../InsightsCatalog/InsightsPage/insightCards/EndpointQueryOptimizationInsightCard/mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof EndpointQueryOptimizationInsightTicket> = {
  title: "Insights/insightTickets/EndpointQueryOptimizationInsightTicket",
  component: EndpointQueryOptimizationInsightTicket,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: {
      insight: mockedEndpointQueryOptimizationInsight,
      spanCodeObjectId:
        mockedEndpointQueryOptimizationInsight.spans[0].spanInfo
          .spanCodeObjectId
    }
  }
};
