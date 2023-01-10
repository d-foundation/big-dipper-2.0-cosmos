import Name from '@/components/name';
import { type MsgSaveProfile } from '@/models';
import { useProfileRecoil } from '@/recoil/profiles/hooks';
import Typography from '@mui/material/Typography';
import Trans from 'next-translate/Trans';
import React, { FC } from 'react';

const SaveProfile: FC<{ message: MsgSaveProfile }> = (props) => {
  const { message } = props;

  const creator = useProfileRecoil(message.creator);
  const creatorMoniker = creator ? creator?.name : message.creator;

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txSaveProfileContent"
        components={[<Name address={message.creator} name={creatorMoniker} />]}
      />
    </Typography>
  );
};

export default SaveProfile;
