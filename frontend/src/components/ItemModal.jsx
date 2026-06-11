import { useEffect, useState } from "react";
import { X } from "lucide-react";
import api from "../services/api";

export default function ItemModal({ open, onClose, onSave, item }) {
  const [form, setForm] = useState({
    name: "",
    amount: "",
    brand_id: "",
    model_id: "",
  });

  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  // fetch dropdown data
  useEffect(() => {
    if (open) {
      api.get("/brands").then((res) => {
        setBrands(Array.isArray(res.data) ? res.data : res.data.data || []);
      });

      setModels([]);
    }
  }, [open]);

  // fill form when editing
  useEffect(() => {
    setMessage("");
    setIsSuccess(false);
    if (item) {
      setIsEditMode(true);
      setForm({
        name: item.name || "",
        amount: item.amount || "",
        brand_id: item.brand_id || "",
        model_id: item.model_id || "",
      });

      // load models for existing brand
      if (item.brand_id) {
        api
          .get(`/models/by-brand/${item.brand_id}`)
          .then((res) => setModels(res.data));
      }
    } else {
      setIsEditMode(false);
      setForm({
        name: "",
        amount: "",
        brand_id: "",
        model_id: "",
      });
      setModels([]);
    }
  }, [item, open]);

  if (!open) return null;

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // when brand changes → fetch models from backend
    if (name === "brand_id") {
      const res = await api.get(`/models/by-brand/${value}`);

      setModels(res.data);

      // reset model selection
      setForm((prev) => ({
        ...prev,
        brand_id: value,
        model_id: "",
      }));
    }
  };
  //save new or updated item
  const handleSave = async () => {
    try {
      setLoading(true);
      setMessage("");

      await onSave(form);

      setIsSuccess(true);

      setMessage(
        isEditMode
          ? "✅ Item updated successfully."
          : "✅ Item added successfully.",
      );

      // Clear form after success
      setForm({
        name: "",
        amount: "",
        brand_id: "",
        model_id: "",
      });

      setModels([]);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          error.message ||
          "❌ Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  };
  // close modal and reset states
  const handleClose = () => {
    setMessage("");
    setLoading(false);
    setIsSuccess(false);

    setForm({
      name: "",
      amount: "",
      brand_id: "",
      model_id: "",
    });

    setModels([]);

    onClose();
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-[450px] relative">
        {/* close */}
        <button onClick={handleClose} className="absolute top-3 right-3">
          <X size={18} />
        </button>

        <h2 className="text-xl font-semibold mb-4">
          {isEditMode ? "Edit Item" : "Add Item"}
        </h2>
        {message && (
          <div
            className={`mb-4 p-3 rounded text-sm font-medium ${
              message.includes("✅")
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }`}
          >
            {message}
          </div>
        )}

        {/* NAME */}
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Item Name"
          className="w-full border p-2 rounded mb-3"
        />

        <input
          type="number"
          min="0"
          step="0.01"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount"
          className="w-full border p-2 rounded mb-3"
        />

        {/* BRAND */}
        <select
          name="brand_id"
          value={form.brand_id}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
        >
          <option value="">Select Brand</option>
          {Array.isArray(brands) &&
            brands.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
        </select>

        {/* MODEL */}
        <select
          name="model_id"
          value={form.model_id}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
        >
          <option value="">Select Model</option>
          {models.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>

        {/* BUTTONS */}
        <div className="flex justify-end gap-3">
          <button onClick={handleClose} className="px-4 py-2 border rounded">
            {isSuccess ? "Close" : "Cancel"}
          </button>

          <button
            onClick={handleSave}
            disabled={loading || isSuccess}
            className={`px-4 py-2 text-white rounded ${
              loading || isSuccess
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading
              ? isEditMode
                ? "Updating..."
                : "Adding..."
              : isSuccess
                ? isEditMode
                  ? "Updated"
                  : "Added"
                : isEditMode
                  ? "Update"
                  : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
