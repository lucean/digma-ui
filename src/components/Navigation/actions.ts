import { addPrefix } from "../../utils/addPrefix";

const ACTION_PREFIX = "NAVIGATION";

export const actions = addPrefix(ACTION_PREFIX, {
  INITIALIZE: "INITIALIZE",
  CHANGE_VIEW: "CHANGE_VIEW",
  SET_VIEWS: "SET_VIEWS",
  CHANGE_ENVIRONMENT: "CHANGE_ENVIRONMENT",
  CHANGE_SCOPE: "CHANGE_SCOPE",
  SET_CODE_CONTEXT: "SET_CODE_CONTEXT",
  GO_TO_CODE_LOCATION: "GO_TO_CODE_LOCATION",
  AUTOFIX_MISSING_DEPENDENCY: "AUTOFIX_MISSING_DEPENDENCY",
  SET_AUTOFIX_MISSING_DEPENDENCY_RESULT:
    "SET_AUTOFIX_MISSING_DEPENDENCY_RESULT",
  ADD_ANNOTATION: "ADD_ANNOTATION",
  SET_ADD_ANNOTATION_RESULT: "SET_ADD_ANNOTATION_RESULT",
  HIGHLIGHT_METHOD_IN_EDITOR: "HIGHLIGHT_METHOD_IN_EDITOR",
  CLEAR_HIGHLIGHTS_IN_EDITOR: "CLEAR_HIGHLIGHTS_IN_EDITOR"
});
