import { Integer, Property, Format, Allow, Enum } from '@tsed/schema';
import { promo_type } from '../enums-and-constants';

export class Partner {
  @Property(Number)
  @Integer()
  id: number;

  @Property(Date)
  @Format('date-time')
  createdAt: Date;

  @Property(Date)
  @Format('date-time')
  updatedAt: Date;

  @Property(Date)
  @Format('date-time')
  @Allow(null)
  deletedAt: Date | null;

  @Property(String)
  name: string;

  @Property(String)
  displayName: string;

  @Enum(promo_type)
  @Allow(null)
  partnerPromo: promo_type | null;

  @Property(Number)
  @Integer()
  @Allow(null)
  amount: number | null;
}
