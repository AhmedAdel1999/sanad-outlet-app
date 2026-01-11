import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocale, useTranslations } from "next-intl";
import SpecificationsInfo from "./SpecificationsInfo";
import Reviews from "./Reviews";

const ProductInfo = () => {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <div className="pt-8 pb-16">
      <Tabs
        dir={locale === "ar" ? "rtl" : "ltr"}
        defaultValue="overview"
        className="w-full gap-8!"
      >
        <TabsList className="w-full bg-grey-100 rounded-[11111px] p-1 h-[52px]">
          <TabsTrigger
            value="overview"
            className="cursor-pointer p-[8px_16px] rounded-[11111px] h-11 text-grey-800 data-[state=active]:text-black typo-semibold"
          >
            {t("singleProduct.overview")}
          </TabsTrigger>
          <TabsTrigger
            value="specifications"
            className="cursor-pointer p-[8px_16px] rounded-[11111px] h-11 text-grey-800 data-[state=active]:text-black typo-semibold"
          >
            {t("singleProduct.specifications")}
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="cursor-pointer p-[8px_16px] rounded-[11111px] h-11 text-grey-800 data-[state=active]:text-black typo-semibold"
          >
            {t("singleProduct.reviews")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <p className="typo-regular1">
            مميزات المنتج بانادول إكسترا أوبتیزورب مفعول أسرع للألم مقارنة
            بالباراسیتامول العادي لجمیع أعراض آلام الجسم، بما في ذلك الصداع،
            وآلام الجسم، وآلام الظھر، وآلام العضلات، والروماتیزم، وآلام الدورة
            الشھریة عن هذا المنتج ما هي أقراص بانادول اكسترا panadol extra  ؟ تم
            تصميم أقراص بانادول إكسترا لتخفيف أنواع متعددة من الألم: الصداع ،
            آلام الدورة الشهرية ، آلام العضلات، آلام الأسنان والحمى. لماذا أقراص
            بانادول اكسترا ؟ مع تركيبة مزدوجة، تحتوي على الباراسيتامول
            والكافيين. دواعي استعمال بنادول اكسترا أقراص بانادول اكسترا مخصصة
            للأشخاص الذين يحتاجون إلى تخفيف الألم، وهي مناسبة أيضا لأولئك الذين
            يتناولون معظم الأدوية الأخرى وكذلك كبار السن. المنتجات المتاحة من
            بانادول اكسترا يمكن العثور على بانادول اكسترا في عبوات من 24 قرصا.
            من الجيد أن تكون في متناول اليد لتخفيف الألم بشكل فعال. كيف سيفيدك
            بانادول اكسترا ؟ الباراسيتامول والكافيين معا يعملوا كمسكن قوي للألم
            ,عند الأستخدام حسب الإرشادات. يمكن تناوله على معدة فارغة ومن غير أن
            يسبب تهيج المعدة. التهيج هو نسبة إلى التأثير على الذين يعانون أو
            معرضون لخطر الإصابة بمرض قرحة المعدة أو نزيف الجهاز الهضمي. عند
            الاستخدام حسب الإرشادات/اقرأ الملصق دائما قبل الاستخدام. سعر بنادول
            اكسترا panadol extra  سعر بانادول اكسترا هو 34 جنيه لعبوة تحتوى على
            ٢٤ قرص. سعر شريط بنادول اكسترا  هو 17 جنيه  " سعر بنادول الاحمر قد
            يتغير تبعاً لتغير سعره فى الصيدليات "
          </p>
        </TabsContent>
        <TabsContent value="specifications">
          <SpecificationsInfo />
        </TabsContent>
        <TabsContent value="reviews">
          <Reviews />
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default ProductInfo;
