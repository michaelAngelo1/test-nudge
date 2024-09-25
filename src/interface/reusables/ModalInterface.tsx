export interface ModalInterface {
  title: string;
  text: string;
  openModal: boolean;
  closeModal: () => void;
}