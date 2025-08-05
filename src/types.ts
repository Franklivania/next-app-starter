export type TableColumn = {
  title: string;
  key: string;
  render?: (rowData: unknown, index: number) => React.ReactNode;
};

export type TableProps = {
  columns: TableColumn[];
  data: Record<string, unknown>[];
  onRowClick?: (rowData: unknown) => void;
  isUppercase?: boolean;
  isGray?: boolean;
  isLoading: boolean;
};
