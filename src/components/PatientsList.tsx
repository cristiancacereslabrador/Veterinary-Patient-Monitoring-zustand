import { usePatientStore } from "../store/store";
import { PatientsDetails } from "./PatientsDetails";

export default function PatientsList() {
  const patients = usePatientStore((state) => state.patients);
  // console.log("patients", patients);
  return (
    <div className="md:w-1/2 lg:3/5 md:h-screen overflow-y-scroll">
      {patients.length ? (
        // <p className=""> There are patients</p>
        <>
          <h2 className="font-black text-3xl text-center">Patient list</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Manage your{" "}
            <span className="text-indigo-600 font-bold">
              Patients and Appointments
            </span>
          </p>
          {patients.map((patient) => (
            <PatientsDetails key={patient.id} patient={patient} />
          ))}
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center">
            There are no patients
          </h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Start adding patients{" "}
            <span className="text-indigo-600 font-bold">
              and they will appear in this place
            </span>
          </p>
        </>
      )}
    </div>
  );
}
