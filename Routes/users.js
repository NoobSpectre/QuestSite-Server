import { Router } from 'express';
import {
  createUser,
  getUser,
  loginUser,
  patchAvatar,
  getAvatar,
  deleteAvatar,
  patchBirthday,
  patchGender,
  patchLocation,
  patchTotalDiscussions,
  patchTotalSolutions,
  patchTotalSolved,
  logoutUser,
  patchUsername,
} from '../controllers/users.js';
import { validatepwd, encryptpwd } from '../middlewares/user/password.js';
import { uploadAvatar } from '../middlewares/user/avatar.js';
import { isNewUser, verifyUser } from '../middlewares/user/verifyUser.js';
import { auth } from '../middlewares/user/auth.js';

const router = Router();

/* REGISTRATION */
router.post('/new', isNewUser, validatepwd, encryptpwd, createUser);

/* LOGIN */
router.post('/login', verifyUser, loginUser);

/* LOGOUT */
router.get('/logout', logoutUser);

/* GET USER PROFILE */
router.get('/:username', auth, getUser);

/* UPDATE USER PROFILE */

// UPDATE, GET AND DELETE AVATAR
router
  .route('/:username/avatar')
  .patch(
    /* if no image is passed delete file - call delete image endpoint */
    auth,
    uploadAvatar,
    patchAvatar
  )
  .get(auth, getAvatar)
  .delete(auth, deleteAvatar);

// UPDATE GENDER
router.patch('/:username/username', auth, patchUsername);

// UPDATE GENDER
router.patch('/:username/gender', auth, patchGender);

// UPDATE BIRTHDAY
router.patch('/:username/birthday', auth, patchBirthday);

// UPDATE LOCATION
router.patch('/:username/location', auth, patchLocation);

// UPDATE TOTAL_SOLUTIONS
router.patch('/:username/total_solutions', auth, patchTotalSolutions);

// UPDATE TOTAL_DISCUSSIONS
router.patch('/:username/total_discussions', auth, patchTotalDiscussions);

// UPDATE TOTAL_SOLVED
router.patch('/:username/total_solved', auth, patchTotalSolved);

/* USER PROBLEMS ENDPOINT */
// router.patch('/:username/problems');

/* USER TODO ENDPOINT */

export default router;
