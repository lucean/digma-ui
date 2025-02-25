import { ReactNode } from "react";
import { ScopeSpan } from "../../../../../../common/App/types";
import { CardProps } from "../../../../../../common/v3/Card/types";
import { GenericCodeObjectInsight, InsightType } from "../../../../../types";

export interface InsightCardProps {
  insight: GenericCodeObjectInsight;
  content?: ReactNode;
  isAsync?: boolean;
  isActive?: boolean;
  onOpenHistogram?: (
    instrumentationLibrary: string,
    name: string,
    insightType: InsightType,
    displayName: string
  ) => void;
  onRecalculate: (insightId: string) => void;
  onRefresh: (insightType: InsightType, spanCodeObjectId?: string) => void;
  onPin?: (insightId: string) => void;
  onGoToLive?: () => void;
  onGoToTrace?: () => void;
  jiraTicketInfo?: {
    ticketLink?: string | null;
    isHintEnabled?: boolean;
    spanCodeObjectId?: string;
  };
  onJiraButtonClick?: (
    spanCodeObjectId: string | undefined,
    event: string
  ) => void;
  onGoToSpan: (spanCodeObjectId: string) => void;
  isMarkAsReadButtonEnabled: boolean;
}

export interface StyledInsightCardProps extends CardProps {
  $isDismissed?: boolean;
  $isRead?: boolean;
  $isReadable?: boolean;
}

export interface DismissResponsePayload {
  insightId: string;
  status: "success" | "failure";
  error?: string;
}

export interface UndismissResponsePayload {
  insightId: string;
  status: "success" | "failure";
  error?: string;
}

export interface MarkAsReadPayload {
  insightIds: string[];
}

export interface MarkAllAsReadPayload {
  scope: ScopeSpan | null;
}

export interface SetMarkAsReadResponsePayload {
  insightIds: string[];
  status: "success" | "failure";
  error?: string;
}

export interface SetMarkAllAsReadResponsePayload {
  scope: ScopeSpan | null;
  status: "success" | "failure";
  error?: string;
}
export interface InsightCardCommonProps {
  onRecalculate: (insightId: string) => void;
  onRefresh: (insightType: InsightType) => void;
  onJiraTicketCreate?: (
    insight: GenericCodeObjectInsight,
    spanCodeObjectId: string | undefined,
    event?: string
  ) => void;
  onGoToSpan: (spanCodeObjectId: string) => void;
  isJiraHintEnabled?: boolean;
  isMarkAsReadButtonEnabled: boolean;
}
