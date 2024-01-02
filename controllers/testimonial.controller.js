import { TestimonialModel } from './../models/Testimonial.schema.js';

export const createNew = async (req, res, next) => {
    try {
        const { user, description,image } = req.body;
        const newTestimonial = await TestimonialModel.create({ user, description,image });
        res.status(201).json({ message: 'Testimonial created successfully', data: newTestimonial });
    } catch (error) {
        next(error);
    }
};

export const getAll = async (req, res, next) => {
    try {
        const testimonials = await TestimonialModel.find();
        res.json({ data: testimonials });
    } catch (error) {
        next(error);
    }
};

export const getOneById = async (req, res, next) => {
    try {
        const testimonialId = req.params.id;
        const testimonial = await TestimonialModel.findById(testimonialId);
        if (!testimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }
        res.json({ data: testimonial });
    } catch (error) {
        next(error);
    }
};

export const updateOne = async (req, res, next) => {
    try {
        const testimonialId = req.params.id;
        const { user, description,image } = req.body;
        const updatedTestimonial = await TestimonialModel.findByIdAndUpdate(
            testimonialId,
            { user, description,image },
            { new: true }
        );
        if (!updatedTestimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }
        res.json({ message: 'Testimonial updated successfully', data: updatedTestimonial });
    } catch (error) {
        next(error);
    }
};

export const deleteOne = async (req, res, next) => {
    try {
        const testimonialId = req.params.id;
        const deletedTestimonial = await TestimonialModel.findByIdAndDelete(testimonialId);
        if (!deletedTestimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }
        res.json({ message: 'Testimonial deleted successfully', data: deletedTestimonial });
    } catch (error) {
        next(error);
    }
};
