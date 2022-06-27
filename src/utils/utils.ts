const createActualDate = (): Date => {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export const isExpire = (date: string): boolean => {
    const expire_date = new Date(date);
    const actual = createActualDate();
    return expire_date.getTime() - actual.getTime() < 0;
}