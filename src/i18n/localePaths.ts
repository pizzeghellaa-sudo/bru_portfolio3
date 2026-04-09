export function switchLocalePath(pathname: string, to: 'en' | 'it'): string {
  return pathname.replace(/^\/(en|it)(\/|$)/, `/${to}$2`);
}
