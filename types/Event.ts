export interface Event<T> {
  name: string;
  once?: boolean;
  execute: (args: T) => void;
}
