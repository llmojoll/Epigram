interface EpigramPageProps {
  params: {
    id: string;
  };
}

export default function EpigramPage({ params }: EpigramPageProps) {
  const { id } = params;

  return (
    <main className='p-8'>
      <h1 className='text-2xl font-bold'>에피그램 상세 페이지</h1>
      <p>현재 보고 있는 에피그램 ID: {id}</p>
    </main>
  );
}
