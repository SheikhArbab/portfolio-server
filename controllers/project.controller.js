import { ProjectModel } from './../models/Project.schema.js';

export const createNew = async (req, res, next) => {
    try {
        const {title,description,link,image,category,categoryClass} = req.body;
        const newProject = await ProjectModel.create({title,description,link,image,category,categoryClass});
        res.status(201).json({ message: 'Project created successfully', data: newProject });
    } catch (error) {
        next(error);
    }
};

export const getAll = async (req, res, next) => {
    try {
        const projects = await ProjectModel.find();
        res.json({ data: projects });
    } catch (error) {
        next(error);
    }
};

export const getOneById = async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const project = await ProjectModel.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json({ data: project });
    } catch (error) {
        next(error);
    }
};

export const updateOne = async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const {title,description,link,image,category,categoryClass} = req.body;
        const updatedProject = await ProjectModel.findByIdAndUpdate(
            projectId,
            {title,description,link,image,category,categoryClass},
            { new: true }
        );
        if (!updatedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json({ message: 'Project updated successfully', data: updatedProject });
    } catch (error) {
        next(error);
    }
};

export const deleteOne = async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const deletedProject = await ProjectModel.findByIdAndDelete(projectId);
        if (!deletedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json({ message: 'Project deleted successfully', data: deletedProject });
    } catch (error) {
        next(error);
    }
};

 