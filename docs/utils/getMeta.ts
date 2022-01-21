import data from '~/data/exercises';
import {MetaInfo} from 'vue-meta';
import getTitle from '~/utils/getTitle';

export default function getMeta(pageId: number): MetaInfo {
  const exercise = data.find(ex => ex.id === pageId);

  if (!exercise) {
    return {};
  }

  return {
    title: getTitle(exercise.title),
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {
        hid: exercise.id,
        name: exercise.title,
        content: exercise.description
      }
    ]
  }
}
