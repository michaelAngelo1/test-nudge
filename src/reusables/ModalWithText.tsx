import { ModalInterface } from "../interface/reusables/ModalInterface";
import Modal from 'react-modal';

export default function ModalWithText({ ...props } : ModalInterface) {
  return (
    <Modal
      isOpen={props.openModal}
      onRequestClose={props.closeModal}
      className="fixed inset-0 flex items-center justify-center p-6"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-blue-900 p-6 rounded-lg w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto text-center">
        <div className="text-lg sm:text-xl md:text-2xl text-white font-medium mb-4">{props.title}</div>
        <div className="text-sm sm:text-base text-white font-medium mb-6">{props.text}</div>
        <button onClick={props.closeModal} className="m-3 p-2 sm:p-3 rounded-full bg-green-700 text-white">
          Yes I understand
        </button>
      </div>
    </Modal>
  )
}
