export const INITIAL_STATE = [];

export function updateCounter (state, index, isIncrement) {
    var { counters } = state;
    return {
        ...counters.slice(0, index),
        isIncrement ? counters[index]++ : counters[index]--,
        ...counters.slice(index + 1)
    };
}