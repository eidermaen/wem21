export function getY(index: number, height?: number): number {
  let output = (index + 1) * 40;
  return height ? output - height : output;
}
