// how to run this code: 
// node --loader ts-node/esm ./algo.ts   

import { createEmptyCard, formatDate, fsrs, generatorParameters, Rating, Grades } from 'ts-fsrs';
import { addUser } from './controllers/userControllers.js';
import { getCardsByTypeStatus } from './controllers/adminControllers.js';
import ChildCard from './schemas/childCardSchema.js';
import mongoose from 'mongoose';


export async function algo () {
    const data = await getCardsByTypeStatus("noun")
    let card; 
    if (data) {
        card = data[0]
    } else {
        return 
    }
    const params = generatorParameters({ enable_fuzz: true, enable_short_term: false });
    const f = fsrs(params);
    const fsrsCard = createEmptyCard();
    const scheduling_cards = f.repeat(fsrsCard, new Date());
    console.log(scheduling_cards[Rating.Good])

    const childCard = new ChildCard({
        mothercard_id: card._id, 
        mothercard_type: card.type, 
        user_id: "671ab502ae1e4f9fc8bf19c9", 
        status: "active",
        card: scheduling_cards[Rating.Good].card
    })

    // childCard.save()
    console.log("saved child card")
}

// 1. add a user 
// console.log("-----------------------------\n calling algo function ")
// addUser({
//     username: "tp",
//     email: "tp",
//     password: "tp"
// })

// 2. get the user's id 
// userId: "671ab502ae1e4f9fc8bf19c9"

// 3. get all the noun mother cards 


// 4. make child cards and store them 


// const params = generatorParameters({ enable_fuzz: true, enable_short_term: false });
// const f = fsrs(params);
// const card = createEmptyCard(new Date('2022-2-1 10:00:00'));// createEmptyCard();
// const now = new Date('2022-2-2 10:00:00');// new Date();
// const scheduling_cards = f.repeat(card, now);

// for (const item of scheduling_cards) {
//     // grades = [Rating.Again, Rating.Hard, Rating.Good, Rating.Easy]
//     const grade = item.log.rating
//     const { log, card } = item;
//     // console.group(`${Rating[grade]}`);
//     // console.table({
//     //     [`card_${Rating[grade]}`]: {
//     //         ...card,
//     //         due: formatDate(card.due),
//     //         last_review: formatDate(card.last_review as Date),
//     //     },
//     // });

//     // console.log("\n\n")
//     // console.table({
//     //     [`log_${Rating[grade]}`]: {
//     //         ...log,
//     //         review: formatDate(log.review),
//     //     },
//     // });
//     // console.groupEnd();
//     console.log('----------------------------------------------------------------');
// }

// //item is 
// // {
// //   card: { 
// //     due: 2022-02-19T09:00:00.000Z,
// //     stability: 15.4722,
// //     difficulty: 3.2828565,
// //     elapsed_days: 0,
// //     scheduled_days: 17,
// //     reps: 1,
// //     lapses: 0,
// //     state: 2,
// //     last_review: 2022-02-02T09:00:00.000Z
// //   },
// //   log: {
// //     rating: 4,
// //     state: 0,
// //     due: 2022-02-01T09:00:00.000Z,
// //     stability: 0,
// //     difficulty: 0,
// //     elapsed_days: 0,
// //     last_elapsed_days: 0,
// //     scheduled_days: 0,
// //     review: 2022-02-02T09:00:00.000Z
// //   }
// // }