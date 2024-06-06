const { default: mongoose } = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    public: { type: Boolean, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);
