import { z } from "zod";

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (issue.code === z.ZodIssueCode.invalid_type) {
    if (issue.expected === "string") {
      return { message: "Campo inválido!" };
    }
  }
  return { message: ctx.defaultError };
};

export default customErrorMap;
