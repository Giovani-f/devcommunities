import { Community } from "@entities/community.entity";
import { IBaseRepository } from "@repositories/base-repository.interface";

interface ICommunityRepository extends IBaseRepository<Community> {
    findByName(name: string): Community | null;
}

export { ICommunityRepository };
