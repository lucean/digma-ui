import { CodeDetails, Environment } from "../common/App/types";

export interface TabData {
  title: string;
  id: string;
  isSelected: boolean;
  isDisabled: boolean;
  hasNewData: boolean;
  isHidden: boolean;
  cardName: string;
}

export interface TabProps {
  $isSelected: boolean;
  $isDisabled: boolean;
}

export interface OpenDocumentationPayload {
  page: string;
}

export interface OpenDashboardPayload {
  environment?: Environment;
}

export interface ChangeScopePayload {
  scope: {
    span: {
      spanCodeObjectId: string;
      serviceName: string | null;
    } | null;
  };
}

export interface GoToCodeLocationPayload {
  codeDetails: CodeDetails;
}

export interface ChangeEnvironmentPayload {
  environment: Environment;
}

export interface ChangeViewPayload {
  view: string;
}

export interface SetViewsPayload {
  views: TabData[];
}

export interface AutofixMissingDependencyPayload {
  methodId: string;
}

export interface AddAnnotationPayload {
  methodId: string;
}

export interface CodeContext {
  spans: {
    spanCodeObjectId: string;
    displayName: string;
    serviceName: string | null;
  }[];
  isInstrumented: boolean | null;
  methodId: string | null;
  displayName: string;
  hasMissingDependency: boolean | null;
  canInstrumentMethod: boolean | null;
}
