/* journify.ai — HomePage (composes S1–S8 + S6CaseStudyAnchor) */

function HomePage({ devPhase }) {
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
      <S6 devPhase={devPhase} data={content.s6} />
      <S6CaseStudyAnchor data={content.s6Anchor} />
      <S7 data={content.s7} />
      <S8 data={content.s8} />
    </>
  );
}

Object.assign(window, { HomePage });
