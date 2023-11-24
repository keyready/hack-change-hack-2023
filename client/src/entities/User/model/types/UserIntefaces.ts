export interface AddressInterface {
    // Полный адрес
    full_address: string;
    // Идентификационный код объекта по ФИАС
    fias_code: string;
    // Почтовый индекс
    post_index: string;
    // Страна
    country: string;
    // Регион
    region: string;
    // Район
    district: string;
    // Город
    city: string;
    // Населенный пункт
    settlement: string;
    // Название улицы
    street: string;
    // Дом
    house: string;
    // Строение
    building: string;
    // Корпус
    bulk: string;
    // Квартира
    apartment: string;
}

export interface PassportInterface {
    // серия
    series: string;
    // номер
    number: string;
    // кем выдан
    issued_by: string;
    // когда выдан
    issued_date: string;
    // код подразделения
    code: string;
}

export interface INNInterface {
    number: string;
}

export interface SnilsInterface {
    number: string;
}

export interface DrivingLicenseInterface {
    number: string;
}

export interface CitizenShipInterface {
    // код страны
    country_code: string;
    // название страны
    country_name: string;
}

export type UserRoles = 'ADMIN' | 'MODERATOR' | 'USER';

export interface CreditShort {
    period: string;
    amount: number;
    interest_rate: number;
    status: 'NEW_REQUEST' | 'ACTIVE_REQUEST' | 'ACCEPTED_REQUEST' | 'REJECTED_REQUEST';
}
