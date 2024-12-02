



const ExpandCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    transform='rotate(180)'
    {...props}
  >
    <defs>
      <linearGradient id='bg-fourth-gradient' gradientTransform='rotate(135)'>
        <stop offset='0%' stopColor='#f4a261' />
        <stop offset='100%' stopColor='#d9824a' />
      </linearGradient>
    </defs>
    <path
      d='m12 11.325l2.375 2.375q.275.275.688.275t.712-.275q.3-.3.3-.712t-.3-.713L12.7 9.2q-.3-.3-.7-.3t-.7.3l-3.1 3.1q-.3.3-.287.7t.312.7q.3.275.7.288t.7-.288zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22'
      fill='url(#bg-fourth-gradient)'
    />
  </svg>
);

export default ExpandCircleIcon;
