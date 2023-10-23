export function groupBy<T>(items: T[], key: keyof T): Map<string, T[]> {
  return items.reduce((map, item) => {
    const value = item[key];
    const group = map.get(value as string);
    if (!group) {
      map.set(value as string, [item]);
    } else {
      group.push(item);
    }
    return map;
  }, new Map<string, T[]>());
}