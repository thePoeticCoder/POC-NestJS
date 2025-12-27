import { Description, Property } from '@tsed/schema';

export class Banner {
  @Property()
  @Description('Name of the Banner')
  bannerName: string;

  @Property()
  @Description('Banner image link')
  bannerImage: string;

  @Property()
  @Description('Banner alt text for image')
  bannerAltText: string;

  @Property()
  @Description('Banner status')
  isActive: boolean;

  @Property()
  @Description('Banner display order, will be sorted in ascending order')
  displayPriority: number;
}
