import React, { Suspense, useState, useRef, useEffect } from 'react';
import { useSpecies } from '@/hooks/useSpecies';
import './RegisterMissingPage.css';
import Modaltest from '@/common/components/modaltest';

const RegisterMissingPage = () => {
  return (
    <div className="flex w-[50%] flex-[0.8] flex-col gap-y-3 border border-red-500 p-3">
      <Modaltest show={false} />
    </div>
  );
};

export default RegisterMissingPage;
