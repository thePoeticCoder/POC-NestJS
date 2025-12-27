import { Description, Enum, MinLength, Nullable, Property, Required, Url } from "@tsed/schema";
import { UserDocTypeEnum } from "../..";


export class UserFileRequest {


  @Property()
  @MinLength(5)
  @Description("User file display name")
  @Required()
  userFileDisplayName: string;


  @Property()
  @MinLength(5)
  @Description("User file long name")
  @Required()
  userFileLongName: string;

  @Required()
  @Description("User file type (Verification/Payment/Order)")
  @Enum(UserDocTypeEnum)
  userDocType: UserDocTypeEnum;


  @Property()
  @Required(true, false)
  @Description("Directory Name , not in userFileMeta")
  @Nullable(String)
  directoryPath: string | null;

  @Property()
  @Required(true, false)
  @Description("Bucket ID on AWS , not in userFileMeta")
  @Required()
  @Nullable(String)
  bucketId: string | null;


  @Property()
  @Required()
  @Url()
  @Description("URL from front-end")
  url: string;


}
