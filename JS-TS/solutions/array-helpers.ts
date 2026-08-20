/* eslint-disable @typescript-eslint/no-unused-vars */
// Task 02: Mini functional–utility library
// All helpers are declared but not implemented.

function checkIfNullOrUndefined<T>(source: readonly T[]) {
  if (source === null || source === undefined) {
    throw new TypeError("Source can't be null or undefined");
  }
}

export function mapArray<T, R>(source: readonly T[], mapper: (item: T, index: number) => R): R[] {
  checkIfNullOrUndefined<T>(source);

  let resultArray: R[] = [];
  let index = 0;

  for (const element of source) {
    resultArray.push(mapper(element, index++));
  }

  return resultArray;
}

export function filterArray<T>(source: readonly T[], predicate: (item: T, index: number) => boolean): T[] {
  checkIfNullOrUndefined<T>(source);

  let resultArray: T[] = [];
  let index = 0;

  for (const element of source) {
    if (predicate(element, index++)) {
      resultArray.push(element);
    }
  }

  return resultArray;
}

export function reduceArray<T, R>(source: readonly T[], reducer: (acc: R, item: T, index: number) => R, initial: R): R {
  checkIfNullOrUndefined<T>(source);

  let result: R = initial;
  let index = 0

  for (const element of source) {
    result = reducer(result, element, index++);
  }
  
  return result;
}

export function partition<T>(source: readonly T[], predicate: (item: T) => boolean): [T[], T[]] {
  checkIfNullOrUndefined<T>(source);

  let passArray: T[] = [];
  let failArray: T[] = [];

  for(const element of source) {
    if (predicate(element)) {
      passArray.push(element);
    } else {
      failArray.push(element);
    }
  }

  return [passArray, failArray];

}

export function groupBy<T, K extends PropertyKey>(source: readonly T[], keySelector: (item: T) => K): Record<K, T[]> {
  checkIfNullOrUndefined<T>(source);

  let resultObject = {} as Record<K, T[]>;

  for (const element of source) {
    const key = keySelector(element);

    if (!resultObject[key]) {
      resultObject[key] = [];
    }

    resultObject[key].push(element);
  }

  return resultObject;
}