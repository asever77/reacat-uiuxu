import Footer from "@/components/layout/Footer";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
