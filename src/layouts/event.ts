import type { AllEvents, EventOptions } from "@/typings/event";

const event = <T extends keyof AllEvents>(
    name: T,
    options: EventOptions,
    handler: (client: ExtendedClient, ...args: Array<any>) => void,
) => ({
    name,
    options: {
        once: options.once,
        ignore: options.ignore || false
    },
    handler,
});

export default event;
