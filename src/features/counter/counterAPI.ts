// A mock function to mimic making an async request for data

type DataType = { data: number };

type FetchCountReturnType = Promise<DataType>;
export const fetchCount = (amount = 1): FetchCountReturnType => {
  return new Promise<DataType>((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
};

export default fetchCount;
