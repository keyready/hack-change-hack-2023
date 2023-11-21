import {
    AddressInterface,
    CitizenShipInterface,
    DrivingLicenseInterface,
    INNInterface,
    PassportInterface,
    SnilsInterface,
} from './UserIntefaces';

export interface User {
    // просто какая-то строчка, хз
    sub?: string;
    // фамилия
    family_name?: string;
    // имя
    given_name?: string;
    // отчество
    middle_name?: string;
    birthdate?: Date;
    identification?: PassportInterface;
    inn?: INNInterface;
    snils?: SnilsInterface;
    driving_license?: DrivingLicenseInterface;
    phone_number?: string;
    email?: string;
    gender?: 1;
    citizenship?: CitizenShipInterface;
    place_of_birth?: string;
    address?: AddressInterface;
    address_reg?: AddressInterface;
}
