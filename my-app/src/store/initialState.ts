export enum Language {
  RU = 'RU',
  EN = 'EN',
}

interface AppState {
  language: Language;
}

interface InitialState {
  app: AppState;
}

export const initialState: InitialState = {
  app: {
    language: Language.RU,
  },
};
