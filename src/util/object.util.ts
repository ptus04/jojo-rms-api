/**
 * Removes properties with undefined values from an object.
 * @param obj The object to clean.
 * @returns A new object without undefined properties.
 */
export function removeUndefinedProperties<T extends object>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined),
  ) as T;
}
