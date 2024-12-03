import { log } from "@clack/prompts";

export const day2_1 = async (input: string): Promise<string | string[]> => {
  let safe = 0;
  const reports = input.split('\n');
  reports.forEach((report: string) => {
    if (isIncreasingOrDecreasing(report)) {
      if (checkReportDiff(report)) {
        safe++;
      }
    }
  });

  return safe.toFixed(0);
};

export const day2_2 = async (input: string): Promise<string | string[]> => {
  let safe = 0;
  const reports = input.split('\n');
  reports.forEach((report: string) => {
    if (isIncreasingOrDecreasing(report) && checkReportDiff(report)) {
      safe++;
    } else {
      const exceptionPossibilities = isIncreasingOrDecreasingWithException(report);
      if (exceptionPossibilities.length > 0) {
        if (checkReportDiffWithException(report, exceptionPossibilities)) {
          safe++;
        }
      }
    }
  });

  return safe.toFixed(0);
};

const isIncreasingOrDecreasing = (report: string): boolean => {
  // convert each space separated number to a separate number
  const numbers = report.split(' ').map((number) => parseInt(number, 10));
  // check if the numbers are increasing or decreasing
  let increasing = true;
  let decreasing = true;
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > numbers[i - 1]) {
      decreasing = false;
    } else if (numbers[i] < numbers[i - 1]) {
      increasing = false;
    }
  }

  if (increasing || decreasing) {
    log.info(`Report ${report} is increasing or decreasing`);
    return true;
  }

  return false;
};

const isIncreasingOrDecreasingWithException = (report: string): number[] => {
  // convert each space separated number to a separate number
  const numbers = report.split(' ').map((number) => parseInt(number, 10));
  // one by one remove one of the numbers and run the comparison, if true return the index of the removed number
  const possibilities = [];
  for (let i = 0; i < numbers.length; i++) {
    const copy = [...numbers];
    copy.splice(i, 1);
    if (isIncreasingOrDecreasing(copy.join(' '))) {
      possibilities.push(i);
    }
  }

  return possibilities;
};

const checkDiff = (num1: number, num2: number): boolean => {
  return Math.abs(num1 - num2) >= 1 && Math.abs(num1 - num2) <= 3;
}

const checkReportDiff = (report: string): boolean => {
  // convert each space separated number to a separate number
  const numbers = report.split(' ').map((number) => parseInt(number, 10));
  // check if the numbers have a difference of 1 to 3
  for (let i = 1; i < numbers.length; i++) {
    if (!checkDiff(numbers[i], numbers[i - 1])) {
      return false;
    }
  }

  log.info(`Report ${report} has a difference of 1 to 3`);
  return true;
}

const checkReportDiffWithException = (report: string, exceptionPossibilities: number[]): boolean => {
  // convert each space separated number to a separate number
  const numbers = report.split(' ').map((number) => parseInt(number, 10));
  // one by one remove one of the numbers and run the comparison, if true return the index of the removed number
  for (let i = 0; i < numbers.length; i++) {
    const copy = [...numbers];
    copy.splice(i, 1);
    if (checkReportDiff(copy.join(' '))) {
      if (exceptionPossibilities.includes(i)) {
        log.info(`Report ${report} has a difference of 1 to 3 with exception`);
        return true;
      }
    }
  }

  return false;
};
