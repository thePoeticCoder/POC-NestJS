import {
  Default,
  Description,
  Enum,
  Maximum,
  Minimum,
  MinLength,
  Nullable,
  Property,
  Required,
} from '@tsed/schema';
import {
  PINCODE_MIN,
  PINCODE_MAX,
} from '../enums-and-constants/global.constants';
import { AddressTypeEnum } from '../enums-and-constants/global.enum';

export class Address {
  @Description('Address Name')
  @Required()
  addressName: string;

  @Description('address is primary')
  @Default(false)
  isPrimary: boolean;

  @Description('Address line 1')
  @Required()
  @MinLength(3)
  addressLine1: string;

  @Property()
  @Description('Building No. or flat no.')
  buildingOrFlatNo?: string;

  @Description('Address line 2')
  addressLine2: string;

  @Description('District')
  district: string;

  @Description('City')
  city: string;

  @Description('State')
  state: string;

  @Description('Country')
  country: string;

  @Required()
  @Minimum(PINCODE_MIN)
  @Maximum(PINCODE_MAX)
  @Description('Pin Code')
  pincode: number;

  @Required()
  @Description('Address type (Work/home/Hospital/others)')
  @Enum(AddressTypeEnum)
  addressType: AddressTypeEnum;

  @Property()
  @Description('Landmark')
  @Nullable(String)
  landmark: string | null;

  @Property()
  @Description('Device Location (lat,long)')
  @Nullable(String)
  addressGeoLocation: string | null;
}
