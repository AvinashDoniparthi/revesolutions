export function cn(...inputs: (string | undefined | null | false | Record<string, boolean>)[]) {
  return inputs
    .map((input) => {
      if (!input) return '';
      if (typeof input === 'string') return input;
      if (typeof input === 'object') {
        return Object.entries(input)
          .filter(([, val]) => Boolean(val))
          .map(([key]) => key)
          .join(' ');
      }
      return '';
    })
    .filter(Boolean)
    .join(' ');
}
