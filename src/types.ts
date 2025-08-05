export type TableColumn = {
  title: string;
  key: string;
  render?: (rowData: any, index: number) => React.ReactNode;
};

export type TableProps = {
  columns: TableColumn[];
  data: Record<string, any>[];
  onRowClick?: (rowData: any) => void;
  isUppercase?: boolean;
  isGray?: boolean;
  isLoading: boolean;
};
