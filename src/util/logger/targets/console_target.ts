import { ILogTarget } from "../../../types/logging";

const target: ILogTarget = {
    message: async (message, target) => {
        console.log(`[${target}]: ${message}`);
    },
    targets: []
}