export interface DataEntity {
  id: string;
}
export interface Movie extends DataEntity {
  director: string;
}
export interface Song extends DataEntity {
  singer: string;
}
export interface Comic extends DataEntity {
  issueNumber: string
}

export type DataEntityMap = {
  movie: Movie;
  song: Song;
  // comic: Comic;
};

type DataStoreMethods = {
  [K in keyof DataEntityMap as `getAll${Capitalize<K>}s`]: () => DataEntityMap[K][];
} & {
  [K in keyof DataEntityMap as `get${Capitalize<K>}`]: (id: string) => DataEntityMap[K];
} & {
  [K in keyof DataEntityMap as `clear${Capitalize<K>}s`]: () => void;
} & {
  [K in keyof DataEntityMap as `add${Capitalize<K>}`]: (newItem: DataEntityMap[K]) => DataEntityMap[K];
}

export class DataStore implements DataStoreMethods {
  #data: {
    [K in keyof DataEntityMap]: Record<string, DataEntityMap[K]>
  } = {
    movie: {},
    song: {}
  }

  isDefined<T>(x: T | undefined): x is T {
    return typeof x !== 'undefined'
  }

  getAllSongs(): Song[] {
    return Object.keys(this.#data.song).map(key => {
      return this.#data.song[key]
    }).filter(this.isDefined.bind(this))
  }

  getSong(key: string): Song {
    const song = this.#data.song[key]
    if (!song) {
      throw new Error('Song not found')
    }
    return song
  }
  
  clearSongs(): void {
    this.#data['song'] = {}
  }
  
  addSong(newItem: Song): Song {
    this.#data.song[newItem.id] = newItem
    return newItem
  }

  getAllMovies(): Movie[] {
    return Object.keys(this.#data.movie).map(key => {
      return this.#data.movie[key]
    }).filter(this.isDefined.bind(this))
  }

  getMovie(key: string): Movie {
    const movie = this.#data.movie[key]
    if (!movie) {
      throw new Error('Moviet not found')
    }
    return movie
  }
  
  clearMovies(): void {
    this.#data['song'] = {}
  }
  
  addMovie(newItem: Movie): Movie {
    this.#data.movie[newItem.id] = newItem
    return newItem
  }
}
