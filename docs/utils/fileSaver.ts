// Found on: https://stackoverflow.com/questions/13405129/javascript-create-and-save-file

export function saveFile(data: string, filename: string, type: string) {
  const file = new Blob([data], { type });
  if (window.navigator.msSaveOrOpenBlob) { // IE10+
    window.navigator.msSaveOrOpenBlob(file, filename);
  } else { // Other browsers
    const aTag = document.createElement('a');
    const url = URL.createObjectURL(file);
    aTag.href = url;
    aTag.download = filename;
    document.body.appendChild(aTag);

    aTag.click();
    setTimeout(() => {
      document.body.removeChild(aTag);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}

export type FileType = 'num' | 'alpha';

export async function fetchData(type: FileType, count: number): Promise<string> {
  try {
    const response = await fetch('/api/filegen', {
      method: 'POST',
      body: JSON.stringify({
        type,
        count
      })
    });
    const json = await response.json();
    return json.data;
  } catch (e) {
    throw new Error('Unable to fetch data');
  }
}
