import { useContext } from "react";
import { actions as globalActions } from "../../../actions";
import { OpenInstallationWizardPayload } from "../../../types";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { isDigmaEngineRunning } from "../../../utils/isDigmaEngineRunning";
import { ConfigContext } from "../../common/App/ConfigContext";
import { DigmaLogoFlatIcon } from "../../common/icons/16px/DigmaLogoFlatIcon";
import { FourPointedStarIcon } from "../../common/icons/16px/FourPointedStarIcon";
import { LocalEngineIcon } from "../../common/icons/LocalEngineIcon";
import { MenuList } from "../common/MenuList";
import { Popup } from "../common/Popup";
import { trackingEvents } from "../tracking";
import { OpenDocumentationPayload } from "../types";
import { KebabMenuProps } from "./types";

export const KebabMenu = (props: KebabMenuProps) => {
  const config = useContext(ConfigContext);

  const handleOnboardingClick = () => {
    sendUserActionTrackingEvent(trackingEvents.ONBOARDING_LINK_CLICKED);
    window.sendMessageToDigma<OpenInstallationWizardPayload>({
      action: globalActions.OPEN_INSTALLATION_WIZARD,
      payload: {
        skipInstallationStep: true
      }
    });
    props.onClose();
  };

  const handleLocalEngineClick = () => {
    sendUserActionTrackingEvent(trackingEvents.LOCAL_ENGINE_LINK_CLICKED);
    window.sendMessageToDigma<OpenInstallationWizardPayload>({
      action: globalActions.OPEN_INSTALLATION_WIZARD,
      payload: {
        skipInstallationStep: false
      }
    });
    props.onClose();
  };

  const handleInsightsOverviewClick = () => {
    window.sendMessageToDigma<OpenDocumentationPayload>({
      action: globalActions.OPEN_DOCUMENTATION,
      payload: {
        page: "environment-types"
      }
    });
    props.onClose();
  };

  return (
    <Popup>
      <MenuList
        showGroupNames={false}
        showGroupDividers={true}
        items={[
          {
            id: "onboarding",
            label: "Digma Onboarding",
            icon: <DigmaLogoFlatIcon size={16} color={"currentColor"} />,
            onClick: handleOnboardingClick
          },
          {
            id: "localEngine",
            label: "Local Engine",
            icon: (
              <LocalEngineIcon
                size={16}
                isActive={isDigmaEngineRunning(config)}
              />
            ),
            onClick: handleLocalEngineClick
          },
          {
            id: "insightsOverview",
            label: "Insights Overview",
            icon: <FourPointedStarIcon size={16} color={"currentColor"} />,
            onClick: handleInsightsOverviewClick
          }
        ]}
      />
    </Popup>
  );
};
