let support: boolean | undefined;
export function supportsWebGL(): boolean {
  if (typeof document === 'undefined') return false;
  if (support !== undefined) return support;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2');
    support = !!gl;
    gl?.getExtension('WEBGL_lose_context')?.loseContext();
  } catch {
    support = false;
  }
  return support;
}
