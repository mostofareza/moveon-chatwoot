import { IFilters } from "@/types/common/filters";
import qs from "qs";
import { useMemo, useReducer } from "react";

type FilterActionTypes =
  | { type: "setFilters"; payload: IFilterState }
  | { type: "reset"; payload: IFilterState }
  | { type: "setPage"; payload: number };

export interface IFilterState extends IFilters {
  per_page: number;
  page: number;
  status?: string;
}

const flattenObject = (obj: IFilters): IFilters => {
  let result: IFilters = {};

  for (const key in obj) {
    if (key.startsWith("created_at[")) {
      result[key] = obj[key];
    } else if (Array.isArray(obj[key])) {
      obj[key].forEach((item: any, index: number) => {
        result[`${key}[${index}]`] = item.value;
      });
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      result = { ...result, ...flattenObject(obj[key]) };
    } else {
      result[key] = obj[key];
    }
  }

  return result;
};

const reducer = (
  state: IFilterState,
  action: FilterActionTypes,
): IFilterState => {
  switch (action.type) {
    case "setFilters": {
      const flatten = flattenObject(action.payload);
      return {
        page: 1,
        per_page: state.per_page,
        ...flatten,
      };
    }
    case "setPage": {
      return {
        ...state,
        page: action.payload,
      };
    }
    case "reset": {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export const useFilters = (existing?: string) => {
  if (existing && existing[0] === "?") {
    existing = existing.substring(1);
  }

  const initial = useMemo(() => parseQueryString(existing), [existing]);

  const [state, dispatch] = useReducer(reducer, initial);

  const paginate = (direction: 1 | -1) => {
    if (direction > 0) {
      dispatch({ type: "setPage", payload: state.page + 1 });
    } else {
      dispatch({ type: "setPage", payload: state.page - 1 });
    }
  };

  const reset = () => {
    dispatch({
      type: "setFilters",
      payload: {
        // ...state,
        page: 1,
        per_page: 25,
      },
    });
  };

  const setFilters = (filters: IFilterState) => {
    dispatch({ type: "setFilters", payload: filters });
  };

  const getQueryObject = () => {
    const toQuery: any = {};
    for (const [key, value] of Object.entries(state)) {
      toQuery[key] = value;
    }

    return toQuery;
  };

  const getQueryString = () => {
    const obj = getQueryObject();
    return qs.stringify(obj, { skipNulls: true });
  };

  const getRepresentationObject = (fromObject?: IFilterState) => {
    const objToUse = fromObject ?? state;

    const toQuery: any = {};
    for (const [key, value] of Object.entries(objToUse)) {
      toQuery[key] = value;
    }

    return toQuery;
  };

  const getRepresentationString = () => {
    const obj = getRepresentationObject();
    return qs.stringify(obj, { skipNulls: true });
  };

  const queryObject = useMemo(() => getQueryObject(), [state]);
  const representationObject = useMemo(
    () => getRepresentationObject(),
    [state],
  );
  const representationString = useMemo(
    () => getRepresentationString(),
    [state],
  );

  return {
    ...state,
    filters: {
      ...state,
    },
    representationObject,
    representationString,
    queryObject,
    paginate,
    getQueryObject,
    getQueryString,
    setFilters,
    reset,
  };
};

const parseQueryString = (queryString?: string): IFilterState => {
  const defaultVal: IFilterState = {
    page: 1,
    per_page: 25,
  };

  if (queryString) {
    const filters = qs.parse(queryString, { ignoreQueryPrefix: true });
    for (const [key, value] of Object.entries(filters)) {
      if (key.includes("[") && key.includes("]")) {
        const multiselectKey = key.split("[")[0];
        if (!defaultVal[multiselectKey]) {
          defaultVal[multiselectKey] = [];
        }
        defaultVal[multiselectKey].push({ value });
      } else {
        switch (key) {
          case "page": {
            if (typeof value === "string") {
              defaultVal.page = parseInt(value);
            }
            break;
          }
          case "per_page": {
            if (typeof value === "string") {
              defaultVal.per_page = parseInt(value);
            }
            break;
          }
          default: {
            defaultVal[key] = value;
            break;
          }
        }
      }
    }
  }

  return defaultVal;
};
