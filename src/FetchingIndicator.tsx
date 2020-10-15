import { useIsFetching } from "react-query";
import React from "react";

export const FetchingIndicator = () => {
  const isFetching = useIsFetching();

  return (
    <span
      style={{
        color: isFetching ? "green" : "grey",
      }}
    >
      Fetching
    </span>
  );
};
