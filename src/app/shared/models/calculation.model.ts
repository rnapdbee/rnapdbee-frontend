import { Params } from './params.model';

export interface Result<P extends Params, O> {
  params: P,
  output: O,
}

export interface Calculation<P extends Params, O> {
  id: string,
  filename: string,
  results: Result<P, O>[],
}
