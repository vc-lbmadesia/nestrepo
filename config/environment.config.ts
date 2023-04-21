/* eslint-disable @typescript-eslint/naming-convention */
export const _DEV_ = (): boolean => process.env.NODE_ENV === 'development';
export const _PROD_ = (): boolean => process.env.NODE_ENV === 'production';
export const _TEST_ = (): boolean => process.env.NODE_ENV === 'test';
