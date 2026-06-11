import { useEffect, useState } from "react";
import api from "../services/api";
import ItemModal from "../components/ItemModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

export default function ItemsPage() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [items, setItems] = useState([]);

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchItems = async (pageNumber = 1) => {
    try {
      setLoading(true);

      const res = await api.get(`/items?page=${pageNumber}`);

      setItems(res.data.data);
      setPage(res.data.current_page);
      setLastPage(res.data.last_page);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const changePage = (newPage) => {
    fetchItems(newPage);
  };
  const saveItem = async (form) => {
    if (selectedItem) {
      await api.put(`/items/${selectedItem.id}`, form);
    } else {
      await api.post("/items", form);
    }

    await fetchItems(page);
  };
  const deleteItem = async () => {
    await api.delete(`/items/${deleteId}`);
    await fetchItems(page);
    // setDeleteId(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Items List</h1>

        <button
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          onClick={() => {
            setSelectedItem(null);
            setOpenModal(true);
          }}
        >
          Add New Item
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 shadow-md rounded-lg overflow-hidden">
          {/* HEADER */}
          <thead className="bg-gray-100 text-sm uppercase">
            <tr>
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Brand</th>
              <th className="p-3 border">Model</th>
              <th className="p-3 border">Amount</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="p-6 text-center text-gray-500">
                  Loading items...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-6 text-center text-gray-500">
                  No items found.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="text-center hover:bg-gray-50">
                  <td className="p-2 border">{item.id}</td>

                  <td className="p-2 border">{item.name}</td>

                  <td className="p-2 border">{item.brand?.name}</td>

                  <td className="p-2 border">{item.model?.name || "-"}</td>

                  <td className="p-2 border">{item.amount}</td>

                  <td className="p-2 border">
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>

                  <td className="p-2 border space-x-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                      onClick={() => {
                        setSelectedItem(item);
                        setOpenModal(true);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => {
                        setDeleteId(item.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center mt-5 gap-2">
        <button
          disabled={page === 1}
          onClick={() => changePage(page - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="px-3 py-1">
          Page {page} of {lastPage}
        </span>

        <button
          disabled={page === lastPage}
          onClick={() => changePage(page + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <ItemModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedItem(null);
        }}
        onSave={saveItem}
        item={selectedItem}
      />

      <ConfirmDeleteModal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={deleteItem}
      />
    </div>
  );
}
