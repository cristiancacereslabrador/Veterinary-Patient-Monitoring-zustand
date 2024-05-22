import { toast } from "react-toastify";
import { usePatientStore } from "../store/store";
import { Patient } from "../types";
import { PatientDetailItem } from "./PatientDetailItem";

type PatientDetailsProps = { patient: Patient };

export const PatientsDetails = ({ patient }: PatientDetailsProps) => {
  const deletePatient = usePatientStore((state) => state.deletePatient);
  const getPatientById = usePatientStore((state) => state.getPatientById);
  // const { deletePatient, getPatientById } = usePatientStore();//FORMA ALTERNA MAS CORTA

  const handleClick = () => {
    deletePatient(patient.id);
    toast.error("Patient removed!");
  };

  return (
    <>
      <div className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-lg">
        <PatientDetailItem label="ID" data={patient.id} />
        <PatientDetailItem label="Name" data={patient.name} />
        <PatientDetailItem label="Owner" data={patient.caretaker} />
        <PatientDetailItem label="Email" data={patient.email} />
        <PatientDetailItem
          label="Admission date"
          data={patient.date.toString()}
        />
        <PatientDetailItem label="Symptoms" data={patient.symptoms} />
        <div className="flex flex-col lg:flex-row gap-3 justify-between mt-10">
          <button
            type="button"
            className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg shadow-lg active:transform active:scale-95"
            onClick={() => getPatientById(patient.id)}
          >
            Edit
          </button>
          <button
            type="button"
            className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg shadow-lg active:transform active:scale-95"
            onClick={handleClick}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};
