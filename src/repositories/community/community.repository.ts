import { provide } from "inversify-binding-decorators";
import { ICommunityRepository } from "./community-repository.interface";
import { Community } from "@entities/community.entity";
import { ICreateCommunityRequestDTO } from "@useCases/community/create/create-community.dto";
import { PrismaClientProvider } from "@providers/database/orm/prisma-client.provider";

@provide(CommunityRepository)
class CommunityRepository implements ICommunityRepository {
    constructor(private prismaClient: PrismaClientProvider) {}

    async create(
        community: ICreateCommunityRequestDTO,
    ): Promise<Community | null> {
        const communityCreated =
            await this.prismaClient.client.community.create({
                data: {
                    name: community.name,
                    description: community.description,
                    links: {
                        create: community.links,
                    },
                    tags: community.tags,
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    links: true,
                    tags: true,
                },
            });

        if (!communityCreated) {
            return null;
        }

        return {
            id: communityCreated.id,
            name: communityCreated.name,
            description: communityCreated.description,
            links: communityCreated.links as Community["links"],
            tags: communityCreated.tags,
        };
    }
}

export { CommunityRepository };
