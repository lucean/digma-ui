import { useContext } from "react";
import { usePagination } from "../../../../../../hooks/usePagination";
import { InsightType } from "../../../../../../types";
import { ConfigContext } from "../../../../../common/App/ConfigContext";
import { Pagination } from "../../../../../common/Pagination";
import { Tooltip } from "../../../../../common/Tooltip";
import { CrosshairIcon } from "../../../../../common/icons/CrosshairIcon";
import { Description, Link } from "../../../../styles";
import { Trace } from "../../../../types";
import { InsightCard } from "../../InsightCard";
import * as s from "./styles";
import { SessionInViewInsightProps } from "./types";

const PAGE_SIZE = 3;

/**
 * @deprecated
 */
export const SessionInViewInsight = (props: SessionInViewInsightProps) => {
  const config = useContext(ConfigContext);

  const [pageItems, page, setPage] = usePagination(
    props.insight.spans,
    PAGE_SIZE,
    props.insight.codeObjectId
  );

  const handleLinkClick = (spanCodeObjectId: string) => {
    props.onAssetLinkClick(spanCodeObjectId, props.insight.type);
  };

  const handleTraceButtonClick = (
    trace: Trace,
    insightType: InsightType,
    spanCodeObjectId: string
  ) => {
    props.onTraceButtonClick(trace, insightType, spanCodeObjectId);
  };

  return (
    <InsightCard
      data={props.insight}
      spanInfo={props.insight.spanInfo}
      content={
        <s.ContentContainer>
          <Description>
            Query execution was detected during the view rendering.
          </Description>
          <s.List>
            {pageItems.map((span) => {
              const spanName = span.renderSpan.displayName;
              const traceId = span.traceId;
              const spanCodeObjectId = span.renderSpan.spanCodeObjectId;

              return (
                <s.Span key={spanCodeObjectId}>
                  <Tooltip title={spanName}>
                    <s.SpanName>
                      <Link onClick={() => handleLinkClick(spanCodeObjectId)}>
                        {spanName}
                      </Link>
                    </s.SpanName>
                  </Tooltip>
                  {config.isJaegerEnabled && traceId && (
                    <s.Button
                      icon={{ component: CrosshairIcon }}
                      onClick={() =>
                        handleTraceButtonClick(
                          {
                            name: spanName,
                            id: traceId
                          },
                          props.insight.type,
                          spanCodeObjectId
                        )
                      }
                    >
                      Trace
                    </s.Button>
                  )}
                </s.Span>
              );
            })}
            <Pagination
              itemsCount={props.insight.spans.length}
              page={page}
              pageSize={PAGE_SIZE}
              onPageChange={setPage}
            />
          </s.List>
        </s.ContentContainer>
      }
      onRecalculate={props.onRecalculate}
      onRefresh={props.onRefresh}
    />
  );
};
