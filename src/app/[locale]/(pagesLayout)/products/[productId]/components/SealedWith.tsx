import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import PrimaryBtn from "@/components/PrimaryBtn";
import PanadolImg from "@/assets/Panadol.png";
import { CurrencyDisplay } from "@/helpers/getCurrency";

const SealedWith = () => {
  const t = useTranslations();
  const Products = [
    {
      id: 1,
      title: t("home.productExample"),
      price: 5,
      image: PanadolImg,
    },
    {
      id: 2,
      title: t("home.productExample"),
      price: 5,
      image: PanadolImg,
    },
    {
      id: 3,
      title: t("home.productExample"),
      price: 5,
      image: PanadolImg,
    },
  ];
  const [selected, setSelected] = useState<number[]>([]);

  const toggleProduct = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddAll = () => {
    const selectedProducts = Products.filter((p) => selected.includes(p.id));

    console.log("Add to cart:", selectedProducts);
    // 🔗 connect with cart logic here
  };

  return (
    <div className="p-[32px_0px_64px_0px]">
      <div className="p-[44px_32px_32px] rounded-4xl bg-primary-50 flex flex-col gap-11">
        <h5 className="heading5 max-md:heading5-small">
          {t("singleProduct.frequentlyBoughtTogether")}
        </h5>

        <div className="flex flex-col gap-5">
          {Products.map((item) => {
            return (
              <div
                key={item.id}
                className="bg-white p-3 border border-primary-100 rounded-[20px] flex items-center justify-between"
              >
                <div className="flex items-center gap-5">
                  <div className="bg-grey-50 p-[8px_16px] rounded-[14px] h-[88px] w-[88px]">
                    <Image
                      alt={`item${item.id}`}
                      src={item.image.src}
                      width={56}
                      height={72}
                    />
                  </div>
                  <div className="flex flex-col gap-5">
                    <p className="typo-regular1">{item.title}</p>
                    <CurrencyDisplay price={item.price} />
                  </div>
                </div>

                <input
                  type="checkbox"
                  checked={selected.includes(item.id)}
                  onChange={() => toggleProduct(item.id)}
                  className="accent-primary-500 cursor-pointer w-4 h-4"
                />
              </div>
            );
          })}
        </div>

        <PrimaryBtn
          text={t("singleProduct.addAllToCart")}
          className="heading6-small! h-[52px] rounded-[11111px] grow"
          handleClick={handleAddAll}
        />
      </div>
    </div>
  );
};
export default SealedWith;
