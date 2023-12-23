import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faComments, faFile, faCoffee } from '@fortawesome/free-solid-svg-icons';

const Grid = () => {
  const data = [
    { id: 1, title: 'Wiki', content: 'http://gopiko.fr:8080', bg: 'bg-green-500', icon: <FontAwesomeIcon icon={faBook} className="w-6 h-6 text-white" /> },
    { id: 2, title: 'Forum', content: 'http://gopiko.fr:8081', bg: 'bg-blue-500', icon: <FontAwesomeIcon icon={faComments} className="w-6 h-6 text-white" /> },
    { id: 3, title: 'Blog', content: 'http://gopiko.fr:8082', bg: 'bg-orange-500', icon: <FontAwesomeIcon icon={faFile} className="w-6 h-6 text-white" /> }, 
    { id: 4, title: 'Discord', content: 'https://discord.com/channels/1187141558886223924/1187141558886223927', bg: 'bg-purple-500', icon: <FontAwesomeIcon icon={faCoffee} className="w-6 h-6 text-white" /> },  
// Add more data as needed
  ];

  return (
    <div className="container mx-auto mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <div key={item.id} className={`flex items-center sm:flex-col ${item.bg} p-4 shadow-md rounded-md`}>
            <a target="_blank" rel="noopener noreferrer" href={item.content}>
              <div className="flex items-center">
                {item.icon}
                <h2 className={`text-xl font-semibold ml-2 text-white ${item.icon ? 'sm:inline' : ''}`}>{item.title}</h2>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;

