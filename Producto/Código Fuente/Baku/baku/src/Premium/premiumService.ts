import axios from 'axios';
const backend = process.env.REACT_APP_BACKEND_URL;

//Planes Premium
export const getPlanesPremium = async () => {
    return await axios.get(`${backend}/premiumPlans`);
}

export const nuevoPlanPremium = async (formData: {}) => {
    return await axios.post(`${backend}/premiumPlan`, formData);
}   

export const eliminarPlanPremium = async (id: string) => {
    return await axios.delete(`${backend}/premiumPlan/delete/${id}`);
}

export const editarPlanPremium = async (id: string, formData: {}) => {
    return await axios.put(`${backend}/premiumPlan/update/${id}`, formData);
}


//Cobros Premium
export const procesarCobroFront = async (pagoData: {}) => {
    return await axios.post(`${backend}/premiumCobroFront`, pagoData);
}

export const obtenerCobrosId = async (id: string) => {
    return await axios.get(`${backend}/premiumCobro/${id}`);
}

export const obtenerCobros = async () => {
    return await axios.get(`${backend}/premiumCobro`);
}
