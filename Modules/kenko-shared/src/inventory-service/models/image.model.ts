import { Integer, Property } from '@tsed/schema';

export class Image {
  @Property(Number)
  @Integer()
  id: number;

  @Property(String)
  imageUrl: string;

  @Property(Number)
  @Integer()
  productsId: number;
}
