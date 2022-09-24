import { Params } from './params.model';

export interface Result<P extends Params, O> {
  meta: {
    filename: string
    params: P,
  }
  output: O,
}

export interface Calculation<P extends Params, O> {
  id: string,
  results: Result<P, O>[],
}
