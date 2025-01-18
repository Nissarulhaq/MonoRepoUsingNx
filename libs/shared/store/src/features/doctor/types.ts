// Define the Doctor and Appointment types
export interface Doctor {
    id: string;
    name: string;
    // ... other properties ...
}

export interface Appointment {
    id: string;
    doctorId: string;
    // ... other properties ...
}