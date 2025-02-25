import { InsightStatus, InsightType } from "../../../../Insights/types";
import { HighlightData, SpanQueryOptimizationMetrics } from "../../types";

export const mockedSpanQueryOptimizationMetrics: SpanQueryOptimizationMetrics =
  [
    { id: "AffectedEndpoints", value: 50 },
    {
      id: "Duration",
      value: {
        value: 22.71,
        unit: "ms",
        raw: 22705900.0
      }
    },
    {
      id: "TypicalDuration",
      value: {
        value: 22.71,
        unit: "ms",
        raw: 22705900.0
      }
    },
    {
      id: "Database",
      value: "databaseName"
    }
  ];

export const mockedSpanQueryOptimizationHighlightData: HighlightData<SpanQueryOptimizationMetrics> =
  {
    insightType: InsightType.EndpointBottleneck,
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
        metrics: mockedSpanQueryOptimizationMetrics
      },
      {
        environmentName: "Staging",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedSpanQueryOptimizationMetrics
      },
      {
        environmentName: "Production",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedSpanQueryOptimizationMetrics
      },
      {
        environmentName: "Env1",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedSpanQueryOptimizationMetrics
      },
      {
        environmentName: "Env2",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedSpanQueryOptimizationMetrics
      },
      {
        environmentName: "Env3",
        insightStatus: InsightStatus.Active,
        criticality: 0.8,
        metrics: mockedSpanQueryOptimizationMetrics
      }
    ]
  };
