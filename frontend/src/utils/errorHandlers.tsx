export function getErrorMessage(error: unknown): string {
  if (typeof error === 'object' && error !== null) {
    // @ts-ignore
    return error?.errors?.[0]?.message || (error as { message?: string }).message || 'Something went wrong';
  }
  return String(error) || 'Something went wrong';
}