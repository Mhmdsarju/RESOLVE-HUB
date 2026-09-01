import { Toaster as HotToaster } from "react-hot-toast";
import { Toaster as SonnerToaster } from "sonner";

export default function ToastProvider() {
  return (
    <>
      <HotToaster position="top-right" reverseOrder={false} />

      <SonnerToaster
        position="top-center"
        closeButton
        duration={3000}
        toastOptions={{
          classNames: {
            toast: `
        !w-[220px]
        !min-h-[60px]
        !bg-[#FAF6F0]
        !border
        !border-[#E7DDD3]
        !text-[#4B3932]
        !shadow-lg
        !rounded-xl
        !px-4
        !py-3
      `,
            title: `
        !text-[#4B3932]
        !font-semibold
        !text-sm
      `,
            closeButton: `
        !right-2
        !left-auto
        !top-1/2
        !-translate-y-1/2
        !border-[#D8C9BC]
        !bg-white
        !text-[#8C6D58]
        hover:!bg-[#F5EFE7]
      `,
          },
        }}
      />
    </>
  );
}
