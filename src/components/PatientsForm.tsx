import { useForm } from "react-hook-form";
import Error from "./Error";
import { DraftPatient } from "../types";
import { usePatientStore } from "../store/store";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function PatientForm() {
  const addPatient = usePatientStore((state) => state.addPatient);
  const activeId = usePatientStore((state) => state.activeId);
  const patients = usePatientStore((state) => state.patients);
  const updatePatient = usePatientStore((state) => state.updatePatient);

  // Obtener la fecha actual en formato DD-MM-YYYY
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  const formattedDate = `${year}-${month}-${day}`;
  // console.log("Q dia es hoy: ", formattedDate);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<DraftPatient>();
  // console.log("formState", formState);
  useEffect(() => {
    if (activeId) {
      const activePatient = patients.filter(
        (patient) => patient.id === activeId
      )[0];
      // console.log("activePatient", activePatient);
      setValue("name", activePatient.name);
      setValue("caretaker", activePatient.caretaker);
      setValue("date", activePatient.date);
      setValue("email", activePatient.email);
      setValue("symptoms", activePatient.symptoms);
    }
  }, [activeId]);
  // console.log("errors", errors);
  const registerPatient = (data: DraftPatient) => {
    // console.log("Nuevo paciente", data);
    if (activeId) {
      updatePatient(data);
      toast.success("Patient updated correctly!");
    } else {
      addPatient(data);
      toast.success("Patient registered correctly!");
    }
    reset();
  };
  // const today = new Date().toISOString().split("T")[0];
  // const today = new Date().toLocaleDateString("es-PE").split("T")[0]; // 'en-CA' formato yyyy-mm-dd

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Patient Monitoring</h2>

      <p className="text-lg mt-5 text-center mb-10">
        Add Patients and {""}
        <span className="text-indigo-600 font-bold">Manage</span>
      </p>

      <form
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        noValidate
        onSubmit={handleSubmit(registerPatient)}
      >
        <div className="mb-5">
          <label htmlFor="name" className="text-sm uppercase font-bold">
            Patient
          </label>
          <input
            id="name"
            className="w-full p-3 border border-gray-100 rounded-md"
            type="text"
            placeholder="Name of patient"
            {...register("name", {
              required: "Patient Name is required",
              // maxLength: { value: 8, message: "Máximo 8 caracteres" },
            })}
          />
          {errors.name && <Error>{errors.name?.message}</Error>}
          {/* {errors.maxLength && (
            <Error>{errors.maxLength?.message}</Error>
          )} */}
        </div>

        <div className="mb-5">
          <label htmlFor="caretaker" className="text-sm uppercase font-bold">
            Owner
          </label>
          <input
            id="caretaker"
            className="w-full p-3  border border-gray-100 rounded-md"
            type="text"
            placeholder="Owner Name"
            {...register("caretaker", {
              required: "Owner name is required",
            })}
          />
          {errors.caretaker && <Error>{errors.caretaker?.message}</Error>}
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="text-sm uppercase font-bold">
            Email
          </label>
          <input
            id="email"
            className="w-full p-3  border border-gray-100 rounded-md"
            type="email"
            placeholder="Registration Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid Email",
              },
            })}
          />
          {errors.email && <Error>{errors.email?.message}</Error>}
        </div>

        <div className="mb-5">
          <label htmlFor="date" className="text-sm uppercase font-bold">
            Date of Admission
          </label>
          <input
            id="date"
            className="w-full p-3  border border-gray-100 rounded-md"
            type="date"
            defaultValue={formattedDate}
            {...register("date", {
              required: "The date is required",
            })}
          />
          {errors.date && <Error>{errors.date?.message}</Error>}
        </div>

        <div className="mb-5">
          <label htmlFor="symptoms" className="text-sm uppercase font-bold">
            Symptoms
          </label>
          <textarea
            id="symptoms"
            className="w-full p-3 border border-gray-100 rounded-md"
            placeholder="Patient symptoms"
            {...register("symptoms", {
              required: "Symptoms are mandatory",
            })}
          />
          {errors.symptoms && <Error>{errors.symptoms?.message}</Error>}
        </div>

        <input
          type="submit"
          className="bg-sky-900 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors shadow-md active:transform active:scale-95 rounded-md"
          value="Save Patient"
        />
      </form>
    </div>
  );
}
