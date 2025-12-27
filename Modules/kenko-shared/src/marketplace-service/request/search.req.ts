import {
  CollectionOf,
  Description,
  Enum,
  Minimum,
  MinLength,
  Property,
  Required,
} from '@tsed/schema';
import { SortDirectionEnum } from '../../common/enums-and-constants/global.enum';

export class Search {
  @Property()
  @Required()
  @MinLength(0)
  searchText: string;

  @Property()
  @CollectionOf(String)
  categoryList: string[];

  @Property()
  @Minimum(0)
  pageNo: number;

  @Property()
  @Minimum(0)
  pageSize: number;

  @Property()
  @Description('allowed values: name/mrp')
  sortField: string;

  @Property()
  @Description('')
  @Enum(SortDirectionEnum)
  sortDirection: SortDirectionEnum;
}
