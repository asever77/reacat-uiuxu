export const metadata = {
  title: "소개페이지",
  description: "이 페이지에만 적용되는 설명",
  // 필요한 필드만 덮어쓰기
};

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
