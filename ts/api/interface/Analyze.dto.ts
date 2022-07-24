export default interface AnalyzeDto {
    LinkScan?: {
        detections: number,
        blocked: boolean,
        reason: string,
        domain: string
    };

    MsgScan?: {
        score: number,
        comparative: number | null,
        words: string[],
        positivity: {
            score: number,
            comparative: number | null,
            words: string[],
        },
        negativity: {
            score: number,
            comparative: number | null,
            words: string[],
        },
    };
}