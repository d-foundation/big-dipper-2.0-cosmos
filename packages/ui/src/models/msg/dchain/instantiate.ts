import * as R from 'ramda';
import type { Categories } from '@/models/msg/types';

class MsgInstantiateContract {
  public category: Categories;
  public sender: string;
  public admin: string;
  public label: string;
  public codeId: number;
  public msg: string;
  public type: string;
  public json: object;

  constructor(payload: object) {
    this.category = 'dchain';
    this.sender = R.pathOr('', ['sender'], payload);
    this.admin = R.pathOr('', ['admin'], payload);
    this.label = R.pathOr('', ['label'], payload);
    this.codeId = R.pathOr(0, ['codeId'], payload);
    this.msg = JSON.stringify(R.pathOr('', ['msg'], payload), null, 2);
    this.type = R.pathOr('', ['type'], payload);
    this.json = R.pathOr({}, ['json'], payload);
  }

  static fromJson(json: object): MsgInstantiateContract {
    return {
      category: 'dchain',
      json,
      type: R.pathOr('', ['@type'], json),
      sender: R.pathOr('', ['sender'], json),
      admin: R.pathOr('', ['admin'], json),
      label: R.pathOr('', ['label'], json),
      codeId: R.pathOr(0, ['code_id'], json),
      msg: JSON.stringify(R.pathOr('', ['msg'], json), null, 2),
    };
  }
}

export default MsgInstantiateContract;
