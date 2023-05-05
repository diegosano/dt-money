import * as Dialog from '@radix-ui/react-dialog';
import * as z from 'zod';
import { ArrowCircleUp, ArrowCircleDown, X } from 'phosphor-react';
import { zodResolver } from '@hookform/resolvers/zod';

import * as S from './styles';
import { Controller, useForm } from 'react-hook-form';

const newTransactionModalSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
});

type NewTransactionFormInputs = z.infer<typeof newTransactionModalSchema>;

export function NewTransactionModal() {
  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionModalSchema),
    defaultValues: {
      type: 'income',
    },
  });

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log(data);
  }

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

          <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
            <input
              type="text"
              placeholder="Description"
              {...register('description')}
              required
            />
            <input
              type="text"
              placeholder="Price"
              {...register('price', { valueAsNumber: true })}
              required
            />
            <input
              type="text"
              placeholder="Category"
              {...register('category')}
              required
            />

            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <S.TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <S.TransactionTypeButton variant="income" value="income">
                    <ArrowCircleUp size={24} />
                    Income
                  </S.TransactionTypeButton>

                  <S.TransactionTypeButton variant="outcome" value="outcome">
                    <ArrowCircleDown size={24} />
                    Outcome
                  </S.TransactionTypeButton>
                </S.TransactionType>
              )}
            />

            <button type="submit" disabled={isSubmitting}>
              Create
            </button>
          </form>
        </S.Content>
      </S.Overlay>
    </Dialog.Portal>
  );
}
