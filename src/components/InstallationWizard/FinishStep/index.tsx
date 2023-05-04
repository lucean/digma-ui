import { DefaultTheme, useTheme } from "styled-components";
import { getThemeKind } from "../../common/App/styles";
import { CircleLoader } from "../../common/CircleLoader";
import { BellIcon } from "../../common/icons/BellIcon";
import { ChatIcon } from "../../common/icons/ChatIcon";
import { CheckmarkCircleInvertedIcon } from "../../common/icons/CheckmarkCircleInvertedIcon";
import { GearIcon } from "../../common/icons/GearIcon";
import { PlayIcon } from "../../common/icons/PlayIcon";
import { SlackLogoIcon } from "../../common/icons/SlackLogoIcon";
import { WarningCircleLargeIcon } from "../../common/icons/WarningCircleLargeIcon";
import { Link } from "../styles";
import * as s from "./styles";
import { FinishStepProps } from "./types";

const EMAIL_ERROR_MESSAGE = "Enter a valid email";

const getPlayIconColor = (theme: DefaultTheme) => {
  switch (theme.mode) {
    case "light":
      return "#3538cd";
    case "dark":
    case "dark-jetbrains":
      return "#dadada";
  }
};

const getErrorIconColor = (theme: DefaultTheme) => {
  switch (theme.mode) {
    case "light":
      return "#e00036";
    case "dark":
    case "dark-jetbrains":
      return "#f93967";
  }
};

export const FinishStep = (props: FinishStepProps) => {
  const theme = useTheme();
  const themeKind = getThemeKind(theme);

  return (
    <s.Container>
      {props.quickstartURL && (
        <>
          <s.SectionTitle icon={GearIcon}>Instrument your code</s.SectionTitle>
          <s.SectionDescription>
            Follow our{" "}
            <Link
              target={"_blank"}
              rel={"noopener noreferrer"}
              href={props.quickstartURL}
            >
              quickstart
            </Link>{" "}
            guide to begin collecting data from your code
          </s.SectionDescription>
        </>
      )}
      <s.SectionTitle icon={BellIcon}>
        Stay up to date<s.SectionTitleNote>(optional)</s.SectionTitleNote>
      </s.SectionTitle>
      <s.SectionDescription>
        Enter your E-mail address to be the first to get Digma updates
      </s.SectionDescription>
      <s.EmailField>
        <s.EmailInput
          type={"text"}
          placeholder={"Enter E-mail"}
          value={props.email}
          onChange={props.onEmailInputChange}
        />
        {props.isEmailValid === false && (
          <s.ErrorMessage>
            <WarningCircleLargeIcon color={getErrorIconColor(theme)} />
            {EMAIL_ERROR_MESSAGE}
          </s.ErrorMessage>
        )}
        {props.isEmailValid && (
          <s.EmailInputIconContainer>
            <CheckmarkCircleInvertedIcon color={"#00c108"} size={16} />
          </s.EmailInputIconContainer>
        )}
        {props.isEmailValidating && (
          <s.EmailInputIconContainer>
            <CircleLoader
              size={16}
              colors={{
                start: "rgba(53, 56, 205, 0.3)",
                end: "#fff",
                background: "#252526"
              }}
            />
          </s.EmailInputIconContainer>
        )}
      </s.EmailField>
      <s.SectionTitle icon={PlayIcon}>
        Run / Debug your application
      </s.SectionTitle>
      <s.SectionDescription>
        Run or debug your application and trigger some actions or APIs to
        collect observability.
      </s.SectionDescription>
      <s.IllustrationContainer>
        <s.RunOrDebugIllustration src={`/images/runOrDebug_${themeKind}.gif`} />
      </s.IllustrationContainer>
      <s.SectionTitle>Getting started</s.SectionTitle>
      <s.SectionDescription>
        We&apos;ve prepared a short video to show you the ropes on getting
        started analyzing your code with Digma.
      </s.SectionDescription>
      <Link
        href={"https://www.youtube.com/watch?v=jzBEXfCrnlg"}
        target={"_blank"}
        rel={"noopener noreferrer"}
      >
        <s.IllustrationContainer>
          <s.PlayIconContainer>
            <s.ThumbnailPlayCircleIcon color={getPlayIconColor(theme)} />
          </s.PlayIconContainer>
          <s.GettingStartedVideoThumbnail
            src={`/images/gettingStartedVideoThumbnail_${themeKind}.png`}
          />
        </s.IllustrationContainer>
      </Link>
      <s.GiveUsFeedbackTitle icon={ChatIcon}>
        Give us feedback
      </s.GiveUsFeedbackTitle>
      <s.SlackLink
        target={"_blank"}
        rel={"noopener noreferrer"}
        href={props.slackChannelURL}
      >
        <SlackLogoIcon />
        Join Our Slack Channel
      </s.SlackLink>
    </s.Container>
  );
};
