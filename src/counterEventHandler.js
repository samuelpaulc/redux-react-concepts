export function updateCounter (counters, index, isIncrement) {
    counters[index] = counters[index] || 0;
    return [
        ...counters.slice(0, index),
        isIncrement ? ++counters[index] : --counters[index],
        ...counters.slice(index + 1)
    ];
}