import { Router } from 'express'
import * as premiumCtrl from './premiumCobro.controller'

const router = Router();

router.get('/premiumPlans', premiumCtrl.getPlans);



export default router