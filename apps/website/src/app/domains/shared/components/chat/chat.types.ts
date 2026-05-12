export type ChatBubblePlacement = 'start' | 'end';

export type ChatBubbleTone =
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

export interface ChatMessage {
  id: string;
  placement: ChatBubblePlacement;
  text: string;
  authorName: string;
  timeLabel: string;
  footer?: string;
  avatarInitials?: string;
  bubbleTone?: ChatBubbleTone;
}
