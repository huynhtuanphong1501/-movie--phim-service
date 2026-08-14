import { Injectable } from '@nestjs/common';
import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../prisma/generated/prisma/client.js";
import { DATABASE_URL } from "../../common/constants/app.constant";

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        const url = new URL(DATABASE_URL as string);
        const adapter = new PrismaMariaDb({
            host: url.hostname,
            user: url.username,
            password: url.password,
            database: url.pathname.slice(1),
            port: Number(url.port),
            allowPublicKeyRetrieval: true,
        });
        super({ adapter });
    }
    async onModuleInit() {
        try {
            await this.$queryRaw`SELECT 1+1 AS result`;
            console.log('[PRISMA - PHIM] Connection has been established successfully.');
        } catch (error) {
            console.error('[PRISMA - PHIM] Unable to connect to the database:', error);
        }
    }
}
