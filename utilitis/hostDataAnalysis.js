const isWithinInterval = require("date-fns/isWithinInterval");
const startOfToday = require("date-fns/startOfToday");
const subDays = require("date-fns/subDays");
const today = startOfToday();

const occHndler = (date, arr, prp) => {
    const one = arr.filter((el) =>
        isWithinInterval(date, { start: el.in, end: el.out })
    ).length;
    return (one / prp) * 100;
};
exports.getAnalysis = (stat,prop,stats,props)=>{
const longSummary = [
    {
        week: [
            {
                day: subDays(today, 1),
                occupied: occHndler(subDays(today, 1), stat, prop),
                otherOccupied:  occHndler(subDays(today, 1), stats, props),
            },
            {
                day: subDays(today, 2),
                occupied: occHndler(subDays(today, 2), stat, prop),
                otherOccupied:  occHndler(subDays(today, 1), stats, props),
            },
            {
                day: subDays(today, 3),
                occupied: occHndler(subDays(today, 3), stat, prop),
                otherOccupied:  occHndler(subDays(today, 1), stats, props),
            },
            {
                day: subDays(today, 4),
                occupied: occHndler(subDays(today, 4), stat, prop),
                otherOccupied:  occHndler(subDays(today, 1), stats, props),
            },
            {
                day: subDays(today, 5),
                occupied: occHndler(subDays(today, 5), stat, prop),
                otherOccupied:  occHndler(subDays(today, 1), stats, props),
            },
            {
                day: subDays(today, 6),
                occupied: occHndler(subDays(today, 6), stat, prop),
                otherOccupied:  occHndler(subDays(today, 1), stats, props),
            },
            {
                day: subDays(today, 7),
                occupied: occHndler(subDays(today, 7), stat, prop),
                otherOccupied:  occHndler(subDays(today, 1), stats, props),
            },
        ],
        month: [
            {
                day: subDays(today, 1),
                occupied: occHndler(subDays(today, 1), stat, prop),
                otherOccupied:  occHndler(subDays(today, 1), stats, props),
            },
            {
                day: subDays(today, 2),
                occupied: occHndler(subDays(today, 2), stat, prop),
                otherOccupied:  occHndler(subDays(today, 2), stats, props),
            },
            {
                day: subDays(today, 3),
                occupied: occHndler(subDays(today, 3), stat, prop),
                otherOccupied:  occHndler(subDays(today, 3), stats, props),
            },
            {
                day: subDays(today, 4),
                occupied: occHndler(subDays(today, 4), stat, prop),
                otherOccupied:  occHndler(subDays(today, 4), stats, props),
            },
            {
                day: subDays(today, 5),
                occupied: occHndler(subDays(today, 5), stat, prop),
                otherOccupied:  occHndler(subDays(today, 5), stats, props),
            },
            {
                day: subDays(today, 6),
                occupied: occHndler(subDays(today, 6), stat, prop),
                otherOccupied:  occHndler(subDays(today, 6), stats, props),
            },
            {
                day: subDays(today, 7),
                occupied: occHndler(subDays(today, 7), stat, prop),
                otherOccupied:  occHndler(subDays(today, 7), stats, props),
            },
            {
                day: subDays(today, 8),
                occupied: occHndler(subDays(today, 8), stat, prop),
                otherOccupied:  occHndler(subDays(today, 8), stats, props),
            },
            {
                day: subDays(today, 9),
                occupied: occHndler(subDays(today, 9), stat, prop),
                otherOccupied:  occHndler(subDays(today, 9), stats, props),
            },
            {
                day: subDays(today, 10),
                occupied: occHndler(subDays(today, 10), stat, prop),
                otherOccupied:  occHndler(subDays(today, 10), stats, props),
            },
            {
                day: subDays(today, 11),
                occupied: occHndler(subDays(today, 11), stat, prop),
                otherOccupied:  occHndler(subDays(today, 11), stats, props),
            },
            {
                day: subDays(today, 12),
                occupied: occHndler(subDays(today, 12), stat, prop),
                otherOccupied:  occHndler(subDays(today, 12), stats, props),
            },
            {
                day: subDays(today, 13),
                occupied: occHndler(subDays(today, 13), stat, prop),
                otherOccupied:  occHndler(subDays(today, 13), stats, props),
            },
            {
                day: subDays(today, 14),
                occupied: occHndler(subDays(today, 14), stat, prop),
                otherOccupied:  occHndler(subDays(today, 14), stats, props),
            },
            {
                day: subDays(today, 15),
                occupied: occHndler(subDays(today, 15), stat, prop),
                otherOccupied:  occHndler(subDays(today, 15), stats, props),
            },
            {
                day: subDays(today, 16),
                occupied: occHndler(subDays(today, 16), stat, prop),
                otherOccupied:  occHndler(subDays(today, 16), stats, props),
            },
            {
                day: subDays(today, 17),
                occupied: occHndler(subDays(today, 17), stat, prop),
                otherOccupied:  occHndler(subDays(today, 17), stats, props),
            },
            {
                day: subDays(today, 18),
                occupied: occHndler(subDays(today, 18), stat, prop),
                otherOccupied:  occHndler(subDays(today, 18), stats, props),
            },
            {
                day: subDays(today, 19),
                occupied: occHndler(subDays(today, 19), stat, prop),
                otherOccupied:  occHndler(subDays(today, 19), stats, props),
            },
            {
                day: subDays(today, 20),
                occupied: occHndler(subDays(today, 20), stat, prop),
                otherOccupied:  occHndler(subDays(today, 20), stats, props),
            },
            {
                day: subDays(today, 21),
                occupied: occHndler(subDays(today, 21), stat, prop),
                otherOccupied:  occHndler(subDays(today, 21), stats, props),
            },
            {
                day: subDays(today, 22),
                occupied: occHndler(subDays(today, 22), stat, prop),
                otherOccupied:  occHndler(subDays(today, 22), stats, props),
            },
            {
                day: subDays(today, 23),
                occupied: occHndler(subDays(today, 23), stat, prop),
                otherOccupied:  occHndler(subDays(today, 23), stats, props),
            },
            {
                day: subDays(today, 24),
                occupied: occHndler(subDays(today, 24), stat, prop),
                otherOccupied:  occHndler(subDays(today, 24), stats, props),
            },
            {
                day: subDays(today, 25),
                occupied: occHndler(subDays(today, 25), stat, prop),
                otherOccupied:  occHndler(subDays(today, 25), stats, props),
            },
            {
                day: subDays(today, 26),
                occupied: occHndler(subDays(today, 26), stat, prop),
                otherOccupied:  occHndler(subDays(today, 26), stats, props),
            },
            {
                day: subDays(today, 27),
                occupied: occHndler(subDays(today, 27), stat, prop),
                otherOccupied:  occHndler(subDays(today, 27), stats, props),
            },
            {
                day: subDays(today, 28),
                occupied: occHndler(subDays(today, 28), stat, prop),
                otherOccupied:  occHndler(subDays(today, 28), stats, props),
            },
            {
                day: subDays(today, 29),
                occupied: occHndler(subDays(today, 29), stat, prop),
                otherOccupied:  occHndler(subDays(today, 29), stats, props),
            },
            {
                day: subDays(today, 30),
                occupied: occHndler(subDays(today, 30), stat, prop),
                otherOccupied:  occHndler(subDays(today, 30), stats, props),
            },
        ],
        year: [
            {
                month: '01/20',
                occupied: 50,
                otherOccupied: 70
            },
            {
                month: '02/20',
                occupied: 50,
                otherOccupied: 50
            },
            {
                month: '03/20',
                occupied: 60,
                otherOccupied: 30
            },
            {
                month: '04/20',
                occupied: 70,
                otherOccupied: 60
            },
            {
                month: '05/20',
                occupied: 30,
                otherOccupied: 40
            },
            {
                month: '06/20',
                occupied: 70,
                otherOccupied: 60
            },
            {
                month: '07/20',
                occupied: 20,
                otherOccupied: 50
            },
            {
                month: '08/20',
                occupied: 40,
                otherOccupied: 30
            },
            {
                month: '09/20',
                occupied: 30,
                otherOccupied: 20
            },
            {
                month: '10/20',
                occupied: 40,
                otherOccupied: 70
            },
            {
                month: '11/20',
                occupied: 40,
                otherOccupied: 70
            },
            {
                month: '12/20',
                occupied: 40,
                otherOccupied: 70
            },
        ]
    }
]
return longSummary;
}