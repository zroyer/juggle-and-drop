import shortid from 'shortid';

const exampleCards = [
  'Walk the dog',
  'Take out the garbage',
  'Take out the recycling',
  'Clean the microwave',
  'Fold the laundry',
  'Call Mom',
  'Call Grandma',
  'Make the bed',
  'Wash the dishes'
];

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

export const generateExampleCards = () => {
  const result = [new Array(), new Array(), new Array()];
  const shuffled = exampleCards.sort(() => Math.random() - 0.5);
  for (const card of shuffled) {
    let index = getRandomInt(3); // Randomly returns 0, 1, or 2
    result[index].push({_id: shortid.generate(), title: card});
  }
  return result;
};
