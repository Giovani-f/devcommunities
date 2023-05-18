import { provide } from "inversify-binding-decorators";
import { randomUUID } from "node:crypto";

type CommunityProvider = "discord" | "telegram" | "whatsapp" | "slack";

export type CommunityLink = {
    id?: string;
    provider: CommunityProvider;
    url: string;
};

@provide(Community)
class Community {
    public id: string;

    constructor(
        readonly name: string,
        readonly description: string | null,
        readonly links: CommunityLink[],
        readonly tags: string[],
    ) {
        this.id = randomUUID();
    }
}

export { Community };
