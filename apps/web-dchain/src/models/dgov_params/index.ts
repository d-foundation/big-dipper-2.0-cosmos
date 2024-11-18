interface RawDgovParams {
  params: {
    grace_period: number;
  };
}

export class DgovParams {
  public grace_period: number;

  constructor(payload: RawDgovParams) {
    this.grace_period = payload.params.grace_period;
  }

  static fromJson(data: any): DgovParams {
    return new DgovParams(data);
  }
}

interface RawInputOversightCommitteeGroup {
  address: string;
  group_policy: {
    address: string;
    admin_address: string;
    metadata: string;
    decision_policy: {
      '@type': string;
      windows: {
        voting_period: string;
        min_execution_period: string;
      };
      threshold: string;
    };
    group: {
      id: number;
      admin_address: string;
      group_members: Array<{
        member_address: string;
        weight: number;
        added_at: string;
      }>;
    };
  };
}

export class OversightCommitteeGroup {
  public group_policy_address: string;
  public group_admin: string;
  public group_id: number;
  public group_policy_admin: string;
  public metadata: string;
  public decision_policy_type: string;
  public voting_period: string;
  public min_execution_period: string;
  public threshold: string;
  public group_members: Array<{
    member_address: string;
    weight: number;
    added_at: string;
  }>;

  constructor(payload: RawInputOversightCommitteeGroup) {
    this.group_policy_address = payload.address;
    this.group_admin = payload.group_policy.group.admin_address;
    this.group_id = payload.group_policy.group.id;
    this.group_policy_admin = payload.group_policy.admin_address;
    this.metadata = payload.group_policy.metadata;
    this.decision_policy_type = payload.group_policy.decision_policy['@type'];
    this.voting_period = payload.group_policy.decision_policy.windows.voting_period;
    this.min_execution_period = payload.group_policy.decision_policy.windows.min_execution_period;
    this.threshold = payload.group_policy.decision_policy.threshold;
    this.group_members = payload.group_policy.group.group_members;
  }

  static fromJson(data: any): OversightCommitteeGroup {
    return new OversightCommitteeGroup(data);
  }
}
