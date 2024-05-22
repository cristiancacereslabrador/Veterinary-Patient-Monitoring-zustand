export default function Error({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-center my-2 bg-red-600 text-white font-bold p-1 uppercase text-sm rounded-md">
      {children}
    </p>
  );
}
