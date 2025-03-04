import * as R from 'ramda';
import type { Categories } from '@/models/msg/types';

class MsgStoreCode {
  public category: Categories;
  public sender: string;
  public instantiate_permission: string;
  public type: string;
  public json: object;

  constructor(payload: object) {
    this.category = 'dchain';
    this.sender = R.pathOr('', ['sender'], payload);
    const instantiate_permission = R.pathOr('', ['instantiate_permission'], payload);
    this.instantiate_permission = instantiate_permission
      ? JSON.stringify(instantiate_permission, null, 2)
      : '';
    this.type = R.pathOr('', ['type'], payload);
    this.json = R.pathOr({}, ['json'], payload);
  }

  static fromJson(json: object): MsgStoreCode {
    const instantiate_permission = R.pathOr('', ['instantiate_permission'], json);
    return {
      category: 'dchain',
      json,
      type: R.pathOr('', ['@type'], json),
      sender: R.pathOr('', ['sender'], json),
      instantiate_permission: instantiate_permission
        ? JSON.stringify(R.pathOr('', ['instantiate_permission'], json), null, 2)
        : '',
    };
  }
}

export default MsgStoreCode;
