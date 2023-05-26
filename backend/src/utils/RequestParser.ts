import { Request } from "express";
import { List_Payload } from "../dto/default.dto";

interface valueDefault {
  defaultValue: number | string;
}

export function getListOptions(req: Request): List_Payload {
  return {
    limit: Parserint(req.query.limit as string, { defaultValue: 10 }),
    skip: Parserint(req.query.skip as string, { defaultValue: 0 }),
    sortBy: (req.query.sortBy as string) || "",
    filters: (req.query.filters as Record<string, string>) || {},
  };
}

function Parserint(inputStr: string, def: valueDefault): number {
  try {
    if (!inputStr && typeof def.defaultValue === "number") {
      return def.defaultValue;
    }
    const outputInt: number = parseInt(inputStr);
    return outputInt;
  } catch (error) {
    return 0;
  }
}
