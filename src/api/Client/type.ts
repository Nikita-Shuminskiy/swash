import {CountryCode} from 'react-native-country-picker-modal/lib/types'

type ClientType = {
    clients_id: string;
    consent_datetime: null | string; // если нет согласия  === null => экран дачи согласия
    country: CountryCode;
    disabled: null | string;
    email: string;
    favorite_client_logistic_partners_points_id: LogisticsPointType[]
    first_name: string;
    language: LanguageEnum;
    last_name: string;
    phone: string;
    phone_verify_datetime: string;
    pic: string
};

export enum LanguageEnum {
    EN = 'EN',
    PL = 'PL',
    RU = 'RU'
}
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
    approximated_date: string;
    add_iron: string;
    amount: string;
    clients_id: string;
    client_logistic_partners_points_id: string | null;
    country: string;
    date_estimated_ready: string | null;
    datetime_closed: string | null;
    datetime_register: string;
    executors_id: string | null;
    id: string;
    last_step: LastStep;
    status: StatusOrder;
};
type OrderReportDetailType = {
    amount: string;
    date_estimated_ready: string;
    services_pay?: string;
    balance?: string;
    basic_pay?: string;
    client_logistic_partners_points_id: string;
    client_logistic_partners_points_lat: string;
    client_logistic_partners_points_lon: string;
    country: string;
    datetime_closed: null | string;
    datetime_register: string;
    last_step: LastStep;
    last_step_datetime: string;
    orders_id: string;
    photos: PhotoType[];
    post_deadline: string;
    status: string;
    add_hypo: '0' | '1'
    add_iron: '0' | '1'
    units_order: UntilsOrderType[];
};

export enum StatusOrder {
    EDITABLE = 'editable',
    IN_PROCESS = 'in_process',
    COMPLETED = 'completed'
}

export enum LastStep {
    client_received = 'client_received', // просим оценки
    auction_open = 'auction_open', // ищем исполнителя
    executor_perfomed = 'executor_perfomed',// отнеси и сдай
    client_must_get = 'client_must_get',// забери
    executor_confirm_client_must_pay = 'executor_confirm&client_must_pay',// оплати
    executor_done_client_must_pay = 'executor_done&client_must_pay',// оплати
    client_sent = 'client_sent',// в процессе
    executor_must_get = 'executor_must_get',// в процессе
    executor_received = 'executor_received',// в процессе
    executor_confirm = 'executor_confirm',// в процессе
    executor_done = 'executor_done',// в процессе
    executor_sent = 'executor_sent',// в процессе
    admin_closed_order = 'admin_closed_order',// не показывать
    client_confirm = 'client_confirm',// не показывать
}

export type UntilsOrderType = {
    count: string
    id: string
    order_id: string
    type_of_units_id: string
}


export type PhotoType = { 'filename': string, 'id': string }
export type ClientTypicalMessagesType = {
    country: string,
    message: string
}
type DataSettingClientType = {
    client: ClientType;
    client_typical_messages: ClientTypicalMessagesType[]
    countries: CountryType[];
    languages: string[];
    orders: OrderType[];
    status: StatusOrder;
    units: UnitType[];
    message: string
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

type ClientRegisterPayloadType = {
    phone?: string,
    photo?: string,
    country?: string,
    first_name?: string,
    last_name?: string,
    language?: string,
    email?: string,
    consent_datetime?: string
}

type CreateOrderClientPrevType = {
    services: CreateServicesDataType;
};

type CreateServicesDataType = {
    hypo: number;
    iron: number;
};
type NotificationResponse = {
    "0": string,
    "executor_id": string,
    "need_to_reading_report": "0" | "1" | null,
    "push_id": string,
    "text": string,
    "order_id": number | null,
    "type": 'message',
    "type_of_picture": "go" | "pay" | "alarm" | "bench" | "perfect" | "message" | null
}
type GlobalSettingsType = {
    client_app_onboarding: ClientOnboardingType
    client_app_last_version: string
}
type ClientOnboardingType = {
    client_app_onboarding_1: string
    client_app_onboarding_2: string
    client_app_onboarding_3: string
    client_app_onboarding_4: string
    client_app_onboarding_5: string
    client_app_onboarding_text_1: string
    client_app_onboarding_text_2: string
    client_app_onboarding_text_3: string
    client_app_onboarding_text_4: string
    client_app_onboarding_text_5: string
}
export {
    GlobalSettingsType,
    ClientOnboardingType,
    payloadUpdOrderType,
    NotificationResponse,
    DeleteOrderPayload,
    ClientRegisterPayloadType,
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
