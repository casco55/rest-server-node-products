const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es necesario'],
        unique: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El usuario es necesario']
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'La categoria es necesaria']
    },
    description: {
        type: String,
        required: [true, 'La descripcion es necesaria']
    },
    available: {
        type: Boolean,
        default: true
    }
});

ProductSchema.methods.toJSON = function() {
    const { __v, state, ...data } = this.toObject();
    return data;
}

module.exports = model('Product', ProductSchema);
