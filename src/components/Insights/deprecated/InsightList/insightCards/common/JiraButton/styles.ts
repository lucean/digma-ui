import styled from "styled-components";
import { Button } from "../../../../../../common/Button";
import { NewButton } from "../../../../../../common/NewButton";

export const StyledButton = styled(Button)`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const HintContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 4px;
  width: 235px;
  color: ${({ theme }) => theme.colors.text.subtext};
  word-break: keep-all;
`;

export const HintHeader = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.base};
`;

export const HintIconContainer = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.icon.primary};
`;

export const TryNowButton = styled(NewButton)`
  margin-top: 8px;
  align-self: flex-end;
`;
