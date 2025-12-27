import { Integer, Property, Format, Allow, Enum } from '@tsed/schema';
import { promo_type } from '../enums-and-constants/inventoryService.enum';

export class Category {
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

  @Property(Number)
  @Integer()
  priority: number;

  @Property(Number)
  @Integer()
  @Allow(null)
  promotionPriority: number | null;

  @Enum(promo_type)
  @Allow(null)
  categoryPromo: promo_type | null;

  @Property(Number)
  @Integer()
  @Allow(null)
  amount: number | null;

  @Property(String)
  category_image: string | null;
}
