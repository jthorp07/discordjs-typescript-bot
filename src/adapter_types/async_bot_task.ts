export type IAsyncBotTask = {
    taskName: string,
    runner: (() => Promise<boolean>),
    onFail?: (() => Promise<boolean>),
    useTask: boolean,
}