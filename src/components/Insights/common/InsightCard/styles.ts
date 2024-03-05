import styled from "styled-components";
import { subscriptRegularTypography } from "../../../common/App/typographies";

export const InsightFooter = styled.div`
  display: flex;
  justify-content: space-between;
  ${"" /* TODO: remove when Dismiss functionality is implemented */}
  min-height: 26px;
`;

export const Description = styled.div`
  ${subscriptRegularTypography}

  display: flex;
  gap: 8px;
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const RefreshContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Actions = styled.div`
  margin-left: auto;
  display: flex;
`;

export const MainActions = styled(Actions)`
  padding-left: 4px;
  gap: 4px;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
