import React from 'react';
import Image from 'next/image';
import { Package } from './Packages';

interface PackageCardProps {
  p: Package;
}

export default function PackageCard({ p: pkg }: PackageCardProps) {

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="relative h-40 bg-linear-to-br from-blue-100 to-indigo-100">
        {pkg.image && (
          <Image
            src={pkg.image}
            alt={pkg.title}
            fill
            className="object-contain p-5"
          />
        )}
      </div>

      <div className="p-6 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.title}</h3>
        <p className="text-gray-600">{pkg.description}</p>
      </div>
    </div>
  );
}