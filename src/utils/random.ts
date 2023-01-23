export const generateRandomValue = (min: number, max: number, numAfterDigit = 0) =>
  +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);

export const generateRandomItem = (min: number, max: number, characterList: string) => {
  let result = '';
  const maxPosition = characterList.length - 1;

  for (let i = min; i < max; ++i) {
    const position = Math.floor(Math.random() * maxPosition);
    result = result + characterList.substring(position, position + 1);
  }
  return result;
};

export const getRandomItems = <T>(items: T[]): T[] => {
  const startPosition = generateRandomValue(0, items.length - 1);
  const endPosition = startPosition + generateRandomValue(startPosition, items.length);
  return items.slice(startPosition, endPosition);
};

export const getRandomOverallRating = (ratingCount: number, min: number, max: number, numAfterDigit = 0) => {
  let rating = 0;
  for (let i = 0; i < ratingCount; i++) {
    rating += generateRandomValue(min, max, numAfterDigit);
  }
  return rating;
};

export const getRandomItem = <T>(items: T[]): T =>
  items[generateRandomValue(0, items.length - 1)];
