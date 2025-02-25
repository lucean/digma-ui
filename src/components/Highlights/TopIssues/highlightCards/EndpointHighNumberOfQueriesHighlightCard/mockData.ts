import { InsightStatus, InsightType } from "../../../../Insights/types";
import { EndpointHighNumberOfQueriesMetrics, HighlightData } from "../../types";

export const mockedEndpointHighNumberOfQueriesMetrics: EndpointHighNumberOfQueriesMetrics =
  [
    {
      id: "QueriesCount",
      value: 50
    },
    {
      id: "TypicalQueriesCount",
      value: 10
    }
  ];

export const mockedEndpointHighNumberOfQueriesHighlightData: HighlightData<EndpointHighNumberOfQueriesMetrics> =
  {
    insightType: InsightType.EndpointHighNumberOfQueries,
    asset: {
      name: "spanName",
      displayName: "displayName",
      instrumentationLibrary: "instrumentationLibrary",
      spanCodeObjectId: "spanCodeObjectId",
      methodCodeObjectId: "methodCodeObjectId",
      kind: "kind",
      codeObjectId: null
    },
    environments: [
      {
        environmentName: "Dev",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedEndpointHighNumberOfQueriesMetrics
      },
      {
        environmentName: "Staging",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedEndpointHighNumberOfQueriesMetrics
      },
      {
        environmentName: "Production",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedEndpointHighNumberOfQueriesMetrics
      },
      {
        environmentName: "Env1",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedEndpointHighNumberOfQueriesMetrics
      },
      {
        environmentName: "Env2",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedEndpointHighNumberOfQueriesMetrics
      },
      {
        environmentName: "Env3",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedEndpointHighNumberOfQueriesMetrics
      }
    ]
  };
