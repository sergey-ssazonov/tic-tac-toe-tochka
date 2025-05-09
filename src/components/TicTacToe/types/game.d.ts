export type TPlayer = "X" | "O" | "";
export type TScore = { score: number; move?: number };
export type TWinnerResult = { player: TPlayer; line: number[] } | null;