function Modal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="rounded-lg bg-white p-8 shadow-2xl">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="mt-2 text-sm text-gray-500">{message}</p>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            className="rounded-sm bg-green-50 px-4 py-2 text-sm font-medium text-red-600"
            onClick={onConfirm}
          >
            Yes, I am sure
          </button>
          <button
            type="button"
            className="rounded-sm bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600"
            onClick={onClose}
          >
            No, go back
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;