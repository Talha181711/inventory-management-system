<?php

namespace App\Http\Controllers;

use App\Models\ModelItem;
use Illuminate\Http\Request;

class ModelItemController extends Controller
{
    public function index()
    {
        $models = ModelItem::with('brand')
            ->withCount('items')
            ->latest()
            ->paginate(10);

        return response()->json($models);
    }
    public function getByBrand($brand_id)
{
    $models = ModelItem::where('brand_id', $brand_id)->get();

    return response()->json($models);
}
    public function store(Request $request)
    {
        $request->validate([
            'brand_id' => 'required',
            'name' => 'required'
        ]);

        $model = ModelItem::create([
            'brand_id' => $request->brand_id,
            'name' => $request->name
        ]);

        return response()->json([
            'message' => 'Model created',
            'model' => $model
        ]);
    }

    public function update(Request $request, $id)
    {
        $model = ModelItem::findOrFail($id);

        $model->update([
            'brand_id' => $request->brand_id,
            'name' => $request->name
        ]);

        return response()->json([
            'message' => 'Model updated'
        ]);
    }

    public function destroy($id)
    {
        ModelItem::findOrFail($id)->delete();

        return response()->json([
            'message' => 'Model deleted'
        ]);
    }
}