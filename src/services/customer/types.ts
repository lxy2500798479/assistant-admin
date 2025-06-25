
// 定义 Level 和 Referrer 的接口
export interface Level {
  id: number;
  levelName: string;
  sortOrder: number;
  description: string;
}

export interface Referrer {
  id: string;
  nickname: string;
}

// 定义与API返回值完全匹配的 Customer 接口
export interface Customer {
  id: string;
  wxid: string;
  nickname: string;
  phoneNumber: string;
  registrationDate: string;
  levelId: number;
  referrerRobotId: string | null;
  level: Level;
  referrer: Referrer | null;
}


export interface CustomerSearchParams{
  nickname?: string;
  phoneNumber?: string;
  levelId?: number;
  pageSize?: number;
  current?: number;
}