import type { PersonalData } from "./personal";
import type { VehicleData } from "./vehicle";
import type { DriverData } from "./driver";
import type { FinalDetailsData } from "./final";

export interface WizardFormData {
  personal: PersonalData;
  vehicle: VehicleData;
  driver: DriverData;
  final: FinalDetailsData;
}