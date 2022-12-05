import { Router } from 'express'
import * as premiumCtrl from './premiumCobro.controller'

const router = Router();

router.post('/premiumCobroFront', premiumCtrl.procesarCobroFront);

router.post('/premiumCobroWebhook', premiumCtrl.procesarCobroWebhook);

export default router