import CategoriesSlider from "@/components/CategoriesSlider.tsx";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <div className="max-md:p-4 md:p-6 lg:p-8 pb-0! mb-4">
        <div
          style={{
            background:
              "linear-gradient(85deg, var(--color-primary-500, #21BF73) -6.74%, var(--colors-secondary-500, #2EC1AC) 123.06%)",
          }}
          className="rounded-[84px] overflow-hidden"
        >
          <div className="p-[24px_24px_0px_24px] max-md:p-4 ">
            <Navbar />
          </div>

          {/* categories */}
          <CategoriesSlider />
        </div>
      </div>
      <div>{children}</div>
      <Footer />
    </div>
  );
}
