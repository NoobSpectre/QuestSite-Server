import express from 'express';
import {
  getAllProblems,
  getProblem,
  getProblemDiscussions,
  postAnswer,
} from '../controllers/problems.js';
import { patchDiscussion } from '../controllers/problems.js';

const router = express.Router();

router.get('/all', getAllProblems);

router.post('/:pid', postAnswer);
router.get('/:pid', getProblem);

router.get('/:pid/discussions', getProblemDiscussions);
router.patch('/:pid/discussions', patchDiscussion);

export default router;
