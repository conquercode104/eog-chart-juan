declare module 'react-timeseries-charts' {
  export function styler(items: { key: string, color: string, selected: string });
  export const Charts: React.FunctionComponent<{}>;
  export const Resizable: React.FunctionComponent<{}>;
  export const ChartContainer: React.FunctionComponent<{
    timeRange?: Function | undefined
    onTrackerChanged?: Function
    trackerPosition: number | null
  }>;
  export const ChartRow: React.FunctionComponent<{
    height: number
    trackerShowTime: boolean
    trackerInfoValues: { s: string, value: string }[],
    trackerInfoHeight: number
    trackerInfoWidth: number
  }>;
  export const YAxis: React.FunctionComponent<{
    id: number
    label: string
    min: number
    max: number
    width: number
    type: string
  }>;
  export const LineChart: React.FunctionComponent<{
    style: any
    axis: any
    series: any[]
    column: string[]
  }>;
}