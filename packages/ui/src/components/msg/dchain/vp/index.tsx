import { MsgVerifiablePresentation } from '@/models';
import Typography from '@mui/material/Typography';
import AppTrans from '@/components/AppTrans';
import { FC } from 'react';

const VerifiablePresentation: FC<{ message: MsgVerifiablePresentation }> = (props) => {
  const { message } = props;
  const presentation = message.presentation;
  const disclosedValues = message.disclosedValues;
  const paradymURL = 'https://paradym.id/tools/sd-jwt-vc#s=' + presentation;

  return (
    <div>
      <Typography>
        <AppTrans
          i18nKey="message_contents:txMsgVerifiablePresentation"
          components={[<b />]}
          values={{
            presentation: presentation,
          }}
        />
      </Typography>
      <Typography>
        <AppTrans
          i18nKey="message_contents:txMsgVerifiablePresentationDisclosedValues"
          components={[<p />]}
          values={{
            disclosedValues: disclosedValues,
          }}
        />
      </Typography>
      <Typography>
        <AppTrans
          i18nKey="message_contents:txMsgVerifiablePresentationParadymLink"
          components={[
            <a href={paradymURL} target="_blank" rel="noreferrer" title="Paradym">
              ,
            </a>,
          ]}
        />
      </Typography>
    </div>
  );
};

export default VerifiablePresentation;
