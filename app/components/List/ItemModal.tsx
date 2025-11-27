'use client';

import { NewItem } from '@/app/schema/item';
import { ButtonHTMLAttributes, ReactNode, useRef } from 'react';
import ItemForm from './ItemForm';

type Props = {
  onSubmit: (item: NewItem) => void;
  onButtonClick?: () => void;
  buttonText?: string;
  buttonIcon?: ReactNode;
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  buttonStyles?: string;
  item?: NewItem;
};
export default function ItemModal({
  onSubmit,
  onButtonClick,
  buttonText,
  buttonIcon,
  buttonProps,
  buttonStyles,
  item,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openDialog = () => dialogRef.current?.showModal();
  const closeDialog = () => dialogRef.current?.close();

  return (
    <>
      <button
        {...buttonProps}
        onClick={() => {
          openDialog();
          onButtonClick?.();
        }}
        className={`${buttonStyles}`}
      >
        {buttonText} {buttonIcon}
      </button>
      <dialog ref={dialogRef} id="my_modal_1" className="modal">
        <div className="modal-box  max-w-2xl min-w-sm">
          <button
            onClick={() => closeDialog()}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>

          <ItemForm
            item={item}
            onSubmit={(item: NewItem) => {
              onSubmit(item);
              closeDialog();
            }}
          />
        </div>
      </dialog>
    </>
  );
}
