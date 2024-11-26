import dotenv from 'dotenv';
dotenv.config();
/* ------------------------------------------------------------------- */
import User from '../../models/user';
import { encryptPassword } from '../../utils/helpers';
import * as CONSTS from '../../utils/consts';
const { ADMIN_NAME, ADMIN_PASSWORD } = process.env;
/* ------------------------------------------------------------------- */

export async function initAdmin() {
  try {
    if (!ADMIN_NAME || !ADMIN_PASSWORD) {
      throw new Error(
        'ADMIN_NAME or ADMIN_PASSWORD environment variables are not set.'
      );
    }

    const existingAdmin = await User.findOne({
      name: ADMIN_NAME,
    });

    if (!existingAdmin) {
      const newPassword = encryptPassword(ADMIN_PASSWORD);
      await User.create({
        name: ADMIN_NAME,
        password: newPassword,
        role: 'admin',
      });
      console.log(CONSTS.CREATE_ADMIN);
    } else {
      console.log(CONSTS.ADMIN_IS_HERE);
    }
  } catch (err) {
    console.error('Error initializing admin:', err);
  }
}
