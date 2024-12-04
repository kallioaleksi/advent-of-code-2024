import { log } from "@clack/prompts";

const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;

export const day3_1 = async (input: string): Promise<string | string[]> => {
  const matches = input.matchAll(regex);
  //loop through matches
  let sum = 0;
  for (const match of matches) {
    const [fullMatch, a, b] = match;
    sum += parseInt(a) * parseInt(b);
  }

  return sum.toFixed(0);
};

export const day3_2 = async (input: string): Promise<string | string[]> => {
  let sum = 0;
  const doMemory = removeDont(input);

  // find all occurrences of regex
  const matches = doMemory.matchAll(regex);
  //loop through matches
  for (const match of matches) {
    const [fullMatch, a, b] = match;
    sum += parseInt(a) * parseInt(b);
  }

  return sum.toFixed(0);
};

const removeDont = (memory: string): string => {
  const DONT = "don't()";
  const DO = 'do()';
  let safe = '';

  let remaining = memory;
  while (remaining.length > 0) {
    const dontIndex = remaining.indexOf(DONT);
    log.info(`Don't index: ${dontIndex}`);
    if (dontIndex === -1) {
      safe += remaining;
      break;
    }

    safe += remaining.substring(0, dontIndex);
    remaining = remaining.substring(dontIndex + DONT.length);
    const doIndex = remaining.indexOf(DO);
    log.info(`Do index: ${doIndex}`);
    if (doIndex === -1) {
      break;
    }

    remaining = remaining.substring(doIndex + DO.length);
  }

  return safe;
};
