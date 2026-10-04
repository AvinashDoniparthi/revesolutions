import React from 'react';
import { Hero } from './home/Hero';
import { Showreel } from './home/Showreel';
import { WhatYouGet } from './home/WhatYouGet';
import { ServicesRail } from './home/ServicesRail';
import { Work } from './home/Work';
import { Difference } from './home/Difference';
import { Process } from './home/Process';
import { Closing } from './home/Closing';

/**
 * The experimental Home, told in eight chapters that alternate between the
 * logo's black and an ivory ground. All copy is carried over from the classic
 * HomePage and the shared data files; nothing here is new claims.
 */
export const XHomePage: React.FC = () => (
  <>
    <Hero />
    <Showreel />
    <WhatYouGet />
    <ServicesRail />
    <Work />
    <Difference />
    <Process />
    <Closing />
  </>
);

export default XHomePage;
