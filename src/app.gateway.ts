import {
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	SubscribeMessage,
	WebSocketGateway, WebSocketServer
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { AppService } from './app.service';
import { MessageDto } from './dto/message.dto';

@WebSocketGateway(81, {
	cors: {
		origin: '*',
	},
})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer() server: Server;

	constructor(private appService: AppService) {}

	@SubscribeMessage('sendMessage')
	async handleSendMessage(client: Socket, payload: MessageDto): Promise<void> {
		const message = await this.appService.createMessage(payload);
		this.server.emit('recMessage', message);
	}

	afterInit(server: Server) {
		console.log(server);
		//Выполняем действия
	}

	handleDisconnect(client: Socket) {
		console.log(`Disconnected: ${client.id}`);
		//Выполняем действия
	}

	handleConnection(client: Socket, ...args: any[]) {
		console.log(`Connected ${client.id}`);
		//Выполняем действия
	}
}
