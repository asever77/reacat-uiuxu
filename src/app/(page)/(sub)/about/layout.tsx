import { createMetadata } from "@/config/metadata";

export const metadata = createMetadata({
  title: "About",
  description: "소개 페이지입니다.",
});

const AboutLayout = ({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) => {
  return (
    <>
      {children}
      {modal} {/* about/@modal만 처리 */}
    </>
  );
};

export default AboutLayout;
