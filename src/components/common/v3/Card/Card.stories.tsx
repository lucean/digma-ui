import { Meta, StoryObj } from "@storybook/react";
import { Card } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Card> = {
  title: "Common/v3/Card",
  component: Card,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    footer: <div>Hover me</div>,
    content: <div>Hover me</div>,
    header: <div>Hover me</div>
  }
};

export const OnlyContent: Story = {
  args: {
    content: <div>Hover me</div>
  }
};
