import React from 'react';

interface DetailCardProps {
  title: string;
  description: string;
}

const DetailCard: React.FC<DetailCardProps> = ({ title, description }) => {
  return (
    <div className="p-6 border rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

export default DetailCard;
