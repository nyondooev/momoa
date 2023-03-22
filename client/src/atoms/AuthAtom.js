import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const localStorage = typeof window !== `undefined` ? window.localStorage : null;

const { persistAtom } = recoilPersist({
  key: 'user',
  storage: localStorage,
});

const AuthAtom = atom({
  key: 'auth',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

const FinishAtom = atom({
  key: 'finish',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export { AuthAtom, FinishAtom };
