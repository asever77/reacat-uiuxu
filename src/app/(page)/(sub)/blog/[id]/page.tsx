export default async function DynamicIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main style={{ padding: 40 }}>
      <h1 style={{ fontSize: 32, fontWeight: "bold" }}>동적 라우터 예시</h1>
      <p style={{ fontSize: 20 }}>
        현재 URL의 <code>id</code> 값:{" "}
        <span style={{ color: "blue" }}>{id}</span>
      </p>
      <p style={{ marginTop: 24 }}>
        <b>예시:</b> <br />
        <code>/123</code>로 접속하면 <b>id=123</b>이 표시됩니다.
        <br />
        <code>/apple</code>로 접속하면 <b>id=apple</b>이 표시됩니다.
      </p>
    </main>
  );
}
