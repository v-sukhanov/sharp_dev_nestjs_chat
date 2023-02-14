import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'

export type MessageDocument = Message & Document

@Schema()
export class Message {
	@Prop() email: string;
	@Prop() text: string;
	@Prop({
		default: Date.now()
	}) createdAt: Date;
}

export const MessageScheme = SchemaFactory.createForClass(Message)