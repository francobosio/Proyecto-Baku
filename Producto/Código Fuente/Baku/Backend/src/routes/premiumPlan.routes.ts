import { Router } from 'express'
import * as premiumCtrl from './premiumPlan.controller'

const router = Router();

router.get('/premiumPlans', premiumCtrl.getPlans);

router.post('/premiumPlan', premiumCtrl.createPlan);

router.put('/premiumPlan/update/:id', premiumCtrl.updatePlan);

router.delete('/premiumPlan/delete/:id', premiumCtrl.deletePlan);

export default router