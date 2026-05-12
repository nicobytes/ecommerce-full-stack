import { ChatMessage } from './chat.types';

export const CHAT_MOCK_MESSAGES: ChatMessage[] = [
  {
    id: 'm1',
    placement: 'start',
    authorName: 'NgStore',
    timeLabel: '10:02',
    text: 'Hi there — thanks for visiting NgStore. How can we help you today?',
    footer: 'Delivered',
    avatarInitials: 'NG',
    bubbleTone: 'neutral',
  },
  {
    id: 'm2',
    placement: 'end',
    authorName: 'You',
    timeLabel: '10:04',
    text: 'Do you ship internationally?',
    footer: 'Seen',
    avatarInitials: 'YO',
    bubbleTone: 'info',
  },
  {
    id: 'm3',
    placement: 'start',
    authorName: 'NgStore',
    timeLabel: '10:05',
    text: 'Yes — we ship to most countries. Rates and delivery times vary by region at checkout.',
    footer: 'Delivered',
    avatarInitials: 'NG',
    bubbleTone: 'primary',
  },
];
