let knightPosition = [0, 0];
let observer = null;

function emitChange(knightPosition) {
  observer(knightPosition);
}

export function observe(o) {
  if (observer) {
    throw new Error('Multiple observers not implemented.');
  }

  observer = o;
  setInterval(() => emitChange([
    Math.floor(Math.random() * 8),
    Math.floor(Math.random() * 8)
  ]), 500);
}

export function moveKnight(toX, toY) {
  knightPosition = [toX, toY];
  emitChange();
}