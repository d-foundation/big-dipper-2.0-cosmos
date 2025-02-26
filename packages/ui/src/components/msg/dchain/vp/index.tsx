import Name from '@/components/name';
import { MsgVp } from '@/models';
import { useProfileRecoil } from '@/recoil/profiles/hooks';
import Typography from '@mui/material/Typography';
import AppTrans from '@/components/AppTrans';
import { FC } from 'react';

const DchainVP: FC<{ message: MsgVp }> = (props) => {
  const { message } = props;
  const validatorMoniker = message.validator;
  const disclosedValues = message.disclosedValues;

  return (
    <div>
      <Typography>
        <AppTrans
          i18nKey="message_contents:txVPContent"
          // components={[<b />]}
          components={[<Name address={message.validator} name={validatorMoniker} />]}
          values={{
            validator: validatorMoniker,
          }}
        />
      </Typography>
      <Typography>
        <AppTrans
          i18nKey="message_contents:txVPDisclosedValues"
          // components={[<b />]}
          components={[<p />]}
          values={{
            disclosedValues: JSON.stringify(disclosedValues, null, 2),
          }}
        />
      </Typography>
    </div>
  );
};

export default DchainVP;
