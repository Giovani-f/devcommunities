import { PrismaClient } from "@prisma/client";
import { provide } from "inversify-binding-decorators";

@provide(PrismaClientProvider)
class PrismaClientProvider {
    public client: PrismaClient;
    constructor() {
        this.client = new PrismaClient();
    }
}

export { PrismaClientProvider };
