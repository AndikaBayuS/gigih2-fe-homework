export interface songDataInterface {
  uri: string;
  album: {
    images: [{ url: string }];
  };
  name: string;
  artists: [{ name: string }];
  isSelected: boolean;
}

export interface searchInterface {
  setSearchSong: (value: string) => void;
  getSong: () => void;
}

export interface songInterface {
  uri: string;
  image: string;
  title: string;
  album: string;
  selectState: (uri: string) => void;
  isSelected: boolean;
}

export interface tokenState {
  value: string;
}

export interface dialogInterface {
  total: number;
  showConfirmation: boolean;
}
