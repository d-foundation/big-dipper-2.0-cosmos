import Typography from '@mui/material/Typography';
import AppTrans from '@/components/AppTrans';
import { FC } from 'react';
import MsgInstantiateContract from '@/models/msg/dchain/instantiate';

const InstantiateContract: FC<{ message: MsgInstantiateContract }> = (props) => {
  const { message } = props;
  const { sender, admin, codeId, label, msg } = message;

  return (
    <div>
      <Typography>
        <AppTrans
          i18nKey="message_contents:txInstantiateContract"
          // components={[<b />]}
          components={[<b />]}
          values={{
            sender: sender,
            admin: admin,
            codeId: codeId,
            label: label,
          }}
        />
      </Typography>
      <Typography>
        <AppTrans
          i18nKey="message_contents:txMsgInstantiateContract"
          // components={[<b />]}
          components={[<b />]}
          values={{
            msg: msg,
          }}
        />
      </Typography>
    </div>
  );
};

export default InstantiateContract;
