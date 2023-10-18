'use client';

import { useUsers } from '@hooks/queries/useUser';
import { User } from '@types';
import Image from 'next/image';
import React from 'react';

export default function ListUsers() {
  const [count, setCount] = React.useState(0);
  const { data } = useUsers();

  return (
    <main style={{ maxWidth: 1200, marginInline: 'auto', padding: 20 }}>
      <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
        <h4 style={{ marginBottom: 16 }}>{count}</h4>
        <button onClick={() => setCount((prev) => prev + 1)}>increment</button>
        <button
          onClick={() => setCount((prev) => prev - 1)}
          style={{ marginInline: 16 }}
        >
          decrement
        </button>
        <button onClick={() => setCount(0)}>reset</button>
      </div>

      {
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            gap: 20,
          }}
        >
          {data?.map((user: User) => (
            <div
              key={user.id}
              style={{ border: '1px solid #ccc', textAlign: 'center' }}
            >
              <Image
                className='relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert'
                src={`https://robohash.org/${user.id}?set=set2&size=180x180`}
                alt={user.name}
                width={180}
                height={180}
                priority
              />
              <h3>{user.name}</h3>
            </div>
          ))}
        </div>
      }
    </main>
  );
}
