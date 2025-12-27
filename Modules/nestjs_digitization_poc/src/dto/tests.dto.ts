import { isEmpty, IsNotEmpty, IsNumber, IsString,IsOptional, IsBoolean } from "class-validator";
import { DigitisationStatusEnum } from "src/constants/appConstants";
export class TestsBody{
    forOwner:string | null;
    @IsOptional()
    sortingFields:string;
    @IsOptional()
    dateRange:string;
}

export class TestsQueryParams{
    limit:number;

    page:number;
    
    @IsOptional()
    flag:number;

    @IsString()
    @IsOptional()
    searchKey:string;

    @IsString()
    @IsOptional()
    status:string;

   
}

export class TestResults {

    @IsString()
    @IsNotEmpty()
    testName:string;
    @IsNotEmpty()
    value:string;
    @IsNotEmpty()
    @IsString()
    testUnit:string
    @IsString()
    markerId:string
}

class UserDetails{
    @IsNotEmpty()
    userId:string;

    @IsNotEmpty()
    hubspotContactId:string;
}

export class SampleMetaData{
    @IsNotEmpty()
    markerName:string;
    @IsNotEmpty()
    markerValue:string;
    @IsOptional()
    id:string
}

export class MetaData extends SampleMetaData{
    @IsOptional()
    @IsNotEmpty()
    comment:string;
    @IsOptional()
    testId:string
    @IsOptional()
    metaDataId:string
}

export class MannualTest{
    @IsNotEmpty()
    pendingTestId:string;
    testResults:TestResults[];
    userDetails:UserDetails;
    setSampleMetaData:MetaData[]
    @IsNotEmpty()
    isDynamic:string
    @IsOptional()
    testTypeName:string

}

class MarkerComment{
    @IsNotEmpty()
    markerId:string;
    @IsNotEmpty()
    comment:string

}

export class ApporveOrRejectBody{
    @IsNotEmpty()
    pendingTestId:string;

    @IsNotEmpty()
    @IsOptional()
    metaDataComments:MarkerComment[]
    comments:MarkerComment[]

}

export class TestInputs{
    @IsNotEmpty()
    testType:string
    hubspotId:string

}

export interface SortCriteria {
    sortField:string;
    sortType:string
}

export class UserMarkers{
    @IsString()
    testId:string;
    @IsBoolean()
    isActive:boolean;
}

export class PendingTest {
    userHubspotId:string
    userId : string
    digitisationStatus :string
    testType  :string
    validity  :string
    reportSource:string
    reportData:string
    isSafeUrl:boolean
    partnerName:string
    isDynamic :boolean 
}

