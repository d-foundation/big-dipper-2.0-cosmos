export type BaseCategories =
  | 'bank'
  | 'crisis'
  | 'distribution'
  | 'governance'
  | 'slashing'
  | 'staking'
  | 'profiles'
  | 'ibc'
  | 'ibc-transfer'
  | 'authz'
  | 'feegrant'
  | 'vesting'
  | 'others';
export type CustomCategories = 'dchain'; // custom modules
export type Categories = BaseCategories | CustomCategories;
export interface Log {
  events?: Array<{
    type?: string;
    attributes?: Array<{
      key?: string;
      value?: string;
    }>;
  }>;
}
