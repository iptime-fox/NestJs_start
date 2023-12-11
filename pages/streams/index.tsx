import type { NextPage } from 'next';
import Link from 'next/link';
import FloatingButton from '@components/floating-button';
import Layout from '@components/layout';
import { Stream } from '@prisma/client';
import useSWR from 'swr';
import Pagination from '@components/pagination';
import { useState } from 'react';

interface StreamsResponse {
  ok: boolean;
  streams: Stream[];
}

// const Streams: NextPage = () => {
//   const { data } = useSWR<StreamsResponse>(`/api/streams`);
//   return (
//     <Layout hasTabBar title='라이브'>
//       <div className=' divide-y-[1px] space-y-4'>
//         {data?.streams.map((stream) => (
//           <Link
//             key={stream.id}
//             href={`/streams/${stream.id}`}
//             className='pt-4 block  px-4'>
//             <div className='w-full rounded-md shadow-sm bg-slate-300 aspect-video' />
//             <h1 className='text-2xl mt-2 font-bold text-gray-900'>
//               {stream.name}
//             </h1>
//           </Link>
//         ))}
//         <FloatingButton href='/streams/create'>
//           <svg
//             className='w-6 h-6'
//             fill='none'
//             stroke='currentColor'
//             viewBox='0 0 24 24'
//             xmlns='http://www.w3.org/2000/svg'>
//             <path
//               strokeLinecap='round'
//               strokeLinejoin='round'
//               strokeWidth='2'
//               d='M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'></path>
//           </svg>
//         </FloatingButton>
//       </div>
//     </Layout>
//   );
// };

// export default Streams;

const Streams: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useSWR<StreamsResponse>('/api/streams');
  const { data: limitData } = useSWR<StreamsResponse>(
    `/api/streams?page=${currentPage}`
  );

  const totalCount = data?.streams?.length!;

  if (!data) return <div>Loading</div>;

  return (
    <Layout title='라이브' hasTabBar>
      <div className='space-y-4 pb-10'>
        {limitData?.streams?.map((stream) => (
          <Link key={stream.id} href={`/live/${stream.id}`}>
            <div className='p-4'>
              {/* aspect-video : 비디오 비율 지정 (16:9) */}
              <div className='aspect-video w-full rounded-md bg-slate-300 shadow-sm'></div>
              <h3 className='mt-2 text-lg  text-gray-700'>{stream.id}</h3>
            </div>
          </Link>
        ))}

        <Pagination
          totalCount={totalCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        <FloatingButton href='/live/create'>
          <svg
            className='h-6 w-6 text-white'
            fill='none'
            stroke='currentColor'
            strokeWidth={2}
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'>
            <path
              strokeLinecap='round'
              d='M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z'
            />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};

export default Streams;
