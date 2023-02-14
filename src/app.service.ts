import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from './schemas/message.shema';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class AppService {

	constructor(
		@InjectModel(Message.name) private _productModel: Model<MessageDocument>
	) {
	}

	async createMessage(message: MessageDto) {
		const newMessage = new this._productModel({
			email: message.email,
			text: message.text
		})
		return newMessage.save()
	}

	async getMessages() {
		return this._productModel.find()
	}
}
