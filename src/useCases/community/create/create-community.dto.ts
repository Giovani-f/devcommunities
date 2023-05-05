import { CommunityLink } from "@entities/community.entity";

interface ICreateCommunityRequestDTO {
    name: string;
    description: string;
    links: CommunityLink[];
    tags: string[];
}

interface ICreateCommunityResponseDTO {
    id: string;
    name: string;
}

export { ICreateCommunityRequestDTO, ICreateCommunityResponseDTO };
