/* journify.ai — HomePage (S1, S2, S3, S4, S6, S7, S8). S5 retained but not rendered. */

function HomePage() {
  const [content, setContent] = React.useState(null);

  React.useEffect(() => {
    fetch('/content/homepage.json').then(r => r.json()).then(setContent);
  }, []);

  if (!content) return null;

  return (
    <>
      <S1 data={content.s1} />
      <S2 data={content.s2} />
      <S3 data={content.s3} />
      <S4 data={content.s4} />
      <S6 />
      <S7 data={content.s7} />
      <S8 data={content.s8} />
    </>
  );
}

Object.assign(window, { HomePage });
