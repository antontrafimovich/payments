import "./file-loader.css";

import { Upload } from "antd";
import {
  DraggerProps as AntdDraggerProps,
  UploadChangeParam as AntdUploadChangeParam,
} from "antd/lib/upload";
import { useMemo } from "react";
import React from "react";

const { Dragger } = Upload;

export interface DraggerProps extends AntdDraggerProps {}

export interface UploadChangeParam extends AntdUploadChangeParam {}

export const FileLoader = (props: DraggerProps) => {
  const draggerProps = useMemo(() => {
    return {
      name: "file",
      ...props,
    };
  }, [props]);

  return (
    <div className="file-loader">
      <Dragger {...draggerProps}>
        <p className="file-loader-text">
          Click or drag file to this area to upload
        </p>
      </Dragger>
    </div>
  );
};
