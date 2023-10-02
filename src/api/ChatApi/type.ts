type SendMessagePayloadType = {
	orders_id?: string
	photo?: string
	text?: string
}
type DialogType = {
	"admins_id": string,
	"admins_name": string,
	"admins_pic": null,
	"clients_id": string,
	"datetime_create":string,
	"datetime_read": null,
	"image": string,
	"message_id": string,
	"orders_id": string,
	"text": string,
	"type": null,
}
type ResponseDialogType = {
	status: string,
	messages: DialogType[]
}
export {
	DialogType,
	SendMessagePayloadType,
	ResponseDialogType,
}
