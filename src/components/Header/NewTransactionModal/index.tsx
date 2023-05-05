import * as Dialog from "@radix-ui/react-dialog";
import * as z from "zod";
import { ArrowCircleUp, ArrowCircleDown, X } from "phosphor-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useContextSelector } from "use-context-selector";

import { TransactionsContext } from "../../../contexts/TransactionsContext";

import * as S from "./styles";

const newTransactionModalSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(["income", "outcome"]),
});

type NewTransactionFormInputs = z.infer<typeof newTransactionModalSchema>;

export function NewTransactionModal() {
  const createTransaction = useContextSelector(
    TransactionsContext,
    (context) => context.createTransaction
  );
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionModalSchema),
    defaultValues: {
      type: "income",
    },
  });

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    const { category, description, price, type } = data;

    await createTransaction({
      category,
      description,
      price,
      type,
    });

    reset();
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
              {...register("description")}
              required
            />
            <input
              type="text"
              placeholder="Price"
              {...register("price", { valueAsNumber: true })}
              required
            />
            <input
              type="text"
              placeholder="Category"
              {...register("category")}
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
