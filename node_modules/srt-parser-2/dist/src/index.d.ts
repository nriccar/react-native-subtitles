export interface Line {
    id: string;
    startTime: string;
    endTime: string;
    text: string;
}
export default class Parser {
    seperator: string;
    correctFormat(time: string): string;
    private fixed_str_digit;
    private tryComma;
    private tryDot;
    fromSrt(data: string): {
        id: string;
        startTime: string;
        endTime: string;
        text: string;
    }[];
    toSrt(data: Array<Line>): string;
}
