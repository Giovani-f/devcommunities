import { Community } from "@entities/community.entity";
import { BaseRepository } from "@repositories/base-repository";
import { provide } from "inversify-binding-decorators";
import { ICommunityRepository } from "./community-repository.interface";

@provide(CommunityRepository)
class CommunityRepository
    extends BaseRepository<Community>
    implements ICommunityRepository
{
    constructor() {
        super();
    }

    public findByName(name: string): Community | null {
        try {
            const community = this.USERDB.find((item) => item.name === name);
            return community || null;
        } catch (error: any) {
            throw error;
        }
    }
}

export { CommunityRepository };
