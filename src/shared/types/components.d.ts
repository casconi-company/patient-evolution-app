declare type IconProps = {
  className?: string;
};

declare interface ModalWithFormProps<T, K = {}> {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  onChangeValue?: (value: T) => Promise<void>;
  currentValue?: string;
  modalData?: K[];
}
