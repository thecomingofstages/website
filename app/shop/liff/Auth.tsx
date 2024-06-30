"use client";

import { useMemo } from "react";

import { useAtom } from "jotai";
import { loadable } from "jotai/utils";

import { liffAtom } from ".";
import { Spinner } from "./Spinner";

export function LIFFAuth({ children }: { children: React.ReactNode }) {
  const [value] = useAtom(useMemo(() => loadable(liffAtom), []));
  return (
    <>
      {children}
      {value.state !== "hasData" && <Spinner />}
    </>
  );
}
