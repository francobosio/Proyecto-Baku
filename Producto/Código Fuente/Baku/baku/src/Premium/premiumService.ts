import axios from 'axios';
const backend = process.env.REACT_APP_BACKEND_URL;

export const getPlanesPremium = async () => {
    return await axios.get(`${backend}/premiumPlans`);
}

export const nuevoPlanPremium = async (formData: {}) => {
    return await axios.post(`${backend}/premiumPlan`, formData);
}   

export const eliminarPlanPremium = async (id: string) => {
    return await axios.delete(`${backend}/premiumPlan/delete/${id}`)
}

export const editarPlanPremium = async (id: string, formData: {}) => {
    return await axios.put(`${backend}/premiumPlan/update/${id}`, formData)
}