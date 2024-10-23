// how to run this code: 
// node --loader ts-node/esm ./algo.ts   

import { createEmptyCard, formatDate, fsrs, generatorParameters, Rating, Grades } from 'ts-fsrs';


const params = generatorParameters({ enable_fuzz: true, enable_short_term: false });
const f = fsrs(params);
const card = createEmptyCard(new Date('2022-2-1 10:00:00'));// createEmptyCard();
const now = new Date('2022-2-2 10:00:00');// new Date();
const scheduling_cards = f.repeat(card, now);

// console.log(scheduling_cards);
for (const item of scheduling_cards) {
    // grades = [Rating.Again, Rating.Hard, Rating.Good, Rating.Easy]
    console.log("\ninside loop, item is ", item)
    const grade = item.log.rating
    const { log, card } = item;
    // console.group(`${Rating[grade]}`);
    // console.table({
    //     [`card_${Rating[grade]}`]: {
    //         ...card,
    //         due: formatDate(card.due),
    //         last_review: formatDate(card.last_review as Date),
    //     },
    // });

    // console.log("\n\n")
    // console.table({
    //     [`log_${Rating[grade]}`]: {
    //         ...log,
    //         review: formatDate(log.review),
    //     },
    // });
    // console.groupEnd();
    console.log('----------------------------------------------------------------');
}

//item is 
// {
//   card: { 
//     due: 2022-02-19T09:00:00.000Z,
//     stability: 15.4722,
//     difficulty: 3.2828565,
//     elapsed_days: 0,
//     scheduled_days: 17,
//     reps: 1,
//     lapses: 0,
//     state: 2,
//     last_review: 2022-02-02T09:00:00.000Z
//   },
//   log: {
//     rating: 4,
//     state: 0,
//     due: 2022-02-01T09:00:00.000Z,
//     stability: 0,
//     difficulty: 0,
//     elapsed_days: 0,
//     last_elapsed_days: 0,
//     scheduled_days: 0,
//     review: 2022-02-02T09:00:00.000Z
//   }
// }