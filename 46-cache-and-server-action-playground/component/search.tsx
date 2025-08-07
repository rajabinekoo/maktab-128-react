"use client";

import React from "react";

export const Search: React.FC = () => {
  const [s, setS] = React.useState<string>("");

  return (
    <input
      placeholder="search"
      value={s}
      onChange={(e) => setS(e.target.value)}
    />
  );
};
