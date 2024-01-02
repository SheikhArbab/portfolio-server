import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: 'https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg' 
  }
}, { timestamps: true });

export const TestimonialModel = mongoose.model('Testimonial', TestimonialSchema);
