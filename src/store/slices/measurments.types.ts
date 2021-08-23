export interface IMeasurmentState {
  loading: boolean
  metrics: string[]
  allMetrics: string[]
  data: { [key: string]: any }
  infoMetrics: { [key: string]: number }
}

export interface IDataPayload {
  metric: string
  measurements: { metric: string, value: number, at: number, unit: string }[]
}