import copy from "copy-to-clipboard";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "styled-components";
import { DefaultTheme } from "styled-components/dist/types";
import { dispatcher } from "../../../dispatcher";
import { isString } from "../../../typeGuards/isString";
import { downloadFile } from "../../../utils/downloadFile";
import { isValidHttpUrl } from "../../../utils/isValidUrl";
import { sendTrackingEvent } from "../../../utils/sendTrackingEvent";
import { Button } from "../../common/Button";
import { CircleLoader } from "../../common/CircleLoader";
import { CircleLoaderColors } from "../../common/CircleLoader/types";
import { IconTag } from "../../common/IconTag";
import { Tooltip } from "../../common/Tooltip";
import { CopyIcon } from "../../common/icons/12px/CopyIcon";
import { CrossIcon } from "../../common/icons/12px/CrossIcon";
import { DownloadIcon } from "../../common/icons/12px/DownloadIcon";
import { PaperclipIcon } from "../../common/icons/12px/PaperclipIcon";
import { JiraLogoIcon } from "../../common/icons/16px/JiraLogoIcon";
import { actions } from "../actions";
import { trackingEvents } from "../tracking";
import { ActionableTextField } from "./ActionableTextField";
import { AttachmentTag } from "./AttachmentTag";
import { Field } from "./Field";
import { IconButton } from "./IconButton";
import * as s from "./styles";
import { JiraTicketProps, LinkTicketResponse } from "./types";

const getCircleLoaderColors = (theme: DefaultTheme): CircleLoaderColors => {
  switch (theme.mode) {
    case "light":
      return {
        start: "rgb(81 84 236 / 0%)",
        end: "#5154ec",
        background: "#fff"
      };
    case "dark":
    case "dark-jetbrains":
      return {
        start: "rgb(120 145 208 / 0%)",
        end: "#7891d0",
        background: "#222326"
      };
  }
};

export const JiraTicket = (props: JiraTicketProps) => {
  const [downloadErrorMessage, setDownloadErrorMessage] = useState<string>();
  const [ticketLink, setTicketLink] = useState<string | null>(
    props.relatedInsight?.ticketLink ?? props.insight.ticketLink
  );
  const [insightTicketLink, setInsightTicketLink] = useState<string | null>(
    props.relatedInsight?.ticketLink ?? props.insight.ticketLink
  );
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const descriptionContentRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  const handleCloseButtonClick = () => {
    props.onClose();
  };

  const copyToClipboard = (
    field: string,
    value: HTMLElement | null | string
  ) => {
    sendTrackingEvent(trackingEvents.JIRA_TICKET_FIELD_COPY_BUTTON_CLICKED, {
      insightType: props.insight.type,
      field
    });

    if (value === null) {
      return;
    }

    if (isString(value)) {
      copy(value);
    } else {
      copy(value.innerText);
    }
  };

  const handleDownloadButtonClick = () => {
    sendTrackingEvent(
      trackingEvents.JIRA_TICKET_ATTACHMENT_DOWNLOAD_BUTTON_CLICKED,
      {
        insightType: props.insight.type
      }
    );

    if (props.attachment) {
      downloadFile(props.attachment.url, props.attachment.fileName).catch(
        (e) => {
          const errorMessageString =
            e instanceof Error ? `Error: ${e.message}` : "";
          setDownloadErrorMessage(
            `Failed to download file.\n${errorMessageString}`
          );
        }
      );
    }
  };

  const linkTicket = () => {
    ticketLink && console.log(isValidHttpUrl(ticketLink));
    if (ticketLink && isValidHttpUrl(ticketLink)) {
      window.sendMessageToDigma({
        action: actions.LINK_TICKET,
        payload: {
          codeObjectId:
            props.relatedInsight?.codeObjectId ??
            props.insight.prefixedCodeObjectId,
          insightType: props.relatedInsight?.type ?? props.insight.type,
          ticketLink: ticketLink
        }
      });
    } else {
      setErrorMessage("");
    }
  };

  const unlinkTicket = () => {
    window.sendMessageToDigma({
      action: actions.UNLINK_TICKET,
      payload: {
        codeObjectId:
          props.relatedInsight?.codeObjectId ??
          props.insight.prefixedCodeObjectId,
        insightType: props.relatedInsight?.type ?? props.insight.type
      }
    });
  };

  const handleInsightTicketLink = (data: unknown) => {
    const linkTicketResponse = data as LinkTicketResponse;

    if (linkTicketResponse.success) {
      setInsightTicketLink(linkTicketResponse.ticketLink);
      setTicketLink(linkTicketResponse.ticketLink);
    } else {
      setErrorMessage(linkTicketResponse.message);
    }

    window.sendMessageToDigma({
      action: actions.GET_DATA
    });

    props.onReloadSpanInsight && props.onReloadSpanInsight();
  };

  dispatcher.addActionListener(
    actions.SET_TICKET_LINK,
    handleInsightTicketLink
  );

  const onTicketLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const ticketLink = event.target.value;
    setTicketLink(ticketLink);
    if (!ticketLink || isValidHttpUrl(ticketLink)) {
      setErrorMessage("");
    } else {
      setErrorMessage("Please enter a valid URL.");
    }
  };

  useEffect(() => {
    if (props.relatedInsight) {
      setTicketLink(props.relatedInsight.ticketLink);
      setInsightTicketLink(props.relatedInsight.ticketLink);
    }
  }, [props.relatedInsight]);

  return (
    <s.Container>
      <s.Header>
        <IconTag icon={JiraLogoIcon} size={"large"} />
        <s.TitleContainer>
          <s.Title>Create Jira Ticket</s.Title>
          Bug details
        </s.TitleContainer>
        <Tooltip title={"Close"}>
          <s.CloseButton onClick={handleCloseButtonClick}>
            <CrossIcon color={"currentColor"} />
          </s.CloseButton>
        </Tooltip>
      </s.Header>
      <Field
        key={"summary"}
        label={"Summary"}
        content={props.summary}
        button={
          <IconButton
            icon={CopyIcon}
            title={"Copy"}
            onClick={() => copyToClipboard("summary", props.summary)}
          />
        }
      />
      <Field
        key={"description"}
        label={"Description"}
        multiline={true}
        content={
          <div ref={descriptionContentRef}>
            {props.description.isLoading ? (
              <s.LoaderContainer>
                <CircleLoader size={32} colors={getCircleLoaderColors(theme)} />
              </s.LoaderContainer>
            ) : (
              props.description.content
            )}
          </div>
        }
        errorMessage={props.description.errorMessage}
        button={
          <IconButton
            icon={CopyIcon}
            title={"Copy"}
            disabled={props.description.isLoading}
            onClick={() =>
              copyToClipboard("description", descriptionContentRef.current)
            }
          />
        }
      />
      {props.attachment && (
        <Field
          key={"attachments"}
          label={"Attachments"}
          content={
            <AttachmentTag
              icon={PaperclipIcon}
              text={props.attachment.fileName}
            />
          }
          button={
            <IconButton
              icon={DownloadIcon}
              title={"Download"}
              onClick={handleDownloadButtonClick}
            />
          }
          errorMessage={downloadErrorMessage}
        />
      )}
      <ActionableTextField
        key="ticket-link"
        value={ticketLink}
        placeholder={
          "Paste your ticket URL here to link it with this Digma insight"
        }
        label={"Ticket URL"}
        onChange={onTicketLinkChange}
        disabled={!!insightTicketLink}
        errorMessage={errorMessage}
        buttons={
          insightTicketLink ? (
            <Button key={"unlink-ticket"} onClick={unlinkTicket}>
              Unlink
            </Button>
          ) : (
            <Button
              key={"link-ticket"}
              onClick={linkTicket}
              disabled={!ticketLink || !!errorMessage}
            >
              Link
            </Button>
          )
        }
      />
    </s.Container>
  );
};
