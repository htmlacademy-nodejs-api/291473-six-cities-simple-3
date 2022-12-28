export const generateRandomValue = (min:number, max:number, numAfterDigit = 0) =>
  +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);

export const generateRandomItem = (min:number, max:number, characterList:string) => {
  let result = '';
  const maxPosition = characterList.length - 1;

  for( let i = min; i < max; ++i ) {
    const position = Math.floor ( Math.random() * maxPosition );
    result = result + characterList.substring(position, position + 1);
  }
  return result;
};
//   function str_rand() {
//     var result       = '';
//     var words        = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
//     var max_position = words.length - 1;
//         for( i = 0; i < 5; ++i ) {
//             position = Math.floor ( Math.random() * max_position );
//             result = result + words.substring(position, position + 1);
//         }
//     return result;
// }
// $("#gen").click(function() {
//     $("#short_link").val(str_rand());
// });

export const getRandomItems = <T>(items: T[]):T[] => {
  const startPosition = generateRandomValue(0, items.length - 1);
  const endPosition = startPosition + generateRandomValue(startPosition, items.length);
  return items.slice(startPosition, endPosition);
};

export const getRandomItem = <T>(items: T[]):T =>
  items[generateRandomValue(0, items.length - 1)];

// export const getRandomFloat = (min: number, max: number): number => {
//   const randomFloat = Math.random() * (max - min) + min;
//   return randomFloat;
// };
