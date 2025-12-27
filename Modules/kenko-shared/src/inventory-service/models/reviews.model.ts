import { Integer, Property, Format, Allow } from '@tsed/schema';

export class Reviews {
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
  userId: string;

  @Property(String)
  userName: string;

  @Property(Number)
  rating: number;

  @Property(String)
  review: string;

  @Property(Number)
  @Integer()
  productId: number;
}
