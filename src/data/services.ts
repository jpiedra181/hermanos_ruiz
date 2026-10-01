export const SERVICE_KEYS = ["mechanic", "itv", "brakes", "diagnosis", "oil", "tires"] as const;
export type ServiceKey = (typeof SERVICE_KEYS)[number];
