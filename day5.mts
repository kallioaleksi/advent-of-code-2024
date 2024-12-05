import { log } from "@clack/prompts";

export const day5_1 = async (input: string): Promise<string | string[]> => {
  const collections = input.split('\n\n');
  const instructions = collections[0].split('\n');
  const updates = collections[1].split('\n');
  let sum = 0;

  updates.forEach((update: string, i: number) => {
    const updateOk = checkUpdate(update, i, updates, instructions);

    if (updateOk) {
      sum += getMiddleValue(update.split(',').map((v: string) => Number.parseInt(v, 10)));
    }

  });

  return sum.toFixed(0);
};

export const day5_2 = async (input: string): Promise<string | string[]> => {
  const collections = input.split('\n\n');
  const instructions = collections[0].split('\n');
  const updates = collections[1].split('\n');
  let sum = 0;

  updates.forEach((update: string, i: number) => {
    const updateOk = checkUpdate(update, i, updates, instructions);

    if (!updateOk) {
      const sortedUpdate = fixUpdate(update, instructions);
      sum += getMiddleValue(sortedUpdate);
    }

  });

  return sum.toFixed(0);
};

const fixUpdate = (update: string, instructions: string[]): number[] => {
  let value = update.split(',').map((v: string) => Number.parseInt(v, 10));
  for (let i = 0; i < instructions.length; i++) {
    const instruction = instructions[i];
    const [first, last] = instruction.split('|').map((v: string) => Number.parseInt(v, 10));
    if (value.includes(first) && value.includes(last)) {
      console.log(`found ${first} and ${last}`);
      const firstIndex = value.indexOf(first);
      const lastIndex = value.indexOf(last);
      if (firstIndex > lastIndex) {
        // move first before last
        //console.log(`before: ${value}`);
        value.splice(firstIndex, 1);
        value.splice(lastIndex, 0, first);
        //console.log(`after: ${value}`);
        i = 0;
      }
    }
  }

  console.log(`Fixed value: ${value}`);

  return value;
};

const checkUpdate = (update: string, i: number, updates: string[], instructions: string[]): boolean => {
  log.info(`Checking value ${i + 1} of ${updates.length}: ${update}`);
  const value = update.split(',').map((v: string) => Number.parseInt(v, 10));
  let updateOk = true;
  for (let idx = 0; idx < value.length; idx++) {
    if (!updateOk) {
      break;
    }

    if (idx >= 1) {
      //console.log(`Checking previous instructions for ${v}`);
      if(!checkPreviousInstructions(instructions, value, idx)) {
        updateOk = false;
        break;
      }
    }

    if (!checkNextInstructions(instructions, value, idx)) {
      updateOk = false;
      break;
    }
  }

  return updateOk;
};

const checkPreviousInstructions = (instructions: string[], value: number[], idx: number): boolean => {
  for (let i = idx; i >= 1; i--) {
    const prev = value.slice(0, i - 1);
    for (let instruction of instructions) {
      const [first, last] = instruction.split('|').map((v: string) => Number.parseInt(v, 10));
      if (first === value[idx]) {
        if (prev.includes(last)) {
          log.error(`Failed on ${value} due to rule ${instruction}`);
          return false;
        }
      }
    }
  }

  return true;
};

const checkNextInstructions = (instructions: string[], value: number[], idx: number): boolean => {
  for (let i = idx; i < value.length; i++) {
    const next = value.slice(i, -1);
    for (let instruction of instructions) {
      const [first, last] = instruction.split('|').map((v: string) => Number.parseInt(v, 10));
      if (last === value[idx]) {
        if (next.includes(first)) {
          log.error(`Failed on ${value} due to rule ${instruction}`);
          return false;
        }
      }
    }
  }

  return true;
};

const getMiddleValue = (value: number[]): number => {
  if(value.length % 2 === 0) {
    return value[value.length / 2];
  } else {
    return value[(value.length - 1) / 2];
  }
};
