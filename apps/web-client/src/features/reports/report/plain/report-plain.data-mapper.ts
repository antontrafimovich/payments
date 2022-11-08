import { ReportConfigApi } from "../../reports.api-model";
import { ReportConfig } from "../../reports.model";

export const mapDmToReportConfig = (value: ReportConfig): ReportConfigApi => {
  return {
    title: value.title,
    start_date: value.startDate,
    end_date: value.endDate,
  };
};
