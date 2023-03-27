export type valueof<T> = T[keyof T];

export type OverwriteProperties<T, R> = Omit<T, keyof R> & R;

type ObjectEntriesReturn<T> = [keyof T, valueof<T>][];
type ObjectEntries = <T extends object>(object: T) => ObjectEntriesReturn<T>;
type ObjectKeys = <T extends object>(object: T) => (keyof T)[];

export const objectEntries: ObjectEntries = object => Object.entries(object) as ObjectEntriesReturn<typeof object>;
export const objectKeys: ObjectKeys = object => Object.keys(object) as (keyof typeof object)[];

export const hasOwnProperty = <K extends string>(object: Readonly<Record<K, unknown>>, key: string): key is K =>
  key in object;

export const typedFetch = async <T>(url: string, config: RequestInit): Promise<T> => {
  const response = await fetch(url, config);

  return await response.json();
};
