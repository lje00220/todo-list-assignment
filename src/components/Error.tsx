const Error = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2 bg-gray-100">
      <p className="text-xl text-red-500">데이터를 불러오는 데 실패했습니다.</p>
      <button
        onClick={() => location.reload()}
        className="text-md rounded bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
      >
        새로고침
      </button>
    </div>
  );
};

export default Error;
