import * as R from 'ramda';
import type { Categories } from '@/models/msg/types';
import { Buffer } from 'buffer';

const decode = (str: string): string => Buffer.from(str, 'base64').toString('binary');

class MsgVerifiablePresentation {
  public category: Categories;
  public presentation: string;
  public disclosedValues: string;
  public type: string;
  public json: object;

  constructor(payload: object) {
    const presentation = decode(R.pathOr('', ['presentation'], payload));
    this.category = 'dchain';
    this.presentation = presentation;
    this.disclosedValues = parsePresentation(presentation);
    this.type = R.pathOr('', ['type'], payload);
    this.json = R.pathOr({}, ['json'], payload);
  }

  static fromJson(json: object): MsgVerifiablePresentation {
    const presentation = decode(R.pathOr('', ['presentation'], json));
    return {
      category: 'dchain',
      json,
      type: R.pathOr('', ['@type'], json),
      presentation: presentation,
      disclosedValues: parsePresentation(presentation),
    };
  }
}

const parsePresentation = (presentation: string): string => {
  const DIVIDER = '~';
  const disclosures: { [key: string]: string } = {};
  const parts = presentation.split(DIVIDER).slice(1, -1);
  parts.forEach((item: string) => {
    const decoded = JSON.parse(decode(item));
    disclosures[decoded[1]] = decoded[2];
  });
  return JSON.stringify(disclosures, null, 2);
};

export default MsgVerifiablePresentation;
