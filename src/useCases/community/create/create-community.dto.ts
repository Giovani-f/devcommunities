interface ICreateCommunityRequestDTO {
    name: string;
    description: string;
    image: string;
    links: {
        provider: string;
        link: string;
    }[];
    tags: string[];
}

interface ICreateCommunityResponseDTO {
    id: string;
    name: string;
}

export { ICreateCommunityRequestDTO, ICreateCommunityResponseDTO };
