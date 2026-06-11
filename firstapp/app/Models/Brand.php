<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\ModelItem;

class Brand extends Model
{
    protected $fillable = ['name'];
    public function models()
    {
        return $this->hasMany(ModelItem::class, 'brand_id');
    }
    public function items()
    {
        return $this->hasMany(Item::class, 'brand_id');
    }
}
