import type { Distribution, Gov, Minting, Slashing, Staking } from '@/screens/params/types';
import { DgovParams, OversightCommitteeGroup } from '@/models/dgov_params';
import { nanoToSeconds, secondsToDays } from '@/utils/time';
import type { TFunction } from '@/hooks/useAppTranslation';
import numeral from 'numeral';

const convertBySeconds = (seconds: number, t: TFunction) => {
  const SECONDS_IN_DAY = 86400;
  return seconds >= SECONDS_IN_DAY
    ? t('days', {
        day: secondsToDays(seconds),
      })
    : t('seconds', {
        second: seconds,
      });
};

export const formatStaking = (data: Staking, t: TFunction) => [
  {
    key: 'bondDenom',
    label: t('bondDenom'),
    detail: data.bondDenom,
  },
  {
    key: 'unbondingTime',
    label: t('unbondingTime'),
    detail: convertBySeconds(nanoToSeconds(data.unbondingTime), t),
  },
  {
    key: 'maxEntries',
    label: t('maxEntries'),
    detail: numeral(data.maxEntries).format('0,0'),
  },
  {
    key: 'historicalEntries',
    label: t('historicalEntries'),
    detail: numeral(data.historicalEntries).format('0,0'),
  },
  {
    key: 'maxValidators',
    label: t('maxValidators'),
    detail: numeral(data.maxValidators).format('0,0'),
  },
];

export const formatSlashing = (data: Slashing, t: TFunction) => [
  {
    key: 'downtimeJailDuration',
    label: t('downtimeJailDuration'),
    detail: t('seconds', {
      second: numeral(nanoToSeconds(data.downtimeJailDuration)).format('0,0'),
    }),
  },
  {
    key: 'minSignedPerWindow',
    label: t('minSignedPerWindow'),
    detail: `${numeral(data.minSignedPerWindow * 100).format('0.[00]')}%`,
  },
  {
    key: 'signedBlockWindow',
    label: t('signedBlockWindow'),
    detail: numeral(data.signedBlockWindow).format('0,0'),
  },
  {
    key: 'slashFractionDoubleSign',
    label: t('slashFractionDoubleSign'),
    detail: `${data.slashFractionDoubleSign * 100} / 100`,
  },
  {
    key: 'slashFractionDowntime',
    label: t('slashFractionDowntime'),
    detail: `${data.slashFractionDowntime * 10000} / ${numeral(10000).format('0,0')}`,
  },
];

export const formatMinting = (data: Minting, t: TFunction) => [
  {
    key: 'blocksPerYear',
    label: t('blocksPerYear'),
    detail: numeral(data.blocksPerYear).format('0,0'),
  },
  {
    key: 'goalBonded',
    label: t('goalBonded'),
    detail: `${numeral(data.goalBonded * 100).format('0.[00]')}%`,
  },
  {
    key: 'inflationMax',
    label: t('inflationMax'),
    detail: `${numeral(data.inflationMax * 100).format('0.[00]')}%`,
  },
  {
    key: 'inflationMin',
    label: t('inflationMin'),
    detail: `${numeral(data.inflationMin * 100).format('0.[00]')}%`,
  },
  {
    key: 'inflationRateChange',
    label: t('inflationRateChange'),
    detail: `${numeral(data.inflationRateChange * 100).format('0.[00]')}%`,
  },
  {
    key: 'mintDenom',
    label: t('mintDenom'),
    detail: data.mintDenom,
  },
];

export const formatDistribution = (data: Distribution, t: TFunction) => [
  {
    key: 'baseProposerReward',
    label: t('baseProposerReward'),
    detail: `${numeral(data.baseProposerReward * 100).format('0.[00]')}%`,
  },
  {
    key: 'bonusProposerReward',
    label: t('bonusProposerReward'),
    detail: `${numeral(data.bonusProposerReward * 100).format('0.[00]')}%`,
  },
  {
    key: 'communityTax',
    label: t('communityTax'),
    detail: `${numeral(data.communityTax * 100).format('0.[00]')}%`,
  },
  {
    key: 'withdrawAddressEnabled',
    label: t('withdrawAddressEnabled'),
    detail: `${data.withdrawAddressEnabled}`.toUpperCase(),
  },
];

export const formatGov = (data: Gov, t: TFunction) => [
  {
    key: 'minDeposit',
    label: t('minDeposit'),
    detail: `${data.minDeposit.value} ${data.minDeposit.displayDenom.toUpperCase()}`,
  },
  {
    key: 'maxDepositPeriod',
    label: t('maxDepositPeriod'),
    detail: convertBySeconds(nanoToSeconds(data.maxDepositPeriod), t),
  },
  {
    key: 'quorum',
    label: t('quorum'),
    detail: `${numeral(data.quorum * 100).format('0.[00]')}%`,
  },
  {
    key: 'threshold',
    label: t('threshold'),
    detail: `${numeral(data.threshold * 100).format('0.[00]')}%`,
  },
  {
    key: 'vetoThreshold',
    label: t('vetoThreshold'),
    detail: `${numeral(data.vetoThreshold * 100).format('0.[00]')}%`,
  },
  {
    key: 'votingPeriod',
    label: t('votingPeriod'),
    detail: convertBySeconds(nanoToSeconds(data.votingPeriod), t),
  },
];

export const formatDgov = (data: DgovParams, t: TFunction) => [
  {
    key: 'oversight committee',
    label: t('Veto Grace Period'),
    detail: convertBySeconds(data.grace_period, t),
  },
];

export const formatOversightCommitteeGroup = (data: OversightCommitteeGroup, t: TFunction) => {
  const mems = data.group_members.flatMap((member, index) => [
    {
      key: member.member_address,
      label: t(`Member ${index + 1}`),
      detail: member.member_address,
    },
    {
      key: `${member.member_address} weight`,
      label: t(`Member ${index + 1} Voting Weight`),
      detail: member.weight,
    },
    {
      key: `${member.member_address} added at`,
      label: t(`Member ${index + 1} Added At`),
      detail: member.added_at,
    },
  ]);

  const params = [
    {
      key: 'group_policy_address',
      label: t('Group Policy Address'),
      detail: data.group_policy_address,
    },
    {
      key: 'group_admin',
      label: t('Group Admin'),
      detail: data.group_admin,
    },
    {
      key: 'group_id',
      label: t('Group ID'),
      detail: data.group_id,
    },
    {
      key: 'group_policy_admin',
      label: t('Group Policy Admin'),
      detail: data.group_policy_admin,
    },
    {
      key: 'metadata',
      label: t('Metadata'),
      detail: data.metadata,
    },
    {
      key: 'decision_policy_type',
      label: t('Decision Policy Type'),
      detail: data.decision_policy_type,
    },
    {
      key: 'voting_period',
      label: t('Voting Period'),
      detail: data.voting_period,
    },
    {
      key: 'min_execution_period',
      label: t('Min Execution Period'),
      detail: data.min_execution_period,
    },
    {
      key: 'threshold',
      label: t('Threshold'),
      detail: data.threshold,
    },
  ];

  return [...params, ...mems];
};
