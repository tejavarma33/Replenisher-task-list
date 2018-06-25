//Require Mongoose
const mongoose = require('mongoose');

// Define schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: Schema.ObjectId,
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    updated: {type: Date, default: Date.now},
    created: {type: Date, default: Date.now}
});
UserSchema.statics.findOneOrCreate = function findOneOrCreate(condition, callback) {
    const self = this;
    self.findOne(condition, (err, result) => {
        return result ? callback(err, result) : self.create(condition, (err, result) => {
            return callback(err, result)
        })
    })
};


// Compile model from schema
const User = mongoose.model('User', UserSchema);

module.exports = User;