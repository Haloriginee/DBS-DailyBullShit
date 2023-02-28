import express from 'express';

import { createShowcase, deleteShowcase, getAllShowcases, getShowcaseDetail, updateShowcase} from '../controllers/showcase.controller.js';

const router = express.Router();

router.route('/').get(getAllShowcases);
router.route('/').post(createShowcase);
router.route('/:id').get(getShowcaseDetail);
router.route('/:id').patch(updateShowcase);
router.route('/:id').delete(deleteShowcase);

export default router;
