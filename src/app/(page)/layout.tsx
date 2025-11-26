import Header from "@/components/layout/Header";

const PageLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header />
      <div className="relative z-0">{children}</div>
    </>
  );
};

export default PageLayout;
