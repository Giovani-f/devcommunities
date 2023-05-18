import { Community } from "@entities/community.entity";
import { ICreateCommunityRequestDTO } from "@useCases/community/create/create-community.dto";

interface ICommunityRepository {
    create(community: ICreateCommunityRequestDTO): Promise<Community | null>;
}

export { ICommunityRepository };
