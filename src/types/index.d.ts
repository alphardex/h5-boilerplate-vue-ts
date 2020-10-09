declare module "@alphardex/aqua.sp/dist/aqua.sp.min.css";

export interface API {
  [key: string]: string;
}

export interface NavItem {
  to: Path;
  text: string;
}

export interface Path {
  name?: string;
  path?: string;
  query?: Record<string, any>;
}
