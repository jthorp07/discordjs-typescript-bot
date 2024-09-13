import { IStartupEvent } from "../../../types/startup";

const event: IStartupEvent = {
    event: "wait_five_seconds",
    critical: false,
    runner: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log("waited 5 seconds!");
                resolve(true);
            }, 5000);
        })
    },
    useEvent: false,
}

export default event;