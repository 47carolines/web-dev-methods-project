export interface QuoteRequestPayload {
  personal: {
    fullName: string;
    dob: string;
    email: string;
  };

  vehicle: {
    make: string;
    model: string;
    year: string;
  };

  driver: {
    age: number | string;
    licenseYears: number | string;
  };

  final?: {
    coverageType?: string;
  };
}

export interface QuoteResponse {
  premium: number;
  riskLevel: string;
}