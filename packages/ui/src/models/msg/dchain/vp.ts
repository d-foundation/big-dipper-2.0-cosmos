import * as R from 'ramda';
import type { Categories } from '@/models/msg/types';

class MsgVP {
  public category: Categories;
  public validator: string;
  public type: string;
  public json: object;

  constructor(payload: object) {
    this.category = 'dchain';
    this.validator = R.pathOr('', ['validator'], payload);
    this.type = R.pathOr('', ['type'], payload);
    this.json = R.pathOr({}, ['json'], payload);
  }

  static fromJson(json: object): MsgVP {
    return {
      category: 'dchain',
      json,
      type: R.pathOr('', ['@type'], json),
      validator: R.pathOr('', ['validator'], json),
    };
  }
}

export default MsgVP;
