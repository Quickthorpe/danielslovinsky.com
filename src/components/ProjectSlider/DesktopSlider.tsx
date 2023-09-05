'use client';
import Image from 'next/image';
import { type FC, useRef } from 'react';

import Slide from 'components/ProjectSlider/Slide';

interface DesktopSliderProps {
  projects: ProjectFragment[];
  activeSlide: number;
  setActiveSlide: (index: number) => void;
}

const DesktopSlider: FC<DesktopSliderProps> = ({ projects, activeSlide, setActiveSlide }) => {
  const buttonContainerRef = useRef<HTMLDivElement>(null);

  const containerTop = buttonContainerRef.current?.getBoundingClientRect().top || 0;

  const { height: activeButtonHeight, top: activeButtonTop } = buttonContainerRef.current?.children[
    activeSlide
  ].getBoundingClientRect() || {
    height: 96,
    top: 0,
  };

  const sliderTop = activeButtonTop - containerTop;

  return (
    <>
      <div className="relative hidden flex-col md:flex" ref={buttonContainerRef}>
        {projects.map(({ id, name: projectName, skills }, i) => (
          <button
            key={id}
            id={`project-button-${i}`}
            onClick={() => setActiveSlide(i)}
            className="flex flex-col justify-start gap-y-4 border-l-4 border-l-white-10 py-4 pl-4 transition-colors hover:bg-white-5 xl:py-6 xl:pl-10"
          >
            <span className="text-start text-lg font-bold">{projectName}</span>
            <div className="flex gap-4">
              {skills.map(
                ({ id: skillId, name: skillName, logo }) =>
                  logo && (
                    <Image
                      key={skillId}
                      src={logo?.url}
                      alt={logo.alt || `${skillName || ''} logo`}
                      height={24}
                      width={24}
                    />
                  ),
              )}
            </div>
          </button>
        ))}
        <div
          className="absolute w-1 bg-maya-blue transition-[top]"
          style={{ height: activeButtonHeight, top: sliderTop }}
        />
      </div>
      <Slide project={projects[activeSlide]} className="hidden flex-col md:flex" />
    </>
  );
};

export default DesktopSlider;
