import * as Dialog from '@radix-ui/react-dialog';
import { ArrowCircleUp, ArrowCircleDown, X } from 'phosphor-react';

import * as S from './styles';

export function NewTransactionModal() {
  return (
    <Dialog.Portal>
      <S.Overlay>
        <S.Content>
          <Dialog.Title>New transaction</Dialog.Title>

          <Dialog.Close asChild>
            <S.CloseButton>
              <X size={24} />
            </S.CloseButton>
          </Dialog.Close>

          <form action="">
            <input type="text" placeholder="Description" required />
            <input type="text" placeholder="Price" required />
            <input type="text" placeholder="Category" required />

            <S.TransactionType>
              <S.TransactionTypeButton variant="income" value="income">
                <ArrowCircleUp size={24} />
                Income
              </S.TransactionTypeButton>

              <S.TransactionTypeButton variant="outcome" value="outcome">
                <ArrowCircleDown size={24} />
                Outcome
              </S.TransactionTypeButton>
            </S.TransactionType>

            <button type="submit">Create</button>
          </form>
        </S.Content>
      </S.Overlay>
    </Dialog.Portal>
  );
}
