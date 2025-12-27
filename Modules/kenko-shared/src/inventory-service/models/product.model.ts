import {
  Integer,
  Property,
  Enum,
  CollectionOf,
  Format,
  Allow,
} from '@tsed/schema';
import { issuence, products_offer_type } from '../enums-and-constants';
import { Reviews } from './reviews.model';
import { Image } from './image.model';
import { Partner } from './partner.model';
import { Category } from './category.model';

export class Products {
  @Property(Number)
  @Integer()
  id: number;

  @Property(String)
  itemName: string;

  @Enum(issuence)
  issuence: issuence;

  @Property(Number)
  @Integer()
  mrp: number;

  @Property(() => Category)
  category: Category;

  @Property(Number)
  @Integer()
  categoryId: number;

  @Property(() => Partner)
  partner: Partner;

  @Property(String)
  description: string;

  @Property(Boolean)
  isActive: boolean;

  @Property(String)
  skuId: string;

  @CollectionOf(() => Image)
  images: Image[];

  @Property(Date)
  @Format('date-time')
  updatedAt: Date;

  @Property(Date)
  @Format('date-time')
  createdAt: Date;

  @Property(Date)
  @Format('date-time')
  @Allow(null)
  deletedAt: Date | null;

  @Property(Boolean)
  @Allow(null)
  isOfferApplicable: boolean | null;

  @Enum(products_offer_type)
  @Allow(null)
  offerType: products_offer_type | null;

  @Property(Number)
  @Integer()
  @Allow(null)
  amount: number | null;

  @Property(Number)
  rating: number;

  @Property(Number)
  @Integer()
  rateCount: number;

  @Property(Number)
  @Integer()
  packQty: number;

  @Property(String)
  packQtyLabel: string;

  @Property(String)
  drugForm: string;

  @CollectionOf(() => Reviews)
  reviews: Reviews[];

  @Property(Number)
  @Integer()
  partnerId: number;
}
