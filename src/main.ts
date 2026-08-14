import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { RABBITMQ_URL } from './common/constants/app.constant';

async function bootstrap() {
  console.log("[Microservice] Phim service");
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [RABBITMQ_URL!],
      queue: 'phim_queue',
      queueOptions: {
        durable: true,
      },
      socketOptions: {
        connectionOptions: {
          clientProperties: {
            connection_name: 'phim-service',
          },
        },
      },
    },
  });
  await app.listen();
}
bootstrap();
