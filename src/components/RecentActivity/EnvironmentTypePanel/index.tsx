import { useContext } from "react";
import { openURLInDefaultBrowser } from "../../../utils/actions/openURLInDefaultBrowser";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { ConfigContext } from "../../common/App/ConfigContext";
import { DeploymentType, EnvironmentType } from "../../common/App/types";
import { IconTag } from "../../common/IconTag";
import { NewButton } from "../../common/NewButton";
import { CodeIcon } from "../../common/icons/16px/CodeIcon";
import { InfinityIcon } from "../../common/icons/InfinityIcon";
import { trackingEvents } from "../tracking";
import * as s from "./styles";
import { EnvironmentTypeData, EnvironmentTypePanelProps } from "./types";

const DIGMA_FOR_TEAMS_URL = "https://digma.ai/digma-for-teams/";

export const EnvironmentTypePanel = (props: EnvironmentTypePanelProps) => {
  const config = useContext(ConfigContext);
  const isHelmDeployment =
    config.backendInfo?.deploymentType === DeploymentType.HELM;

  const handleEnvironmentTypeButtonClick = (type: EnvironmentType) => {
    const typeData = environmentTypes.find((x) => x.type === type);

    if (typeData) {
      sendUserActionTrackingEvent(
        trackingEvents.ENVIRONMENT_TYPE_BUTTON_CLICKED,
        {
          type: typeData.title
        }
      );
    }

    if (type === "shared" && !isHelmDeployment) {
      openURLInDefaultBrowser(DIGMA_FOR_TEAMS_URL);
      return;
    }

    props.onEnvironmentTypeSelect(props.environment.originalName, type);
  };

  const environmentTypes: EnvironmentTypeData[] = [
    {
      type: "local",
      title: "Local environment",
      description:
        "Define an environment for specific branches, types of tests or other criteria",
      icon: CodeIcon,
      button: (
        <NewButton
          onClick={() => handleEnvironmentTypeButtonClick("local")}
          label={"Add"}
          buttonType={"primary"}
          size={"large"}
        />
      )
    },
    {
      type: "shared",
      title: "CI/Prod environment",
      description:
        "Connect to centralized org systems such as CI builds, production servers etc.",
      icon: InfinityIcon,
      button: (
        <NewButton
          onClick={() => handleEnvironmentTypeButtonClick("shared")}
          label={isHelmDeployment ? "Add" : "Learn more"}
          buttonType={"secondary"}
          size={"large"}
        />
      )
    }
  ];

  return (
    <s.Container>
      <s.Title>Choose environment type</s.Title>
      <s.Subtitle>
        Choose which environment type you would like to create
      </s.Subtitle>
      <s.ContentContainer>
        {environmentTypes.map((x) => (
          <s.EnvironmentTypeCard key={x.type}>
            <IconTag icon={x.icon} size={"large"} />
            <s.EnvironmentTypeTextContainer>
              <s.EnvironmentTypeTitle>{x.title}</s.EnvironmentTypeTitle>
              {x.description}
            </s.EnvironmentTypeTextContainer>
            {x.button}
          </s.EnvironmentTypeCard>
        ))}
      </s.ContentContainer>
    </s.Container>
  );
};
