import { MsgVerifiablePresentation } from '@/models';

export const extensionOptionToMessage = <TMessage>(option) => {
  switch (option['@type']) {
    case '/d.vcv.v1.VerifiablePresentation':
      return MsgVerifiablePresentation.fromJson(option);
  }
};
