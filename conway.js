const buildCoordsMap = input =>
  input.reduce((coordsMap, coords) => ({
    ...coordsMap,
    [coords]: 0,
  }), {});

const parseCoords = coords => coords.split(',').map(c => Number(c));

const getNeighbours = ([x, y]) => [
  `${x-1},${y-1}`, `${x},${y-1}`, `${x+1},${y-1}`,
  `${x-1},${y}`,   `${x},${y}`, `${x+1},${y}`,
  `${x-1},${y+1}`, `${x},${y+1}`, `${x+1},${y+1}`
];

const mergeArrays = (arr1, arr2) => arr1.concat(arr2);

const safeIncrementProperty = (obj, key) => {
  obj[key] = obj[key] || 0;
  obj[key] += 1;
  return obj;
};

function conway(input) {
  const coordsMap = input
    .map(parseCoords)
    .map(getNeighbours)
    .reduce(mergeArrays, [])
    .reduce(safeIncrementProperty, buildCoordsMap(input));

  return Object
    .entries(coordsMap)
    .reduce((survivors, [coords, neighbours]) => {
      if (neighbours === 3 || neighbours === 4) {
        return [...survivors, coords];
      }
      return survivors;
    }, []);
}

module.exports = {
  buildCoordsMap,
  conway,
  getNeighbours,
  mergeArrays,
  parseCoords,
  safeIncrementProperty,
};
