import Typography from '@mui/material/Typography';
import AppTrans from '@/components/AppTrans';
import { FC } from 'react';
import { MsgStoreCode } from '@/models';

const StoreCode: FC<{ message: MsgStoreCode }> = (props) => {
  const { message } = props;
  const { sender, instantiate_permission } = message;
  return (
    <div>
      <Typography>
        <AppTrans
          i18nKey={
            instantiate_permission !== ''
              ? 'message_contents:txMsgStoreCodeWithPermission'
              : 'message_contents:txMsgStoreCodeWithoutPermission'
          }
          components={[<b />]}
          values={{
            sender: sender,
            instantiate_permission: instantiate_permission,
          }}
        />
      </Typography>
    </div>
  );
};

export default StoreCode;
