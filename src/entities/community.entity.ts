import { provide } from "inversify-binding-decorators";
import { randomUUID } from "node:crypto";
import { IEntity } from "./base.entity";

enum CommunityProvider {
    discord = "discord",
    telegram = "telegram",
    whatsapp = "whatsapp",
    slack = "slack",
}

export type CommunityLink = {
    provider: CommunityProvider;
    link: string;
};

@provide(Community)
class Community implements IEntity {
    public id: string;

    constructor(
        readonly name: string,
        readonly description: string,
        readonly links: CommunityLink[],
        readonly tags: string[],
    ) {
        this.id = randomUUID();
    }
}

export { Community };
