const {
  buildCoordsMap,
  conway,
  getNeighbours,
  mergeArrays,
  parseCoords,
  safeIncrementProperty,
} = require('./conway');

test("Conway's game exists", () => {
  expect(conway).toBeDefined();
});

test("Conway's game takes an array and returns another array", () => {
  const input = [];

  const result = conway(input);

  expect(result).toBeInstanceOf(Array);
  expect(result).not.toBe(input);
});

test("Single cell dies in one generation", () => {
  const input = ["1,1"];

  const result = conway(input);

  expect(result).toEqual([]);
});

test("Any cell without two or three neighbours dies in one generation", () => {
  const input = ["1,1", "2,2", "3,3"];
  const expectedResult = ["2,2"];

  const result = conway(input);

  expect(result).toEqual(expectedResult);
});

test("buildCoordsMap correctly transforms input to map", () => {
  const input = ["11,13", "101,205", "53,678"];
  const expectedResult = {
    "11,13": 0,
    "101,205": 0,
    "53,678": 0,
  };

  const result = buildCoordsMap(input);

  expect(result).toEqual(expectedResult);
});

test("buildCoordsMap returns empty map for empty input", () => {
  const input = [];
  const expectedResult = {};

  const result = buildCoordsMap(input);

  expect(result).toEqual(expectedResult);
});

test("parseCoords takes string of coords and splits it to array of numbers", () => {
  const input = "12,-5";
  const expectedResult = [12, -5];

  const result = parseCoords(input);

  expect(result).toEqual(expectedResult);
});


test("getNeighbours returns coords of neighbours of given cell", () => {
  const input = [1,1];
  const expectedResult = [
    "0,0", "1,0", "2,0",
    "0,1", "1,1", "2,1",
    "0,2", "1,2", "2,2"
  ];

  const result = getNeighbours(input);

  expect(result).toEqual(expectedResult);
});

test("mergeArrays joins two arrays", () => {
  const arr1 = ["a", "b"];
  const arr2 = [3,4];
  const expectedResult = ["a", "b", 3, 4];

  const result = mergeArrays(arr1, arr2);

  expect(result).toEqual(expectedResult);
});

test("Any dead cell with exactly three neighbours becomes alive", () => {
  const input = [
    "1,1", "2,1",
    "1,2"
  ];
  const expectedResult = [
    "1,1", "2,1",
    "1,2", "2,2"
  ];

  const result = conway(input);

  expect(result).toEqual(expectedResult);
});

test("safeIncrementProperty increments value of obj property", () => {
  const property = "key";
  const initial = {[property]: 0};
  const expectedResult = {[property]: 1};

  const result = safeIncrementProperty(initial, property);

  expect(result).toEqual(expectedResult);
});

test("safeIncrementProperty correctly increments value of undefined property", () => {
  const property = "key";
  const initial = {};
  const expectedResult = {[property]: 1};

  const result = safeIncrementProperty(initial, property);

  expect(result).toEqual(expectedResult);
});

test("In Conway's game of life still-life pattern of cells does not get changed", () => {
  const input = [
           "1,1", "2,1",
    "0,2",               "3,2",
           "1,3", "2,3"
  ];
  const expectedResult = [...input];

  const result = conway(input);

  expect(result).toEqual(expectedResult);
});

test("In Conway's game of life oscillator pattern of cells has correct intermediate state", () => {
  const input = ["1,2", "2,2", "3,2"];
  const expectedResult = [
    "2,1",
    "2,2",
    "2,3"
  ];

  const result = conway(input);

  expect(result).toEqual(expect.arrayContaining(expectedResult));
});

test("In Conway's game of life oscillator pattern of cells returns to its initial state", () => {
  const input = ["1,2", "2,2", "3,2"];

  const result = conway(conway(input));

  expect(result).toEqual(expect.arrayContaining(input));
});
