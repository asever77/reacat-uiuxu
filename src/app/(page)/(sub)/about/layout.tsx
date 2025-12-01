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
