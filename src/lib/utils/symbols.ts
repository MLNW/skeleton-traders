export const convertSymbolToName = (symbol: string) => {
  return symbol
    .split('_')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join(' ');
};
