import { Property, Description } from "@tsed/schema";

export class BookingDetailsRequest {
    @Property()
    @Description("Customer name")
    customer_name: string;

    @Property()
    @Description("Doctor name")
    doctor_name: string;

    @Property()
    @Description("Time slot")
    time_slot: string;

    @Property()
    @Description("Specialities")
    specialties: string;

    @Property()
    @Description("Rx details")
    rx_details: Object;

    @Property()
    @Description("Name")
    name: string;

    @Property()
    @Description("address")
    address: string;

    @Property()
    @Description("coordinates")
    coordinates: string;

    @Property()
    @Description("status")
    status: string;

    @Property()
    @Description("Name")
    clinic_name: string;

    @Property()
    @Description("address")
    clinic_address: string;
}