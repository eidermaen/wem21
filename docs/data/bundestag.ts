export interface Party {
  name: string;
  seats: number;
  color: string;
}

export const data: Party[] = [
  {
    name: "SPD",
    seats: 206,
    color: "red"
  },
  {
    name: "CDU/CSU",
    seats: 197,
    color: "black"
  },
  {
    name: "Bündnis 80/ Die Grüne",
    seats: 118,
    color: "green"
  },
  {
    name: "FDP",
    seats: 92,
    color: "yellow"
  },
  {
    name: "AfD",
    seats: 82,
    color: "blue"
  },
  {
    name: "Die Linke",
    seats: 39,
    color: "pink"
  },
  {
    name: "fratkionslos",
    seats: 2,
    color: "gray"
  }
]
