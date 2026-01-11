export type Endpoint = {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
};

export type SvgProps = {
  width?: number | string;
  height?: number | string;
  color?: string;
  className?: string;
};
