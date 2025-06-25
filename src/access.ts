// src/access.ts

import { RobotInfo } from '@/services/login/types';

export default function access(initialState: { currentUser?: RobotInfo } | undefined) {
  const { currentUser } = initialState ?? {};
  return {

    isLoggedIn: !!currentUser,
  };
}