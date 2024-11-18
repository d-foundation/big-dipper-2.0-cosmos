import { NextSeo } from 'next-seo';
import useAppTranslation from '@/hooks/useAppTranslation';
import BoxDetails from '@/components/box_details';
import Layout from '@/components/layout';
import LoadAndExist from '@/components/load_and_exist';
import { useParams } from '@/screens/params/hooks';
import useStyles from '@/screens/params/styles';
import {
  formatDistribution,
  formatGov,
  formatMinting,
  formatSlashing,
  formatStaking,
  formatDgov,
  formatOversightCommitteeGroup,
} from '@/screens/params/utils';

const Params = () => {
  const { t } = useAppTranslation('params');
  const { classes } = useStyles();
  const { state } = useParams();

  const staking = state.staking
    ? {
        title: t('staking') ?? undefined,
        details: formatStaking(state.staking, t),
      }
    : null;

  const slashing = state.slashing
    ? {
        title: t('slashing') ?? undefined,
        details: formatSlashing(state.slashing, t),
      }
    : null;

  const minting = state.minting
    ? {
        title: t('minting') ?? undefined,
        details: formatMinting(state.minting, t),
      }
    : null;

  const distribution = state.distribution
    ? {
        title: t('distribution') ?? undefined,
        details: formatDistribution(state.distribution, t),
      }
    : null;

  const gov = state.gov
    ? {
        title: t('gov') ?? undefined,
        details: formatGov(state.gov, t),
      }
    : null;

  const dgov = state.dgov
    ? {
        title: t('Oversight Committee Params') ?? undefined,
        details: formatDgov(state.dgov, t),
      }
    : null;

  const oc_group = state.oc_group
    ? {
        title: t('Oversight Committee Group') ?? undefined,
        details: formatOversightCommitteeGroup(state.oc_group, t),
      }
    : null;

  return (
    <>
      <NextSeo
        title={t('params') ?? undefined}
        openGraph={{
          title: t('params') ?? undefined,
        }}
      />
      <Layout navTitle={t('params') ?? undefined}>
        <LoadAndExist loading={state.loading} exists={state.exists}>
          <span className={classes.root}>
            {staking && <BoxDetails {...staking} />}
            {slashing && <BoxDetails {...slashing} />}
            {minting && <BoxDetails {...minting} />}
            {distribution && <BoxDetails {...distribution} />}
            {oc_group && <BoxDetails {...oc_group} />}
            {gov && <BoxDetails {...gov} />}
            {dgov && <BoxDetails {...dgov} />}
          </span>
        </LoadAndExist>
      </Layout>
    </>
  );
};

export default Params;
