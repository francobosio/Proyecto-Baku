import axios from 'axios';

export const getPlanesPremium = async () => {
    return await axios.get('http://localhost:4000/premiumPlans');
}

export const nuevoPlanPremium = async (formData: {}) => {
    return await axios.post('http://localhost:4000/premiumPlan', formData);
}   

export const eliminarPlanPremium = async (id: string) => {
    return await axios.delete('http://localhost:4000/premiumPlan/delete/' + id)
}

export const editarPlanPremium = async (id: string, formData: {}) => {
    return await axios.put('http://localhost:4000/premiumPlan/update/' + id, formData)
}