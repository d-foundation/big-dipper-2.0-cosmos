import * as R from 'ramda';
import type { Categories } from '@/models/msg/types';

class MsgRegisterNotaryInfo {
  public category: Categories;
  public sender: string;
  public notary_info: string;
  public vcv_route_and_additional_req: string;
  public type: string;
  public json: object;

  constructor(payload: object) {
    this.category = 'dchain';
    this.sender = R.pathOr('', ['sender'], payload);
    this.notary_info = JSON.stringify(R.pathOr('', ['notary_info'], payload), null, 2);
    const vcv_route_and_additional_req = R.pathOr('', ['vcv_route_and_additional_req'], payload);
    this.vcv_route_and_additional_req = vcv_route_and_additional_req
      ? JSON.stringify(vcv_route_and_additional_req, null, 2)
      : '';
    this.type = R.pathOr('', ['type'], payload);
    this.json = R.pathOr({}, ['json'], payload);
  }

  static fromJson(json: object): MsgRegisterNotaryInfo {
    const vcv_route_and_additional_req = R.pathOr('', ['vcv_route_and_additional_req'], json);
    return {
      category: 'dchain',
      json,
      type: R.pathOr('', ['@type'], json),
      sender: R.pathOr('', ['sender'], json),
      notary_info: JSON.stringify(R.pathOr('', ['notary_info'], json), null, 2),
      vcv_route_and_additional_req: vcv_route_and_additional_req
        ? JSON.stringify(vcv_route_and_additional_req, null, 2)
        : '',
    };
  }
}

export default MsgRegisterNotaryInfo;
