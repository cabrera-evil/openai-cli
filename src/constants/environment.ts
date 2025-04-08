import lodash from 'lodash';
import os from 'os';

export const username = lodash.capitalize(os.userInfo().username);
