import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function ConfirmDeleteModal({ open, onClose, onConfirm }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    if (!open) {
      setLoading(false);
      setMessage("");
      setDeleted(false);
    }
  }, [open]);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      setMessage("");

      await onConfirm();

      setDeleted(true);
      setMessage("✅ Item deleted successfully.");
    } catch (error) {
      setMessage("❌ Failed to delete item.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setLoading(false);
    setMessage("");
    setDeleted(false);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96 relative">
        <button onClick={handleClose} className="absolute top-3 right-3">
          <X size={18} />
        </button>

        <h2 className="text-lg font-semibold">
          {deleted ? "Item Deleted" : "Are you sure you want to delete?"}
        </h2>

        {message && (
          <div
            className={`mt-4 p-3 rounded text-sm font-medium ${
              message.includes("✅")
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }`}
          >
            {message}
          </div>
        )}

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={handleClose} className="px-4 py-2 border rounded">
            {deleted || message.includes("❌") ? "Close" : "Cancel"}
          </button>

          <button
            onClick={handleConfirm}
            disabled={loading || deleted}
            className={`px-4 py-2 text-white rounded ${
              loading || deleted
                ? "bg-red-300 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {loading ? "Deleting..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
