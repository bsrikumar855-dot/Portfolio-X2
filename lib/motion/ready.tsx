"use client";

import { createContext, useContext } from "react";

/** True once the preloader has handed over to the page. */
export const ReadyContext = createContext<boolean>(false);
export const useReady = (): boolean => useContext(ReadyContext);
