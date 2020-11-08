export abstract class AbstractParse {
    abstract bootstrap(): Promise<any>;
    abstract run(): Promise<any>;
}