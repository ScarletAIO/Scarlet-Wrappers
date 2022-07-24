import AnalyzeDto from './interface/Analyze.dto';
declare const _default: {
    readonly routes: Promise<string[]>;
    readonly routesWithAuth: Promise<string[]>;
    AnalyzeData(input: any): Promise<AnalyzeDto>;
};
export default _default;
