import Typography from '@mui/material/Typography';
import AppTrans from '@/components/AppTrans';
import { FC } from 'react';
import { MsgNotarise } from '@/models';

const Notarise: FC<{ message: MsgNotarise }> = (props) => {
  const { message } = props;
  const { sender, notary_info_id, data, salt } = message;

  return (
    <div>
      <Typography>
        <AppTrans
          i18nKey={'message_contents:txMsgNotarise'}
          components={[<b />]}
          values={{
            sender: sender,
            notary_info_id: notary_info_id,
          }}
        />
      </Typography>
      <Typography>
        <AppTrans
          i18nKey="message_contents:txMsgNotariseData"
          components={[<b />]}
          values={{
            data: data,
          }}
        />
      </Typography>
      <Typography>
        <AppTrans
          i18nKey="message_contents:txMsgNotariseSalt"
          components={[<b />]}
          values={{
            salt: salt,
          }}
        />
      </Typography>
    </div>
  );
};

export default Notarise;
