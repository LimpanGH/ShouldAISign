import React from 'react';

interface SpeedometerSVGProps {
  percentage: number;
}

const SpeedometerSVG: React.FC<SpeedometerSVGProps> = ({ percentage }) => {
  const limitedPercentage = Math.max(0, Math.min(percentage, 100));
  const angle = (limitedPercentage / 100) * 180;

  return (
    <svg
      width='92'
      height='47'
      viewBox='0 0 92 47'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g id='Frame 150'>
        <g id='Group 314'>
          <g id='Vector'>
            {/* Red Arc */}
            <path
              d='M91.3242 45.666C91.3242 33.5546 86.513 21.9393 77.949 13.3753C69.3849 4.81123 57.7696 9.25161e-07 45.6582 1.0777e-08C33.5468 -9.03607e-07 21.9315 4.81122 13.3675 13.3753C4.80342 21.9393 -0.00781061 33.5546 -0.00781244 45.666H11.4087C11.4087 36.5825 15.0171 27.871 21.4401 21.448C27.8632 15.0249 36.5747 11.4165 45.6582 11.4165C54.7417 11.4165 63.4532 15.0249 69.8763 21.448C76.2993 27.871 79.9077 36.5825 79.9077 45.666H91.3242Z'
              fill='#BE123C'
            />
            {/* Pink Arc */}
            <path
              d='M23.5413 5.71319C16.3858 9.6743 10.4254 15.4844 6.28295 22.5365C2.14048 29.5886 -0.0320429 37.6237 -0.00760865 45.8024L11.4088 45.7683C11.3905 39.6343 13.0199 33.6079 16.1268 28.3189C19.2336 23.0298 23.7039 18.6722 29.0705 15.7014L23.5413 5.71319Z'
              fill='#FECDD3'
            />
            {/* Light Pink Arc */}
            <path
              d='M68.4912 6.11808C61.5664 2.12005 53.7132 0.0103556 45.7171 3.80268e-05C37.7211 -0.0102796 29.8624 2.07914 22.9273 6.05929L28.6101 15.961C33.8114 12.9759 39.7053 11.4088 45.7024 11.4165C51.6994 11.4243 57.5894 13.0065 62.783 16.0051L68.4912 6.11808Z'
              fill='#FB7185'
            />
          </g>

          {/* Needle */}
          <g id='Vector_2'>
            <line
              x1='46'
              y1='46' // Center of the bottom arc
              x2={46 + 40 * Math.cos((180 - angle) * (Math.PI / 180))} // Adjusted x2 for rotation
              y2={46 - 40 * Math.sin((180 - angle) * (Math.PI / 180))} // Adjusted y2 for rotation
              stroke='black'
              strokeWidth='2'
            />
            <circle cx='46' cy='46' r='3' fill='black' />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default SpeedometerSVG;
