export const roles = ['BUYER', 'SELLER'] as const;
export type Role = (typeof roles)[number];