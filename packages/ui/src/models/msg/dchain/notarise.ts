import * as R from 'ramda';
import type { Categories } from '@/models/msg/types';
import { Buffer } from 'buffer';

const decode = (str: string): string => Buffer.from(str, 'base64').toString('binary');

class MsgNotarise {
  public category: Categories;
  public sender: string;
  public notary_info_id: string;
  public data: string;
  public salt: string;
  public type: string;
  public json: object;

  constructor(payload: object) {
    this.category = 'dchain';
    this.sender = R.pathOr('', ['sender'], payload);
    this.notary_info_id = R.pathOr('', ['notary_info_id'], payload);
    this.data = decode(R.pathOr('', ['data'], payload));
    this.salt = decode(R.pathOr('', ['salt'], payload));
    this.type = R.pathOr('', ['type'], payload);
    this.json = R.pathOr({}, ['json'], payload);
  }

  static fromJson(json: object): MsgNotarise {
    return {
      category: 'dchain',
      json,
      type: R.pathOr('', ['@type'], json),
      sender: R.pathOr('', ['sender'], json),
      notary_info_id: R.pathOr('', ['notary_info_id'], json),
      data: decode(R.pathOr('', ['data'], json)),
      salt: decode(R.pathOr('', ['salt'], json)),
    };
  }
}

export default MsgNotarise;
