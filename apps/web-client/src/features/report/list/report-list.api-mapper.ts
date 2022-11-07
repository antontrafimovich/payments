import { ReportMetaApi } from "../report.api-model";
import { ReportMeta } from "../report.model";

export const convertReportMetaApiToDm = (value: ReportMetaApi): ReportMeta => {
  return {
    title: value.title,
    startDate: value.start_date,
    endDate: value.end_date,
  };
};
