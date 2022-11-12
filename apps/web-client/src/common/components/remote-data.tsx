import { FC } from "react";

export type RemoteDataPendingValue = {
  status: "pending";
};

export type RemoteDataSuccessValue<T> = {
  status: "done";
  value: T;
};

export type RemoteDataFailureValue = {
  status: "fail";
  error: string;
};

export type RemoteDataValue<T = unknown> =
  | RemoteDataPendingValue
  | RemoteDataSuccessValue<T>
  | RemoteDataFailureValue;

export interface RemoteDataProps<T> {
  value: RemoteDataValue<T>;
  success: FC<{ value: T }>;
  failure?: FC<{ error: string }>;
  pending?: FC<any>;
}

const isPending = (value: RemoteDataValue): value is RemoteDataPendingValue => {
  return value.status === "pending";
};

const isSuccess = <T,>(
  value: RemoteDataValue<T>
): value is RemoteDataSuccessValue<T> => {
  return value.status === "done";
};

const isFailure = (value: RemoteDataValue): value is RemoteDataFailureValue => {
  return value.status === "fail";
};

export const RemoteData = <T,>(props: RemoteDataProps<T>) => {
  const { value, success: Success, failure: Failure, pending: Pending } = props;

  if (isPending(value)) {
    return Pending ? <Pending /> : <>Loading...</>;
  }

  if (isFailure(value)) {
    return Failure ? <Failure error={value.error} /> : <>{value.error}</>;
  }

  return <Success value={value.value} />;
};
