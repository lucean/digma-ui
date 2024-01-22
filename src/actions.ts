import { addPrefix } from "./utils/addPrefix";

const ACTION_PREFIX = "GLOBAL";

export const actions = addPrefix(ACTION_PREFIX, {
  SET_THEME: "SET_THEME",
  SET_MAIN_FONT: "SET_MAIN_FONT",
  SET_CODE_FONT: "SET_CODE_FONT",
  SET_JAEGER_URL: "SET_JAEGER_URL",
  SET_IS_JAEGER_ENABLED: "SET_IS_JAEGER_ENABLED",
  SET_IS_DIGMA_ENGINE_INSTALLED: "SET_IS_DIGMA_ENGINE_INSTALLED",
  SET_IS_DIGMA_ENGINE_RUNNING: "SET_IS_DIGMA_ENGINE_RUNNING",
  SET_DIGMA_STATUS: "SET_DIGMA_STATUS",
  SET_IS_DOCKER_INSTALLED: "SET_IS_DOCKER_INSTALLED",
  SET_IS_DOCKER_COMPOSE_INSTALLED: "SET_IS_DOCKER_COMPOSE_INSTALLED",
  OPEN_URL_IN_DEFAULT_BROWSER: "OPEN_URL_IN_DEFAULT_BROWSER",
  OPEN_URL_IN_EDITOR_TAB: "OPEN_URL_IN_EDITOR_TAB",
  SEND_TRACKING_EVENT: "SEND_TRACKING_EVENT",
  OPEN_TROUBLESHOOTING_GUIDE: "OPEN_TROUBLESHOOTING_GUIDE",
  OPEN_DOCUMENTATION: "OPEN_DOCUMENTATION",
  SET_DIGMA_API_URL: "SET_DIGMA_API_URL",
  SET_USER_REGISTRATION_EMAIL: "SET_USER_REGISTRATION_EMAIL",
  SET_ENVIRONMENT: "SET_ENVIRONMENT",
  SET_IS_OBSERVABILITY_ENABLED: "SET_IS_OBSERVABILITY_ENABLED",
  SET_OBSERVABILITY: "SET_OBSERVABILITY",
  GET_BACKEND_INFO: "GET_BACKEND_INFO",
  SET_BACKEND_INFO: "SET_BACKEND_INFO",
  REGISTER: "REGISTER",
  SET_IS_MICROMETER_PROJECT: "SET_IS_MICROMETER_PROJECT"
});
