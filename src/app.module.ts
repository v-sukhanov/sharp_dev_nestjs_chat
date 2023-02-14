import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageScheme } from './schemas/message.shema';

@Module({
	imports: [
		MongooseModule.forRoot('mongodb://localhost:27017/nest_socket_test'),
		MongooseModule.forFeature([
			{
				name: Message.name,
				schema: MessageScheme
			}
		])
	],
	controllers: [AppController],
	providers: [AppService, AppGateway],
})
export class AppModule {
}
