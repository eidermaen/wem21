export interface Exercise {
  id: number,
  title: string,
  description: string
}

const data: Exercise[] = [
  {
    id: 1,
    title: 'Einführung',
    description: 'HTTP, URI, HTML und CSS'
  },
  {
    id: 2,
    title: 'Responsives Web',
    description: 'Unterwegs ein gutes Layout'
  },
  {
    id: 3,
    title: 'JavaScript',
    description: 'Programmiersprache für das Web'
  },
  {
    id: 4,
    title: 'DOM',
    description: 'Der Baum im Web'
  },
  {
    id: 5,
    title: 'Asynchron',
    description: 'Data-Fetching und Co'
  },
  {
    id: 6,
    title: 'SVG',
    description: 'Skalierende Zeichnungen'
  },
  {
    id: 7,
    title: 'Node & npm & Deno',
    description: 'Javascript für das Backend'
  },
  {
    id: 8,
    title: 'Modular Web',
    description: 'Wiederverwendbarkeit hält Einzug'
  },
  {
    id: 9,
    title: 'PWA',
    description: 'Die native App aus dem Browser'
  },
  {
    id: 10,
    title: 'Vue',
    description: 'Frameworks für das Frontend'
  },
  {
    id: 11,
    title: 'WebAssembly',
    description: 'Mehr Programmiersprachen für das Web'
  },
  {
    id: 12,
    title: 'Security',
    description: 'Sicherheit für alle'
  }
];

export default data;
