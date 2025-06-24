import { isValid } from "date-fns";

export const clearObject = (
  obj: any,
  clearType: "update" | "clear" = "clear",
  skipField?: string[]
) => {
  if (typeof obj !== "object") {
    return obj;
  }

  const newObj = { ...obj };

  Object.keys(newObj).forEach((key) => {
    if (skipField?.find((item) => item === key)) return;

    // * date stays the same
    if (isValid(newObj[key])) return;

    if (Array.isArray(newObj[key])) return;

    if (typeof newObj[key] === "object" && newObj[key] !== null) {
      newObj[key] = clearObject(newObj[key], clearType);
    }

    if (
      typeof newObj[key] === "object" &&
      newObj[key] !== null &&
      (newObj[key].length === 0 || Object.keys(newObj[key]).length === 0)
    ) {
      delete newObj[key];
    }

    if (clearType === "clear" && newObj[key] === undefined) {
      delete newObj[key];
    }

    if (clearType === "clear" && newObj[key] === null) {
      delete newObj[key];
    }

    if (clearType === "clear" && newObj[key] === "") {
      delete newObj[key];
    }

    if (clearType === "update" && newObj[key] === "") {
      newObj[key] = null;
    }

    if (clearType === "update" && newObj[key] === undefined) {
      newObj[key] = null;
    }
  });

  return newObj;
};
