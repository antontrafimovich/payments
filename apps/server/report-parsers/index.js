const pkReportParcer = require("./pk-report-parcer");
const milReportParcer = require("./mil-report-parcer");

module.exports = { ...pkReportParcer, ...milReportParcer };
