import React, { useEffect, useState } from 'react';

const UserNameCard = ({ email }) => {
  const [name, setName] = useState({ firstName: '', lastName: '' });

  useEffect(() => {
    if (!email) return;
    fetch(`http://localhost:5001/api/user/name/${email}`)
      .then(res => res.json())
      .then(data => {
        setName({ firstName: data.firstName, lastName: data.lastName });
      })
      .catch(err => {
        console.error('Error fetching user name:', err);
      });
  }, [email]);

  if (!name.firstName) return null;

  return (
    <div className="max-w-sm mx-auto mt-12 p-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-xl text-white">
      <div className="flex flex-col items-center">
        <div className="bg-white rounded-full p-2 shadow-md mb-4">
          <svg className="w-10 h-10 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9.956 9.956 0 0112 15c2.183 0 4.197.7 5.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold">Welcome</h2>
        <p className="mt-2 text-lg tracking-wide">
          {name.firstName} {name.lastName}
        </p>
      </div>
    </div>
  );
};

export default UserNameCard;