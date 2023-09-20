import { action, makeObservable, observable } from 'mobx'import { chatApi } from '../../api/ChatApi/chatApi'import { DialogType, SendMessagePayloadType } from '../../api/ChatApi/type'export class ChatStore {	dialog: DialogType[] = [] as DialogType[]	setDialog = (dialog: DialogType[]): void => {		this.dialog = dialog	}	async getDialog() {		const { data } = await chatApi.getDialog()		this.setDialog(data.messages)	}	async sendMessage(payload: SendMessagePayloadType) {		const { data } = await chatApi.sendMessage(payload)		console.log(data, 'data')	}	async sendMessageRead(message_id: string) {		const { data } = await chatApi.messageRead(message_id)		console.log(data, 'sendMessageRead')	}	async getPushMessages() {		const { data } = await chatApi.getPushMessages()		console.log(data, 'getPushMessages')	}	constructor() {		makeObservable(this, {			dialog: observable,			setDialog: action,			sendMessage: action,			sendMessageRead: action,			getPushMessages: action,		})		this.setDialog = this.setDialog.bind(this)	}}export default new ChatStore()