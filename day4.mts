export const day4_1 = async (input: string): Promise<string | string[]> => {
  const rows = input.split('\n');
  // create a 2d array of characters
  const grid = rows.map((row: string) => row.split(''));
  // loop through the grid
  let sum = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const result = checkXmas(grid, x, y);
      if (result > 0) {
        sum += result;
      }
    }
  }

  return sum.toFixed(0);
};

export const day4_2 = async (input: string): Promise<string | string[]> => {
  const rows = input.split('\n');
  // create a 2d array of characters
  const grid = rows.map((row: string) => row.split(''));
  // loop through the grid
  let sum = 0;
  for (let y = 1; y < grid.length - 1; y++) {
    for (let x = 1; x < grid[y].length - 1; x++) {
      const result = checkMasX(grid, x, y);
      if (result > 0) {
        sum += result;
      }
    }
  }

  return sum.toFixed(0);
};

const checkXmas = (grid: string[][], x: number, y: number): number => {
  const current = grid[y][x];
  if (current !== 'X') {
    return 0;
  }

  let sum = 0;

  // East
  if (x < grid[y].length - 3) {
    if (`${grid[y][x]}${grid[y][x + 1]}${grid[y][x + 2]}${grid[y][x + 3]}` === 'XMAS') {
      console.log('east');
      sum++;
    }
  }

  // South
  if (y < grid.length - 3) {
    if (`${grid[y][x]}${grid[y + 1][x]}${grid[y + 2][x]}${grid[y + 3][x]}` === 'XMAS') {
      console.log('south');
      sum++;
    }
  }

  // West
  if (x > 2) {
    if (`${grid[y][x]}${grid[y][x - 1]}${grid[y][x - 2]}${grid[y][x - 3]}` === 'XMAS') {
      console.log('west');
      sum++;
    }
  }

  // North
  if (y > 2) {
    if (`${grid[y][x]}${grid[y - 1][x]}${grid[y - 2][x]}${grid[y - 3][x]}` === 'XMAS') {
      console.log('north');
      sum++;
    }
  }

  // North East
  if (x < grid[y].length - 3 && y > 2) {
    if (`${grid[y][x]}${grid[y - 1][x + 1]}${grid[y - 2][x + 2]}${grid[y - 3][x + 3]}` === 'XMAS') {
      console.log('north east');
      sum++;
    }
  }

  // South East
  if (x < grid[y].length - 3 && y < grid.length - 3) {
    if (`${grid[y][x]}${grid[y + 1][x + 1]}${grid[y + 2][x + 2]}${grid[y + 3][x + 3]}` === 'XMAS') {
      console.log('south east');
      sum++;
    }
  }

  // South West
  if (x > 2 && y < grid.length - 3) {
    if (`${grid[y][x]}${grid[y + 1][x - 1]}${grid[y + 2][x - 2]}${grid[y + 3][x - 3]}` === 'XMAS') {
      console.log('south west');
      sum++;
    }
  }

  // North West
  if (x > 2 && y > 2) {
    if (`${grid[y][x]}${grid[y - 1][x - 1]}${grid[y - 2][x - 2]}${grid[y - 3][x - 3]}` === 'XMAS') {
      console.log('north west');
      sum++;
    }
  }

  return sum;
};

const checkMasX = (grid: string[][], x: number, y: number): number => {
  if (grid[y][x] !== 'A') {
    return 0;
  }

  let sum = 0;

  if (
    (grid[y-1][x-1] === 'M' && grid[y+1][x+1] === 'S') ||
    (grid[y-1][x-1] === 'S' && grid[y+1][x+1] === 'M')
  ) {
    if (
      (grid[y-1][x+1] === 'M' && grid[y+1][x-1] === 'S') ||
      (grid[y-1][x+1] === 'S' && grid[y+1][x-1] === 'M')
    ) {
      sum++;
    }
  }

  return sum;
};
