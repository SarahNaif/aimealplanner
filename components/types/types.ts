export interface Icon {
    src: string;
    style: string;
    alt: string;
  }
  
  export interface BackgroundProps extends React.HTMLProps<HTMLDivElement> {
    children: React.ReactNode;
  }