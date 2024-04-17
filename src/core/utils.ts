export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function parseTime(time: string): Date {
    const [hour, minute] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(hour, minute, 0, 0);
    return date;
}

// export function useSchedule()