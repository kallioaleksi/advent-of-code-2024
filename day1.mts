import { readFileSync } from 'fs';

export const day1_1 = async (input: string): Promise<string | string[]> => {
  const lists = readListsFromArray(input.split('\n'));
  const sortedLists = sortLists(lists);
  const result = findDistance(sortedLists);

  return result.toFixed(0);
};

const readListsFromArray = (lines: string[]): number[][] => {
  return lines.map((line: string) => line.split('   ').map((num: string) => parseInt(num, 10)));
};

const sortLists = (lists: number[][]): number[][] => {
  // extract lists to separate arrays
  const list1: number[] = [];
  const list2: number[] = [];
  lists.forEach((list: number[]) => {
    list1.push(list[0]);
    list2.push(list[1]);
  });

  // sort lists
  list1.sort((a, b) => a - b);
  list2.sort((a, b) => a - b);

  // merge lists, assuming lists have the same length
  const sortedLists = [];
  for (let i = 0; i < list1.length; i++) {
    sortedLists.push([list1[i], list2[i]]);
  }

  return sortedLists;
};

const findDistance = (lists: number[][]): number => {
  let sum = 0;
  lists.forEach((list: number[]) => {
    sum += Math.abs(list[0] - list[1]);
  });

  return sum;
}

export const day1_2 = async (input: string): Promise<string | string[]> => {
  const lists = readListsFromArray(input.split('\n'));
  const [list1, list2] = separateLists(lists);
  const occurrences = findOccurrences(list1, list2);
  const result = calculateSimilarity(occurrences);

  return result.toFixed(0);
};

const separateLists = (lists: number[][]): [number[], number[]] => {
  const list1: number[] = [];
  const list2: number[] = [];
  lists.forEach((list: number[]) => {
    list1.push(list[0]);
    list2.push(list[1]);
  });

  return [list1, list2];
};

const findOccurrences = (list1: number[], list2: number[]): number[][] => {
  const occurrences = [];
  for (let i = 0; i < list1.length; i++) {
    const leftValue = list1[i];
    let occurrenceCount = 0;
    list2.forEach((rightValue: number, index: number) => {
      if (leftValue === rightValue) {
        occurrenceCount++;
      }
    });

    occurrences.push([leftValue, occurrenceCount]);
  }

  return occurrences;
};

const calculateSimilarity = (occurrences: number[][]): number => {
  let sum = 0;
  occurrences.forEach((occurrence: number[]) => {
    sum += occurrence[0] * occurrence[1];
  });

  return sum;
};