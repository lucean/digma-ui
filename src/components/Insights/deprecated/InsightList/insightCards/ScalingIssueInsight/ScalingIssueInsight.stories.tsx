import { Meta, StoryObj } from "@storybook/react";
import { ScalingIssueInsight } from ".";
import {
  mockedSpanScalingInsight,
  ofDbSpan,
  withAffectedEndpoints,
  withRootCause
} from "./mockData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ScalingIssueInsight> = {
  title: "Insights/deprecated/InsightList/insightCards/ScalingIssueInsight",
  component: ScalingIssueInsight,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Minimal: Story = {
  args: {
    insight: mockedSpanScalingInsight
  }
};

export const Story2: Story = {
  name: "Endpoint + Root Cause",
  args: {
    insight: { ...mockedSpanScalingInsight, ...withRootCause }
  }
};

export const Story3: Story = {
  name: "DB Span + Affected Endpoint",
  args: {
    insight: {
      ...mockedSpanScalingInsight,
      ...ofDbSpan,
      ...withAffectedEndpoints
    }
  }
};

export const Story4: Story = {
  name: "DB Span + Affected Endpoint + Root Cause",
  args: {
    insight: {
      ...mockedSpanScalingInsight,
      ...ofDbSpan,
      ...withAffectedEndpoints,
      ...withRootCause
    }
  }
};
