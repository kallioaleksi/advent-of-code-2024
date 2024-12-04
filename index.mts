import { intro, log, outro, select } from "@clack/prompts";
import { Command } from "commander";
import { day1_1, day1_2 } from "./day1.mjs";
import { day2_1, day2_2 } from "./day2.mjs";
import { day3_1, day3_2 } from "./day3.mjs";
import { day4_1, day4_2 } from "./day4.mjs";
import { readFileSync } from "fs";

interface FunctionMap {
  day: string;
  function1: Function;
  function2: Function;
  input?: string;
}

interface DailyData {
  functions: Function[];
  input?: string;
}

const FUNCTION_MAP: FunctionMap[] = [
  { day: '1', function1: day1_1, function2: day1_2, input: 'day1.txt' },
  { day: '2', function1: day2_1, function2: day2_2, input: 'day2.txt' },
  { day: '3', function1: day3_1, function2: day3_2, input: 'day3.txt' },
  { day: '4', function1: day4_1, function2: day4_2, input: 'day4.txt' },
];

const getDays = (): { label: string, value: string}[] => {
  return FUNCTION_MAP.map((functionMap: FunctionMap) => ({ label: `Day ${functionMap.day}`, value: functionMap.day }));
};

const getFunctions = (day: string): DailyData | undefined => {
  const found = FUNCTION_MAP.find((functionMap: FunctionMap) => functionMap.day === day);
  if (found) {
    return {
      functions: [ found.function1, found.function2 ],
      input: found.input,
    };
  } else {
    return undefined;
  }
};

intro('ADVENT OF CODE 2024');
const program = new Command();
program
  .option('-d, --day <day>', 'Day of the challenge')
  .parse();

const options = program.opts();
if (options.day && options.day.length > 1) {
  throw new Error('Cannot have more than one day at a time!');
}

let day: string;
if ((options.day?.length ?? 0) === 0) {
  const selection = await select({
    message: 'Select a day',
    options: getDays(),
  });

  if (typeof selection === 'string') {
    day = selection;
  } else {
    day = selection.toString();
  }
} else {
  day = options.day[0];
}

const functions = getFunctions(day);
if (!functions) {
  throw new Error('Invalid day!');
}

const [dailyFunction1, dailyFunction2] = functions.functions;
const input = functions.input;

let file = '';
if (input) {
  log.info(`Input file: ${input}`);
  file = readFileSync(`inputs/${input}`, 'utf-8');
}

log.step(`Running day ${day}...`);
const result1: string | string[] = await dailyFunction1(file);
const result2: string | string[] = await dailyFunction2(file);

const results = [result1, result2];
results.forEach((result: string | string[], key: number) => {
  if (typeof result === 'string') {
    log.success(`Result #${key}: ${result}`);
  } else if (Array.isArray(result)) {
    log.success(`Result #${key}:`);
    for (const item of result) {
      log.success(item);
    }
  }
});


outro('Goodbye!');
