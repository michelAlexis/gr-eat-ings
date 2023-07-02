import { type PropsWithChildren, type FC } from "react";

export type PCC<T extends object = object> = PropsWithChildren<T>;
export type FCC<T extends object = object> = FC<PCC<T>>;
