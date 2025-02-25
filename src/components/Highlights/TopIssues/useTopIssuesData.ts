import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { dispatcher } from "../../../dispatcher";
import { usePrevious } from "../../../hooks/usePrevious";
import { actions as mainActions } from "../../Main/actions";
import { GetHighlightsTopIssuesDataPayload } from "../../Main/types";
import { ConfigContext } from "../../common/App/ConfigContext";
import { TopIssuesData } from "./types";
const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

export const useTopIssuesData = () => {
  const [data, setData] = useState<TopIssuesData>();
  const config = useContext(ConfigContext);
  const [lastSetDataTimeStamp, setLastSetDataTimeStamp] = useState<number>();
  const previousLastSetDataTimeStamp = usePrevious(lastSetDataTimeStamp);
  const refreshTimerId = useRef<number>();

  const getData = useCallback(() => {
    window.sendMessageToDigma<GetHighlightsTopIssuesDataPayload>({
      action: mainActions.GET_HIGHLIGHTS_TOP_ISSUES_DATA,
      payload: {
        query: {
          scopedCodeObjectId: config.scope?.span?.spanCodeObjectId || null,
          environments:
            config.environments?.map((env) => env.originalName) || []
        }
      }
    });
  }, [config.scope?.span?.spanCodeObjectId, config.environments]);
  const previousGetData = usePrevious(getData);

  useEffect(() => {
    if (previousGetData && previousGetData !== getData) {
      window.clearTimeout(refreshTimerId.current);

      getData();
    }
  }, [previousGetData, getData]);

  useEffect(() => {
    if (
      previousLastSetDataTimeStamp &&
      previousLastSetDataTimeStamp !== lastSetDataTimeStamp
    ) {
      refreshTimerId.current = window.setTimeout(() => {
        getData();
      }, REFRESH_INTERVAL);
    }
  }, [previousLastSetDataTimeStamp, lastSetDataTimeStamp, getData]);

  useEffect(() => {
    const handleTopIssuesData = (data: any, timeStamp: number) => {
      setData(data as TopIssuesData);
      setLastSetDataTimeStamp(timeStamp);
    };

    dispatcher.addActionListener(
      mainActions.SET_HIGHLIGHTS_TOP_ISSUES_DATA,
      handleTopIssuesData
    );

    return () => {
      dispatcher.removeActionListener(
        mainActions.SET_HIGHLIGHTS_TOP_ISSUES_DATA,
        handleTopIssuesData
      );
    };
  }, []);

  return {
    data,
    getData
  };
};
