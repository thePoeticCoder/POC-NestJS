import { plainToClass } from "class-transformer";
import { IsEnum, IsNumber, IsString, validateSync } from "class-validator";
import { EnvironmentType } from "../constants/appConstants";
import { ErrorException } from "../providers/api-response";

class EnvironmentVariables {
  @IsEnum(EnvironmentType)
  NODE_ENV: EnvironmentType;

  // @IsNumber()
  PORT: any;

  @IsString()
  BASE_URL: string;

  @IsString()
  APP_NAME: string;

  @IsString()
  RABBITMQ_URI: string;

  @IsString()
  HUBSPOT_BASE_URL: string;

  @IsString()
  HUBSPOT_BASE_URL_CRM: string;

  @IsString()
  HUBSPOT_API_KEY: string;

  @IsString()
  HUBSPOT_ORG_ID: string;

  @IsString()
  HUBSPOT_TEST_USER_CONTACT_ID: string;

}

export function validate(configuration: Record<string, unknown>) {
  const finalConfig = plainToClass(EnvironmentVariables, configuration, { enableImplicitConversion: true });

  const errors = validateSync(finalConfig, { skipMissingProperties: false });

  if (errors.length) {
    throw new ErrorException(errors.map((res) => res?.constraints));
  }
  return finalConfig;
}
