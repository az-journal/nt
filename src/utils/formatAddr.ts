export const formatAddr = (addr: string | null): string => {
    if (!addr) return '';
    const formatted = `${addr.slice(2, 6)}...${addr.slice(-4)}`.toUpperCase();
    return `0x${formatted}`;
};
