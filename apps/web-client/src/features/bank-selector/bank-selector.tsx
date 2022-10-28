import { useCallback } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import React from "react";

import { useDispatch, useSelector } from "../../common";
import { Select } from "../../ui-kit";
import { getBanks, setSelectedBank } from "./bank-selector-slice";

export const BankSelector = () => {
  const { entities: banks } = useSelector(
    (state) => state.bankSelector.allBanks
  );

  const selectedBank = useSelector((state) => state.bankSelector.selectedBank);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBanks());
  }, [dispatch]);

  const items = useMemo(() => {
    if (!banks) {
      return [];
    }

    return banks.map((bank) => {
      return {
        label: bank,
        value: bank,
      };
    });
  }, [banks]);

  const handleChange = useCallback(
    (v) => {
      dispatch(setSelectedBank(v));
    },
    [dispatch]
  );

  return (
    selectedBank && (
      <Select
        style={{ width: "120px", display: "flex", alignItems: "center" }}
        defaultValue={selectedBank}
        options={items}
        onChange={handleChange}
      />
    )
  );
};
