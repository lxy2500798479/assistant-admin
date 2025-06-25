export interface RobotInfo {
  id: number;
  username: string;
  nickname: string;
  avatar: string;
  status: string; // 你可能希望使用一个更具体的类型，例如 'online' | 'offline'
}


export interface LoginRobotResult {
  token: string;
  robotInfo: RobotInfo;
}


export interface LoginRobotParams {
  username: string;
  password: string;
}


