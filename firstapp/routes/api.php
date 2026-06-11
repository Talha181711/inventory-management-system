<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\ModelItemController;

Route::prefix('brands')->group(function () {
    Route::get('/', [BrandController::class, 'index']);
    Route::post('/', [BrandController::class, 'store']);
    Route::put('/{id}', [BrandController::class, 'update']);
    Route::delete('/{id}', [BrandController::class, 'destroy']);
});

Route::prefix('modelitems')->group(function () {
    Route::get('/', [ModelItemController::class, 'index']);
    Route::post('/', [ModelItemController::class, 'store']);
    Route::put('/{id}', [ModelItemController::class, 'update']);
    Route::delete('/{id}', [ModelItemController::class, 'destroy']);
});
Route::get('/models/by-brand/{brand_id}', [ModelItemController::class, 'getByBrand']);

use App\Http\Controllers\ItemController;

Route::prefix('items')->group(function () {
    Route::get('/', [ItemController::class, 'index']);
    Route::post('/', [ItemController::class, 'store']);
    Route::put('/{id}', [ItemController::class, 'update']);
    Route::delete('/{id}', [ItemController::class, 'destroy']);
});