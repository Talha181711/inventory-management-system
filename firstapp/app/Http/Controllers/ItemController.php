<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    // GET ALL ITEMS (with pagination)
    public function index()
    {
        $items = Item::with(['brand', 'model'])
            ->latest()
            ->paginate(10);

        return response()->json($items);
    }

    // CREATE ITEM
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'amount' => 'required|numeric|min:0',
            'brand_id' => 'required',
            'model_id' => 'required',
        ]);

        $item = Item::create($request->all());

        return response()->json([
            'message' => 'Item created successfully',
            'item' => $item
        ]);
    }

    // UPDATE ITEM
    public function update(Request $request, $id)
    {
        $item = Item::findOrFail($id);

        $item->update($request->all());

        return response()->json([
            'message' => 'Item updated successfully'
        ]);
    }

    // DELETE ITEM
    public function destroy($id)
    {
        Item::findOrFail($id)->delete();

        return response()->json([
            'message' => 'Item deleted successfully'
        ]);
    }
}