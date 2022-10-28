import { useMemo } from "react";
import React, { useCallback } from "react";

import { useSelector } from "../../common";
import { FileLoader, UploadChangeParam } from "../../ui-kit";

export const PaymentsReportLoader = () => {
  const selectedBank = useSelector((state) => state.bankSelector.selectedBank);

  const data = useMemo(() => {
    return {
      bank: selectedBank,
    };
  }, [selectedBank]);

  const onChange = useCallback(({ file }: UploadChangeParam) => {
    if (file.status !== "done") {
      return;
    }

    const fileId = file.response.response.fileName;
    console.log(file);

    window.location.assign(`http://localhost:3001/payments/download/${fileId}`);
  }, []);

  return (
    <FileLoader
      data={data}
      action="http://localhost:5000/payments/build_report"
      onChange={onChange}
    />
  );
};
