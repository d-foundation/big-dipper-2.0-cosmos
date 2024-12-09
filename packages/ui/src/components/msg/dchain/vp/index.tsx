import Name from '@/components/name';
import { MsgVp } from '@/models';
import { useProfileRecoil } from '@/recoil/profiles/hooks';
import Typography from '@mui/material/Typography';
import AppTrans from '@/components/AppTrans';
import { FC } from 'react';

const DchainVP: FC<{ message: MsgVp }> = (props) => {
  const { message } = props;
  const validatorMoniker = message.validator;

  return (
    <Typography>
      <AppTrans
        i18nKey="message_contents:txVPContent"
        components={[<b />]}
        values={{
          validator: validatorMoniker,
        }}
      />
    </Typography>
  );
};

export default DchainVP;
