import { Companion } from "@/types/types";
import { createContext } from "react";

export const CompanionContext = createContext<Companion | null>(null);
