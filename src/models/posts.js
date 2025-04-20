const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 200,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    excerpt: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      required: true,
    },
    author_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Staff',
      required: true,
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },
    published_at: {
      type: Date,
      default: null,
    },
    image: {
      type: String,
      default: '',
    },
    meta_title: {
      type: String,
      default: '',
      maxlength: 100,
    },
    meta_description: {
      type: String,
      default: '',
      maxlength: 200,
    },
    view_count: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// Indexes tương đương với MySQL
postSchema.index({ slug: 1 }, { unique: true });
postSchema.index({ status: 1 });
postSchema.index({ author_id: 1 });

// Fulltext index (MongoDB hỗ trợ Atlas Search hoặc sử dụng $text index cơ bản)
postSchema.index({ title: 'text', content: 'text' });

module.exports = mongoose.model('Post', postSchema);
