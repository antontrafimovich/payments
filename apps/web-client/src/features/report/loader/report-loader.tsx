import { useMemo } from "react";
import React, { useCallback } from "react";

import { useDispatch, useSelector } from "../../../common";
import { FileLoader, UploadChangeParam } from "../../../ui-kit";
import { buildReport } from "./report-loader-slice";

export const ReportLoader = () => {
  const selectedBank = useSelector((state) => state.bankSelector.selectedBank);

  const dispatch = useDispatch();

  const data = useMemo(() => {
    return {
      bank: selectedBank,
    };
  }, [selectedBank]);

  const onChange = useCallback(({ file }: UploadChangeParam) => {
    if (file.status !== "done") {
      return;
    }

    console.log(file.response);
  }, []);

  return (
    <FileLoader
      data={data}
      customRequest={({ file, headers, ...others }) => {
        dispatch(buildReport({ file: file as Blob, headers }));
      }}
      onChange={onChange}
    />
  );
};
