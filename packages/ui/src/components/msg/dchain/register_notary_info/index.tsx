import Typography from '@mui/material/Typography';
import AppTrans from '@/components/AppTrans';
import { FC } from 'react';
import { MsgRegisterNotaryInfo } from '@/models';

const RegisterNotaryInfo: FC<{ message: MsgRegisterNotaryInfo }> = (props) => {
  const { message } = props;
  const { sender, notary_info, vcv_route_and_additional_req } = message;

  return (
    <div>
      <Typography>
        <AppTrans
          i18nKey={
            vcv_route_and_additional_req !== ''
              ? 'message_contents:txRegisterNotaryInfoWithAdditionalReq'
              : 'message_contents:txRegisterNotaryInfoWithoutAdditionalReq'
          }
          components={[<b />]}
          values={{
            sender: sender,
            vcv_route_and_additional_req: vcv_route_and_additional_req,
          }}
        />
      </Typography>
      <Typography>
        <AppTrans
          i18nKey="message_contents:txMsgRegisterNotaryInfo"
          components={[<b />]}
          values={{
            notary_info: notary_info,
          }}
        />
      </Typography>
    </div>
  );
};

export default RegisterNotaryInfo;
