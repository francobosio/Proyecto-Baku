import { RequestHandler } from "express";
import mongoose from 'mongoose'; 
import PremiumPlan from "./PremiumPlan";
const ObjectId = mongoose.Types.ObjectId;

export const createPlan: RequestHandler = async (req, res) => {
    const { titulo, descripcion, urlCobro } = req.body
    const newPlan = { titulo, descripcion, urlCobro };

    const plan = new PremiumPlan(newPlan);
    await plan.save();
    res.json({ plan });
}


export const getPlans: RequestHandler = async (req, res) => {
    const respuestaBD = await PremiumPlan.find().exec();
    return res.json(respuestaBD);
}

export const updatePlan: RequestHandler = async (req, res) => {
    const planUpdated = await PremiumPlan.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!planUpdated) return res.status(204).json();
    res.json(planUpdated);
}