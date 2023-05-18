import { CommunityLink } from "@entities/community.entity";

interface ICreateCommunityRequestDTO {
    name: string;
    description: string | null;
    links: CommunityLink[];
    tags: string[];
}

interface ICreateCommunityResponseDTO {
    id: string;
    name: string;
}

export { ICreateCommunityRequestDTO, ICreateCommunityResponseDTO };
