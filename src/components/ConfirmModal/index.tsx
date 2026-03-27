interface ConfirmModalProps {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({ title, description, onConfirm, onCancel }: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-modal p-8 rounded-md w-full max-w-md shadow-lg">
        <h2 className="text-title text-2xl font-bold mb-4">{title}</h2>
        <p className="text-gray-600 mb-6">{description}</p>
        
        <div className="flex justify-end gap-4">
          <button 
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancelar
          </button>
          <button 
            onClick={onConfirm}
            className="px-4 py-2 bg-outcome text-white rounded-md hover:brightness-90 transition-all"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}