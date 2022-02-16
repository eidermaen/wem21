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

export async function generateFile(type: FileType, count: number): Promise<string> {
  try {
    const response = await fetch('/.netlify/functions/filegen', {
      method: 'POST',
      body: JSON.stringify({
        type,
        count
      })
    });
    const json = await response.json();
    return json.data;
  } catch (e) {
    throw handleError(e);
  }
}

export async function mergeFiles(one: string, two: string): Promise<string> {
  try {
    const response = await fetch('/.netlify/functions/filemerge', {
      method: 'POST',
      body: JSON.stringify({
        one,
        two
      })
    });
    const json = await response.json();
    return json.data;
  } catch (e) {
    throw handleError(e);
  }
}

function handleError(e: Error) {
  console.error(e);
  throw new Error('Unable to fetch data. See console for more information.');
}
