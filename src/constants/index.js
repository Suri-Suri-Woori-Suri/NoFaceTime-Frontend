export const API_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
  DELETE: 'DELETE'
};

export const MENU_MODE = {
  OUT: 'Out',
  MIC: 'mic',
  MUTE: 'mute',
  INVITE: 'Invite',
  STUDENTS: 'Students',
  PUBLIC_CHAT: 'PublicChat',
  SCREEN_SHARE: 'ScreenShare',
  QUESTION_CHAT: 'QuestionChat'
};

export const MY_VIDEO_MODE = {
  HOST: 'host',
  PEER: 'peer'
};

export const FACE_STATUS = {
  DEFAULT: 'default',
  NEUTRAL: 'neutral',
  HAPPY: 'happy',
  SAD: 'sad',
  ANGRY: 'angry',
  DISGUSTED: 'disgusted',
  FEARFUL: 'fearful',
  SURPRIZED: 'surprized'
};

export const SOCKET_EVENT = {
  JOIN_ROOM: 'join room',
  JOIN_MYSELF: 'join myself',
  JOIN_NEW_MEMBER: 'join new member',
  SEND_SIGNAL_FROM_NEW_MEMBER: 'send signal from new member',
  CONVEY_SIGNAL_FROM_NEW_MEMBER: 'convey signal from new member',
  SENDBACK_SIGANL_FROM_EXISTING_MEMBER: 'sendback signal from existing member',
  CONVEY_SIGNAL_FROM_EXISTING_MEMBER: 'convey signal from existing member',
  MESSAGE_PUBLIC: 'message public',
  MESSAGE_SECRET: 'message secret',
  DUPLICATE: 'duplicate',
  LEAVE_ROOM: 'leave room',
  MEMBER_LEFT: 'member left',
  DISCONNECT: 'disconnect',
};

export const BACKGROUND_IMG = {
  NOTEBOOK: 'https://two-face-time.s3.ap-northeast-2.amazonaws.com/background-image/notebook.jpg',
  DETECTING_FACE: 'https://two-face-time.s3.ap-northeast-2.amazonaws.com/background-image/detecting-face.gif',
  WAITING_HOST: 'https://two-face-time.s3.ap-northeast-2.amazonaws.com/background-image/waiting-host.png',
  WAITING_MEMBER: 'https://two-face-time.s3.ap-northeast-2.amazonaws.com/background-image/waiting-member.png',
  LOADING: 'https://two-face-time.s3.ap-northeast-2.amazonaws.com/background-image/loading.png',
  RIGHTSIDE: 'https://two-face-time.s3.ap-northeast-2.amazonaws.com/background-image/rightside.png'
};

export const EMOJI = {
  NEUTRAL: 'https://two-face-time.s3.ap-northeast-2.amazonaws.com/emoji/smile.png',
  HAPPY: 'https://two-face-time.s3.ap-northeast-2.amazonaws.com/emoji/happy.png',
  SAD: 'https://two-face-time.s3.ap-northeast-2.amazonaws.com/emoji/sad.png',
  ANGRY: 'https://two-face-time.s3.ap-northeast-2.amazonaws.com/emoji/angry.png',
  ANGRY_WITH_WORD: 'https://two-face-time.s3.ap-northeast-2.amazonaws.com/emoji/angry-with-word.png',
  DISGUSTED: 'https://two-face-time.s3.ap-northeast-2.amazonaws.com/emoji/disgusted.png',
  FEARFUL: 'https://two-face-time.s3.ap-northeast-2.amazonaws.com/emoji/fearful.png',
  SURPRIZED: 'https://two-face-time.s3.ap-northeast-2.amazonaws.com/emoji/surprized.png',
  NO_FACE: 'https://two-face-time.s3.ap-northeast-2.amazonaws.com/emoji/no-face.png'
};
