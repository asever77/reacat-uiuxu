export default async function OptionalCatchAllSlugPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;

  return (
    <main style={{ padding: 40 }}>
      <h1 style={{ fontSize: 32, fontWeight: "bold" }}>
        동적 라우터 [[...slug]] 예시
      </h1>
      <p style={{ fontSize: 20 }}>
        현재 URL의 <code>slug</code> 값:{" "}
        <span style={{ color: "blue" }}>
          {slug ? slug.join(" / ") : "(없음)"}
        </span>
      </p>
      <p style={{ marginTop: 24 }}>
        <b>예시:</b> <br />
        <code>/</code>로 접속하면 <b>slug=(없음)</b> <br />
        <code>/a</code>로 접속하면 <b>slug=a</b> <br />
        <code>/a/b</code>로 접속하면 <b>slug=a / b</b> <br />
        <code>/a/b/c</code>로 접속하면 <b>slug=a / b / c</b> <br />
      </p>
    </main>
  );
}
