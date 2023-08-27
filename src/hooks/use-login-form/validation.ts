import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { withCountrySchema } from "utils";

// Validation Schema
export const loginSchema = withCountrySchema;
export type LoginSchema = z.infer<typeof loginSchema>;

export const loginResolver = zodResolver(loginSchema);
