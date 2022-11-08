import { ReportConfigApi } from "../reports.api-model";
import { ReportConfig } from "../reports.model";

export const mapReportConfigApiToDm = (
  config: ReportConfigApi
): ReportConfig => {
  return {
    title: config.title,
    startDate: config.start_date,
    endDate: config.end_date,
  };
};
