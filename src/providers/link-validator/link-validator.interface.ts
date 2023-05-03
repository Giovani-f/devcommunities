interface ILinkValidator {
    validate(url: string, provider: string): boolean;
}

export { ILinkValidator };
