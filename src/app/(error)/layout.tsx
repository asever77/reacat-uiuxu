export const metadata = {
  title: "에러",
  description: "에러가 발생했습니다",
};

const ErrorLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      {/* Header 없이 에러 페이지만 표시 */}
      {children}
    </>
  );
};

export default ErrorLayout;
