// name: "HTTP POST Transfer/TransferFunds",
// spanCodeObjectId:
//   "span:OpenTelemetry.Instrumentation.AspNetCore$_$HTTP POST Transfer/TransferFunds",

import { Meta, StoryObj } from "@storybook/react";
import { Notifications } from ".";
import { InsightType } from "../../types";
import { InsightScope } from "../Insights/types";
import { Notification } from "./types";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Notifications> = {
  title: "Notifications/Notifications",
  component: Notifications,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

const notifications: Notification[] = [
  {
    notificationId: "1",
    accountId: "1",
    environment: "env",
    title: "Title",
    message: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    type: "NewInsight",
    data: {
      insightType: InsightType.HotSpot,
      scope: InsightScope.Function,
      codeObjectId:
        "Sample.MoneyTransfer.API.Domain.Services.MoneyTransferDomainService$_$TransferFunds(Int64,Int64,Int32)"
    },
    isRead: false,
    timestamp: "2023-01-07T12:59:21.794Z"
  },
  {
    notificationId: "2",
    accountId: "1",
    environment: "env",
    title: "Title",
    message: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    type: "NewInsight",
    data: {
      insightType: InsightType.EndpointSpaNPlusOne,
      scope: InsightScope.EntrySpan,
      spanInfo: {
        name: "HTTP GET /SampleInsights/NPlusOneWithoutInternalSpan",
        displayName: "HTTP GET /SampleInsights/NPlusOneWithoutInternalSpan",
        instrumentationLibrary: "io.opentelemetry.tomcat-10.0",
        spanCodeObjectId:
          "span:io.opentelemetry.tomcat-10.0$_$HTTP GET /SampleInsights/NPlusOneWithoutInternalSpan",
        methodCodeObjectId:
          "method:org.springframework.samples.petclinic.sample.SampleInsightsController$_$genNPlusOneWithoutInternalSpan",
        kind: "Server",
        codeObjectId:
          "org.springframework.samples.petclinic.sample.SampleInsightsController$_$genNPlusOneWithoutInternalSpan"
      },
      codeObjectId:
        "org.springframework.samples.petclinic.sample.SampleInsightsController$_$genNPlusOneWithoutInternalSpan"
    },
    isRead: true,
    timestamp: "2023-01-07T12:59:21.794Z"
  },
  {
    notificationId: "3",
    accountId: "1",
    environment: "env",
    title: "Title",
    message: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    type: "NewInsight",
    data: {
      insightType: InsightType.SpanEndpointBottleneck,
      scope: InsightScope.Span,
      spanInfo: {
        name: "WaitForLock",
        displayName: "WaitForLock",
        instrumentationLibrary: "SampleInsightsController",
        spanCodeObjectId: "span:SampleInsightsController$_$WaitForLock",
        methodCodeObjectId: null,
        kind: null,
        codeObjectId: null
      },
      codeObjectId: "SampleInsightsController$_$WaitForLock"
    },
    isRead: true,
    timestamp: "2023-01-07T12:59:21.794Z"
  },
  {
    notificationId: "4",
    accountId: "1",
    environment: "env",
    title: "Title",
    message: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    type: "NewInsight",
    data: {
      insightType: InsightType.SpanEndpointBottleneck,
      scope: InsightScope.Span,
      spanInfo: {
        name: "WaitForLock",
        displayName: "WaitForLock",
        instrumentationLibrary: "SampleInsightsController",
        spanCodeObjectId: "span:SampleInsightsController$_$WaitForLock",
        methodCodeObjectId: null,
        kind: null,
        codeObjectId: null
      },
      codeObjectId: "SampleInsightsController$_$WaitForLock"
    },
    isRead: true,
    timestamp: "2023-01-07T12:59:21.794Z"
  },
  {
    notificationId: "5",
    accountId: "1",
    environment: "env",
    title: "Title",
    message: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    type: "NewInsight",
    data: {
      insightType: InsightType.SpanEndpointBottleneck,
      scope: InsightScope.Span,
      spanInfo: {
        name: "WaitForLock",
        displayName: "WaitForLock",
        instrumentationLibrary: "SampleInsightsController",
        spanCodeObjectId: "span:SampleInsightsController$_$WaitForLock",
        methodCodeObjectId: null,
        kind: null,
        codeObjectId: null
      },
      codeObjectId: "SampleInsightsController$_$WaitForLock"
    },
    isRead: true,
    timestamp: "2023-01-07T12:59:21.794Z"
  },
  {
    notificationId: "6",
    accountId: "1",
    environment: "env",
    title: "Title",
    message: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    type: "NewInsight",
    data: {
      insightType: InsightType.SpanEndpointBottleneck,
      scope: InsightScope.Span,
      spanInfo: {
        name: "WaitForLock",
        displayName: "WaitForLock",
        instrumentationLibrary: "SampleInsightsController",
        spanCodeObjectId: "span:SampleInsightsController$_$WaitForLock",
        methodCodeObjectId: null,
        kind: null,
        codeObjectId: null
      },
      codeObjectId: "SampleInsightsController$_$WaitForLock"
    },
    isRead: true,
    timestamp: "2023-01-07T12:59:21.794Z"
  },
  {
    notificationId: "7",
    accountId: "1",
    environment: "env",
    title: "Title",
    message: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    type: "NewInsight",
    data: {
      insightType: InsightType.SpanEndpointBottleneck,
      scope: InsightScope.Span,
      spanInfo: {
        name: "WaitForLock",
        displayName: "WaitForLock",
        instrumentationLibrary: "SampleInsightsController",
        spanCodeObjectId: "span:SampleInsightsController$_$WaitForLock",
        methodCodeObjectId: null,
        kind: null,
        codeObjectId: null
      },
      codeObjectId: "SampleInsightsController$_$WaitForLock"
    },
    isRead: true,
    timestamp: "2023-01-07T12:59:21.794Z"
  },
  {
    notificationId: "8",
    accountId: "1",
    environment: "env",
    title: "Title",
    message: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    type: "NewInsight",
    data: {
      insightType: InsightType.SpanEndpointBottleneck,
      scope: InsightScope.Span,
      spanInfo: {
        name: "WaitForLock",
        displayName: "WaitForLock",
        instrumentationLibrary: "SampleInsightsController",
        spanCodeObjectId: "span:SampleInsightsController$_$WaitForLock",
        methodCodeObjectId: null,
        kind: null,
        codeObjectId: null
      },
      codeObjectId: "SampleInsightsController$_$WaitForLock"
    },
    isRead: true,
    timestamp: "2023-01-07T12:59:21.794Z"
  },
  {
    notificationId: "9",
    accountId: "1",
    environment: "env",
    title: "Title",
    message: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    type: "NewInsight",
    data: {
      insightType: InsightType.SpanEndpointBottleneck,
      scope: InsightScope.Span,
      spanInfo: {
        name: "WaitForLock",
        displayName: "WaitForLock",
        instrumentationLibrary: "SampleInsightsController",
        spanCodeObjectId: "span:SampleInsightsController$_$WaitForLock",
        methodCodeObjectId: null,
        kind: null,
        codeObjectId: null
      },
      codeObjectId: "SampleInsightsController$_$WaitForLock"
    },
    isRead: true,
    timestamp: "2023-01-07T12:59:21.794Z"
  },
  {
    notificationId: "10",
    accountId: "1",
    environment: "env",
    title: "Title",
    message: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    type: "NewInsight",
    data: {
      insightType: InsightType.SpanEndpointBottleneck,
      scope: InsightScope.Span,
      spanInfo: {
        name: "WaitForLock",
        displayName: "WaitForLock",
        instrumentationLibrary: "SampleInsightsController",
        spanCodeObjectId: "span:SampleInsightsController$_$WaitForLock",
        methodCodeObjectId: null,
        kind: null,
        codeObjectId: null
      },
      codeObjectId: "SampleInsightsController$_$WaitForLock"
    },
    isRead: true,
    timestamp: "2023-01-07T12:59:21.794Z"
  },
  {
    notificationId: "11",
    accountId: "1",
    environment: "env",
    title: "Title",
    message: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    type: "NewInsight",
    data: {
      insightType: InsightType.SpanEndpointBottleneck,
      scope: InsightScope.Span,
      spanInfo: {
        name: "WaitForLock",
        displayName: "WaitForLock",
        instrumentationLibrary: "SampleInsightsController",
        spanCodeObjectId: "span:SampleInsightsController$_$WaitForLock",
        methodCodeObjectId: null,
        kind: null,
        codeObjectId: null
      },
      codeObjectId: "SampleInsightsController$_$WaitForLock"
    },
    isRead: true,
    timestamp: "2023-01-07T12:59:21.794Z"
  }
];

export const NoDataRecent: Story = {
  args: {
    data: {
      data: {
        notifications: [],
        totalCount: 0,
        unreadCount: 0
      },
      error: null
    },
    viewMode: "popup"
  }
};

export const RecentWithError: Story = {
  args: {
    data: {
      data: null,
      error: {
        message: "error message"
      }
    },
    viewMode: "popup"
  }
};

export const Recent: Story = {
  args: {
    data: {
      data: {
        notifications: notifications.slice(0, 3),
        totalCount: 3,
        unreadCount: 1
      },
      error: null
    },
    viewMode: "popup"
  }
};

export const NoDataFull: Story = {
  args: {
    data: {
      data: {
        notifications: [],
        totalCount: 0,
        unreadCount: 0
      },
      error: null
    },
    viewMode: "full"
  }
};

export const Full: Story = {
  args: {
    data: {
      data: {
        notifications,
        totalCount: 12,
        unreadCount: 1
      },
      error: null
    },
    viewMode: "full"
  }
};

export const FullWithError: Story = {
  args: {
    data: {
      data: null,
      error: {
        message: "error message"
      }
    },
    viewMode: "full"
  }
};
