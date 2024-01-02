import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    image: {
        type: String, 
    },
    category:{
        type:String,
        required: true
    },
    categoryClass:{
        type:String,
        required: true
    }
}, { timestamps: true });

export const ProjectModel = mongoose.model('Project', ProjectSchema);


