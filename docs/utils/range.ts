export default function* (end: number, start: number = 0) {
  for (let i = start; i < end + 1; i++) {
    yield i;
  }
}
