type ClientType = {
	clients_id: string;
	consent_datetime: null | string; // если нет согласия  === null => экран дачи согласия
	country: string;
	disabled: null | string;
	email: string;
	favorite_client_logistic_partners_points_id: string[];
	first_name: string;
	language: string;
	last_name: string;
	phone: string;
	phone_verify_datetime: string;
};

type CountryType = {
	country: string;
	currency: string;
	tel_mask: string;
	tel_prefix: string;
};

type UnitType = {
	detailed_description: string;
	name: string;
	picture: string;
	price_add_hypo: string;
	price_add_iron: string;
	price_basic: string;
	type_of_units_id: string; // добавлять иконки от type_of_units_id
};

type OrderType = {
	add_hypo: string;
	add_iron: string;
	amount: string;
	client_logistic_partners_points_id: string | null;
	clients_id: string;
	country: string;
	date_estimated_ready: string | null;
	datetime_closed: string | null;
	datetime_register: string;
	executors_id: string | null;
	id: string;
	last_step: string | null;
};

export enum StatusOrder {
	EDITABLE = 'editable',
	IN_PROCESS = 'in_process'
}

type OrderReportDetailType = OrderType & {
	status: StatusOrder;
	units_order: any[];
	photos: PhotoType[]
};
export type PhotoType = { 'filename': string, 'id': string }
type DataSettingClientType = {
	client: ClientType;
	countries: CountryType[];
	languages: string[];
	orders: OrderType[];
	status: string;
	units: UnitType[];
};
type LogisticsPointType = {
	id: string;
	logistic_partners_id: string;
	lat: string;
	lon: string;
	point_name: string;
	address: string;
	comment: string;
	hours: string;
	disabled: null | any; // ??
	country: string;
	name: string;
};

type DeleteOrderPayload = {
	orders_id: string;
	clients_id: string;
	token: string;
	comment: string;
};
type payloadUpdOrderType = {
	orders_id?: string;
	clients_id?: string;
	token?: string;
	services?: {
		hypo?: number;
		iron?: number;
	};
	units_order?: [
		{
			type_of_units_id: string;
			unit_count: string;
		}
	];
	client_logistic_partners_points_id?: string;
	amount?: string;
};

type ClientRegisterType = {
	clients_id: string;
	token: string;
	phone?: string;
	country?: string;
	language?: string;
	consent_datetime?: string;
};

type CreateOrderClientPrevType = {
	clients_id: string;
	token: string;
	services: CreateServicesDataType;
};

type CreateServicesDataType = {
	hypo: number;
	iron: number;
};

export {
	payloadUpdOrderType,
	DeleteOrderPayload,
	ClientRegisterType,
	CreateOrderClientPrevType,
	CreateServicesDataType,
	LogisticsPointType,
	OrderReportDetailType,
	OrderType,
	ClientType,
	DataSettingClientType,
	UnitType,
	CountryType,
}
